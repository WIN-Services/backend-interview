--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

CREATE DATABASE order_management;

--
-- Name: mst_service; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.mst_service (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_active boolean DEFAULT false NOT NULL
);


ALTER TABLE public.mst_service OWNER TO root;

--
-- Name: mst_service_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.mst_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mst_service_id_seq OWNER TO root;

--
-- Name: mst_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.mst_service_id_seq OWNED BY public.mst_service.id;


--
-- Name: order_service_relation; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.order_service_relation (
    order_id bigint NOT NULL,
    service_id bigint,
    id integer
);


ALTER TABLE public.order_service_relation OWNER TO root;

--
-- Name: TABLE order_service_relation; Type: COMMENT; Schema: public; Owner: root
--

COMMENT ON TABLE public.order_service_relation IS 'Relation on order and service for getting related records as the array in orders would not be sufficient for joins.';


--
-- Name: COLUMN order_service_relation.service_id; Type: COMMENT; Schema: public; Owner: root
--

COMMENT ON COLUMN public.order_service_relation.service_id IS 'one to many relation with order table';


--
-- Name: COLUMN order_service_relation.id; Type: COMMENT; Schema: public; Owner: root
--

COMMENT ON COLUMN public.order_service_relation.id IS 'Auto incremented ID';


--
-- Name: order_service_relation_order_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

ALTER TABLE public.order_service_relation ALTER COLUMN order_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_service_relation_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    total_fee integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    services integer[] NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.orders OWNER TO root;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_id_seq OWNER TO root;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: mst_service id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.mst_service ALTER COLUMN id SET DEFAULT nextval('public.mst_service_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Data for Name: mst_service; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.mst_service (id, name, created_at, is_active) FROM stdin;
1	Inspection	\N	f
3	Analysis	\N	f
4	service4	2022-12-15	t
5	service4	2022-12-15	t
6	service4	2022-12-15	t
7	service4	2022-12-15	t
8	service4	2022-12-15	t
10	service4	2022-12-15	t
12	service4111	2022-12-15	t
2	serviouhuce4	\N	f
13	servisssouhuce4	2022-12-15	t
\.


--
-- Data for Name: order_service_relation; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.order_service_relation (order_id, service_id, id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.orders (order_id, total_fee, created_at, services, updated_at) FROM stdin;
3	300	2022-12-14 00:00:00	{3}	2022-12-15
4	15	2022-12-14 00:00:00	{1,3,5,7,9}	2022-12-15
1	15	2022-12-15 00:00:00	{1,3,5,7,9}	2022-12-15
2	101	2022-12-15 00:00:00	{1,3,5}	2022-12-15
6	1011	2022-12-15 22:18:47.547796	{1,3,5}	2022-12-15
5	11115	2022-12-15 22:18:27.67062	{1,3,5,7,9}	2022-12-15
7	11115	2022-12-15 22:35:15.907285	{1,3,5,7,9}	2022-12-15
8	99	2022-12-16 04:24:02.584	{1,3,5}	2022-12-16
9	11115	2022-12-16 04:24:30.105	{1,3,5,7,9}	2022-12-16
10	11115	2022-12-16 04:26:21.671	{1,3,5,7,9}	2022-12-16
11	11115	2022-12-16 04:28:23.709	{1,3,5,7,9}	2022-12-16
12	11115	2022-12-16 04:28:45.498	{1,3,5,7,9}	2022-12-16
\.


--
-- Name: mst_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.mst_service_id_seq', 14, true);


--
-- Name: order_service_relation_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.order_service_relation_order_id_seq', 1, false);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 12, true);


--
-- Name: mst_service mst_service_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.mst_service
    ADD CONSTRAINT mst_service_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- PostgreSQL database dump complete
--

