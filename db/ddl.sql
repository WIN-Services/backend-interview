create table if not exists services (
    id serial primary key,
    service_name text not null
);

// we could have chosen to keep the services in an orders here only as well 
// within a jsonb column as well but I think this would be a better design
create table if not exists orders (
    id serial primary key,
    datetime timestamptz default now() ,
    totalFees numeric,
    is_deleted boolean default false
);

// Indexes can be placed on this table for fast retrieval
create table if not exists orders_services_mapping (
    order_id int references orders(id),
    service_id int references services(id),
    PRIMARY KEY (order_id, service_id)
);

Insert into services(service_name)
values
('test'),
('test1'),
('test2');