-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS elmango;
USE elmango;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS producto (
    ID_produ INT AUTO_INCREMENT PRIMARY KEY,
    Nomproducto VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de registro de actividad
CREATE TABLE IF NOT EXISTS registro_actividad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empleado_id INT,
    fecha_hora_entrada TIMESTAMP,
    fecha_hora_salida TIMESTAMP,
    horas_trabajadas DECIMAL(5,2),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Tabla de ventas por empleado
CREATE TABLE IF NOT EXISTS ventas_empleado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empleado_id INT,
    venta_id INT,
    monto DECIMAL(10,2),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Tabla de papelera de productos
CREATE TABLE IF NOT EXISTS papelera_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    Nomproducto VARCHAR(100),
    precio DECIMAL(10,2),
    descripcion TEXT,
    fecha_eliminacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES producto(ID_produ)
);

-- Tabla de devoluciones
CREATE TABLE IF NOT EXISTS devoluciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    cantidad INT,
    motivo TEXT,
    fecha_devolucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES producto(ID_produ)
);

-- Tabla de encuestas de sistema
CREATE TABLE IF NOT EXISTS encuestas_sistema (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empleado_id INT,
    pregunta TEXT,
    respuesta TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Tabla de encuestas de productos
CREATE TABLE IF NOT EXISTS encuestas_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    comentario TEXT,
    calificacion INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES producto(ID_produ)
);

-- Tabla de llegada de productos
CREATE TABLE IF NOT EXISTS llegada_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    cantidad INT,
    proveedor VARCHAR(100),
    fecha_llegada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES producto(ID_produ)
);
