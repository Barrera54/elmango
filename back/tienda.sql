create database  IF NOT EXISTS tienda;
use tienda;
create table IF NOT EXISTS productos(
    id int primary key auto_increment,
    nombre varchar(100) not null,
    descripcion text,
    precio decimal(10,2) not null
);