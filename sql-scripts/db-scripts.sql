-- public.win_order definition

-- Drop table

-- DROP TABLE public.win_order;

CREATE TABLE public.win_order (
	id int4 NOT NULL DEFAULT nextval('default_sequence'::regclass),
	datetime timestamp NULL,
	totalfee numeric(10, 2) NULL,
	CONSTRAINT win_order_pkey PRIMARY KEY (id)
);

-- public.win_order_service_record_mapping definition

-- Drop table

-- DROP TABLE public.win_order_service_record_mapping;

CREATE TABLE public.win_order_service_record_mapping (
	order_id int4 NOT NULL,
	service_id int4 NOT NULL,
	CONSTRAINT win_order_service_record_mapping_pkey PRIMARY KEY (order_id, service_id),
	CONSTRAINT win_order_service_record_mapping_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.win_order(id),
	CONSTRAINT win_order_service_record_mapping_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.win_service_record(id)
);

-- public.win_service_record definition

-- Drop table

-- DROP TABLE public.win_service_record;

CREATE TABLE public.win_service_record (
	id int4 NOT NULL DEFAULT nextval('default_sequence'::regclass),
	"name" varchar(255) NULL,
	CONSTRAINT win_service_record_pkey PRIMARY KEY (id)
);

-- public.last_order_datetime definition

-- Drop table

-- DROP TABLE public.last_order_datetime;

CREATE TABLE public.last_order_datetime (
	last_order_date_time timestamp NULL
);

-- public.existing_order_count definition

-- Drop table

-- DROP TABLE public.existing_order_count;

CREATE TABLE public.existing_order_count (
	count int8 NULL
);

CREATE OR REPLACE FUNCTION public.win_insert_order(p_datetime timestamp without time zone, p_totalfee numeric, p_service_ids integer[])
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSON;
    existing_order_count INT;
    new_order_id INT;
BEGIN
    -- Check if there are any existing orders within the past 3 hours
    IF EXISTS(
    	select 
    		1 
    	from last_order_datetime 
    	where last_order_datetime.last_order_date_time >= p_datetime - interval '3 hours'
    ) THEN
        result := '{"status": 0, "msg": "Cannot create order within 3 hours of a pre-existing order."}';
        RETURN result;
    END IF;

    INSERT INTO win_order (datetime, totalfee) VALUES (p_datetime, p_totalfee) RETURNING id INTO new_order_id;

   	PERFORM win_upsert_last_order_date_time(p_datetime);
   
    FOR i IN 1 .. array_length(p_service_ids, 1) LOOP
        INSERT INTO win_order_service_record_mapping (order_id, service_id) VALUES (new_order_id, p_service_ids[i]);
    END LOOP;

    result := '{"status": 1, "msg": "Order inserted successfully."}';
    RETURN result;
EXCEPTION
    WHEN others THEN
        result := '{"status": 0, "msg": "Failed to insert order."}';
        RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.win_update_order(p_id integer, p_datetime timestamp without time zone, p_totalfee numeric, p_service_ids integer[])
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSON;
    existing_order_count INT;
BEGIN
    -- Check if there are any existing orders within the past 3 hours

    IF EXISTS(
    	select 
    		1 
    	from last_order_datetime 
    	where last_order_datetime.last_order_date_time >= p_datetime - interval '3 hours'
    ) THEN
        result := '{"status": 0, "msg": "Cannot update order within 3 hours of a pre-existing order."}';
        RETURN result;
    END IF;

    -- Delete existing mappings
    DELETE FROM win_order_service_record_mapping
    WHERE order_id = p_id;

    -- Update order details
    UPDATE win_order
    SET datetime = p_datetime,
        totalfee = p_totalfee
    WHERE id = p_id;
   
   	-- Upsert last order date time
    perform win_upsert_last_order_date_time(p_datetime);

    -- Insert new mappings
    FOR i IN 1 .. array_length(p_service_ids, 1) LOOP
        INSERT INTO win_order_service_record_mapping (order_id, service_id)
        VALUES (p_id, p_service_ids[i]);
    END LOOP;

    result := '{"status": 1, "msg": "Order updated successfully."}';
    RETURN result;
EXCEPTION
    WHEN others THEN
        result := '{"status": 0, "msg": "Failed to update order."}';
        RETURN result;
END;
$function$
;


CREATE OR REPLACE FUNCTION public.win_get_all_orders()
 RETURNS TABLE(id integer, datetime timestamp without time zone, totalfee numeric, services jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT o.id,
           o.datetime,
           o.totalfee,
           (
               SELECT jsonb_agg(jsonb_build_object(
                   'id', s.id
               ))
               FROM win_service_record s
               INNER JOIN win_order_service_record_mapping os ON s.id = os.service_id
               WHERE os.order_id = o.id
           ) AS services
    FROM win_order o;

    RETURN;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Failed to fetch orders.';
END;
$function$
;


CREATE OR REPLACE FUNCTION public.win_get_all_order_by_id(p_id integer)
 RETURNS TABLE(id integer, datetime timestamp without time zone, totalfee numeric, services jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT o.id,
           o.datetime,
           o.totalfee,
           (
               SELECT jsonb_agg(jsonb_build_object(
                   'id', s.id
               ))
               FROM win_service_record s
               INNER JOIN win_order_service_record_mapping os ON s.id = os.service_id
               WHERE os.order_id = o.id
           ) AS services
    FROM win_order o
   	where o.id = p_id;

    RETURN;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Failed to fetch orders.';
END;
$function$
;
CREATE OR REPLACE FUNCTION public.win_delete_order(p_id integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSON;
BEGIN
    DELETE FROM win_order_service_record_mapping
    WHERE order_id = p_id;

    DELETE FROM win_order
    WHERE id = p_id;

    result := '{"status": 1, "msg": "Order deleted successfully."}';
    RETURN result;
EXCEPTION
    WHEN others THEN
        result := '{"status": 0, "msg": "Failed to delete order."}';
        RETURN result;
END;
$function$
;


CREATE OR REPLACE FUNCTION public.win_insert_service_record(p_name character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSON;
BEGIN
    INSERT INTO win_service_record (name) VALUES (p_name);

    result := json_build_object('status', 1, 'msg', 'Record inserted successfully.');
    RETURN result;
EXCEPTION
    WHEN others THEN
        result := json_build_object('status', 0, 'msg', 'Failed to insert record.');
        RETURN result;
END;
$function$
;


CREATE OR REPLACE FUNCTION public.win_update_service_record(p_id integer, p_name character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSON;
BEGIN
    UPDATE win_service_record SET 
   		name = p_name
   	WHERE win_service_record.id = p_id;

    result := json_build_object('status', 1, 'msg', 'Record updated successfully.');
    RETURN result;
EXCEPTION
    WHEN others THEN
        result := json_build_object('status', 0, 'msg', 'Failed to update record.');
        RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.win_get_all_service_records()
 RETURNS TABLE(service_id integer, service_name character varying)
 LANGUAGE plpgsql
AS $function$
begin
	RETURN QUERY
    	SELECT 
    		wsr.id,
    		wsr.name
    	FROM win_service_record wsr;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.win_get_service_record_by_id(p_id integer)
 RETURNS TABLE(service_id integer, service_name character varying)
 LANGUAGE plpgsql
AS $function$
begin
	RETURN QUERY
    	SELECT 
    		wsr.id,
    		wsr.name
    	FROM win_service_record wsr
    	where wsr.id = p_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.win_delete_service_record(p_id integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSON;
BEGIN
    DELETE FROM win_service_record WHERE id = p_id;
    result := json_build_object('status', 1, 'msg', 'Record deleted successfully.');
    RETURN result;
EXCEPTION
    WHEN others THEN
        result := json_build_object('status', 0, 'msg', 'Failed to delete record.');
        RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.win_upsert_last_order_date_time(p_datetime timestamp without time zone)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Try to update the existing row
    UPDATE last_order_datetime
    SET last_order_date_time = p_datetime;
    
    -- If the update didn't affect any rows, insert a new row
    IF NOT FOUND THEN
        INSERT INTO last_order_datetime (last_order_date_time)
        VALUES (p_datetime);
    END IF;
END;
$function$
;
