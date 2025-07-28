-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-07-2025 a las 03:29:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `elmango`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_frecuent`
--

CREATE TABLE `cliente_frecuent` (
  `id_Frecuen` int(11) NOT NULL,
  `NombreClien` varchar(12) NOT NULL,
  `N_de celular:` int(12) NOT NULL,
  `N_de CC o TI` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `Telefono` varchar(20) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `Cedula` varchar(20) DEFAULT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `Usuario` varchar(10) NOT NULL,
  `Contraseña` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`id`, `nombre`, `fecha_registro`, `Telefono`, `Correo`, `Cedula`, `cargo`, `Usuario`, `Contraseña`) VALUES
(7, 'Ana Lopez', '2025-07-18 01:40:44', '3101234567', 'ana@example.com', '1001234567', 'Administrador', 'ana', 'pass1'),
(8, 'Juan Perez', '2025-07-18 01:40:44', '3112345678', 'juan@example.com', '1002345678', 'Empleado', 'juan', 'asdaew'),
(9, 'Maria Gil', '2025-07-18 01:40:44', '3123456789', 'maria@example.com', '1003456789', 'Administrador', 'maria', 'wqdwwedw'),
(10, 'Luis Ruiz', '2025-07-18 01:40:44', '3134567890', 'luis@example.com', '1004567890', 'Empleado', 'luis', 'pass4'),
(11, 'Sofia Mora', '2025-07-18 01:40:44', '3145678901', 'sofia@example.com', '1005678901', 'Administrador', 'sofia', 'edwqeqeda'),
(12, 'Pedro Vaz', '2025-07-18 01:40:44', '3156789012', 'pedro@example.com', '1006789012', 'Empleado', 'pedro', 'pass6'),
(13, 'Juan Pérez', '2025-07-18 05:00:00', '1234567890', 'juan.perez@example.com', '100100100', 'Empleado', 'juanp', 'password12'),
(18, 'Samuel', '2025-07-18 05:00:00', '32449374', 'sadsd@hssa.com', '2342423', 'administrador', 'Sam7382', 'asdade2432'),
(19, 'sEWWEQ', '2025-07-18 05:00:00', '26734264', 'dsada@nssdahhu', '23242', 'Empleado', 'wedsadse', '34243wesd'),
(20, 'Santiago lopera', '2025-07-18 05:00:00', '324123', 'sasda@hsdsf', '234234', 'administrador', 'dadwq123', 'jehnejnsd'),
(22, 'weqewfs', '2025-07-18 05:00:00', '345423', 'dsffs@xn--dsa-7ma', '43424234', 'Empleado', 'qweeds', '4eascerxq');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devoluciones`
--

CREATE TABLE `devoluciones` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `motivo` text DEFAULT NULL,
  `fecha_devolucion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas_producto`
--

CREATE TABLE `encuestas_producto` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `comentario` text DEFAULT NULL,
  `calificacion` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas_sistema`
--

CREATE TABLE `encuestas_sistema` (
  `id` int(11) NOT NULL,
  `empleado_id` int(11) NOT NULL,
  `pregunta` text NOT NULL,
  `respuesta` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `llegada_producto`
--

CREATE TABLE `llegada_producto` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `proveedor` varchar(100) DEFAULT NULL,
  `fecha_llegada` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `papelera_producto`
--

CREATE TABLE `papelera_producto` (
  `id` int(11) NOT NULL,
  `Nomproducto` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_eliminacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `papelera_producto`
--

INSERT INTO `papelera_producto` (`id`, `Nomproducto`, `precio`, `descripcion`, `fecha_eliminacion`) VALUES
(12, 'Jabón de Barra 100g', 1800.00, 'Jabón de tocador en barra, 100 gramos.', '2025-07-21 19:37:39'),
(13, 'Cereal Desayuno 500g', 9000.00, 'Cereal de maíz azucarado para el desayuno, caja de 500g.', '2025-07-21 19:37:39'),
(14, 'Atún en Aceite 180g', 6000.00, 'Lata de atún en aceite vegetal, 180 gramos.', '2025-07-21 19:37:39'),
(15, 'Leche Condensada 300g', 7500.00, 'Leche condensada azucarada, tubo de 300 gramos.', '2025-07-21 19:37:39'),
(16, 'Salsa de Tomate 400g', 3200.00, 'Salsa de tomate clásica, botella de 400 gramos.', '2025-07-21 19:37:39'),
(18, 'Aceite de Girasol 900ml', 14000.00, 'Aceite de girasol para cocinar, botella de 900ml.', '2025-07-21 19:37:39'),
(19, 'Pan Blanco', 2.50, 'Pan fresco de molde, ideal para sándwiches.', '2025-07-21 20:38:07'),
(20, 'Pan ', 2.50, 'Pan fresco de molde, ideal para sándwiches.', '2025-07-21 20:48:42'),
(21, 'Aceite', 15000.00, 'wdadsasxa', '2025-07-21 20:54:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ID_produ` int(11) NOT NULL,
  `Codi_produ` text NOT NULL,
  `Nomproducto` varchar(100) NOT NULL,
  `precio` decimal(10,4) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `categoria` varchar(12) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID_produ`, `Codi_produ`, `Nomproducto`, `precio`, `descripcion`, `fecha_registro`, `categoria`, `stock`) VALUES
(2, 'Acei', 'Aceite', 15000.0000, 'wdadsasxa', '2025-07-18 05:00:00', 'Comun', 22),
(3, 'LEC-ALP-1L', 'Leche Alpina 1L', 4200.0000, 'Bolsa de leche entera Alpina 1 litro', '2025-07-18 05:00:00', 'Comun', 0),
(4, 'PAN-BIM-500', 'Pan Bimbo Tradicional', 2000.0000, 'MUY DELICIOSO', '2025-07-18 05:00:00', 'Raro', 12),
(5, 'HUE-KIK-12', 'Huevos Kikes 12 und', 9500.0000, 'Cubeta de 12 huevos blancos Kikes', '2025-07-18 05:00:00', 'Comun', 0),
(7, '', 'Agua mineral', 12000.0000, 'Muy rica', '2025-07-19 21:12:20', 'Comun', 13),
(8, 'helchoco', 'Helado de chococono', 2500.0000, 'Rico helado', '2025-07-19 21:18:16', 'Comun', 10),
(9, 'Arroa', 'Arroz roa', 2000.0000, 'Muy rica', '2025-07-19 21:21:17', 'Comun', 20),
(10, 'saweee', 'qwerw', 23132.0000, 'asdaerdsd', '2025-07-19 21:23:35', 'Comun', 20),
(12, 'aswdwe', 'Leche Alpina 1L', 321321.0000, 'ewedfwede', '2025-07-19 21:35:51', 'Comun', 221),
(13, 'AZU-STD-1KG', 'Azúcar Estándar 1Kg', 3500.0000, 'Azúcar blanco refinado, bolsa de 1 kilogramo.', '2025-07-21 19:02:46', 'Comun', 50),
(14, 'CAF-MOL-250G', 'Café Molido 250g', 12000.0000, 'Café 100% colombiano, tostado y molido, paquete de 250 gramos.', '2025-07-21 19:02:47', 'Comun', 30),
(15, 'PAS-DEN-75ML', 'Pasta Dental 75ml', 8500.0000, 'Pasta dental con flúor para protección total, tubo de 75 mililitros.', '2025-07-21 19:02:47', 'Higiene', 40),
(16, 'JAB-LIQ-500ML', 'Jabón Líquido 500ml', 10000.0000, 'Jabón líquido para manos con aroma a lavanda, botella de 500 mililitros.', '2025-07-21 19:02:47', 'Higiene', 25),
(17, 'ARROZ-PRE-5KG', 'Arroz Premium 5Kg', 18000.0000, 'Arroz blanco de grano largo, calidad premium, bulto de 5 kilogramos.', '2025-07-21 19:02:47', 'Comun', 15),
(18, 'ACE-OLI-1L', 'Aceite de Oliva 1L', 25.0000, 'Aceite de oliva extra virgen, primera prensa en frío, botella de 1 litro.', '2025-07-21 19:02:47', 'Raro', 10),
(19, 'CANDY001', 'Bocadillo Veleño', 2.5000, 'Dulce tradicional de guayaba, típico de Vélez, Santander.', '2025-07-21 21:03:41', 'Dulces Típic', 100),
(20, '11', 'Galletas María 200g', 2000.0000, 'Paquete de galletas tipo María, 200 gramos.', '2025-07-21 21:14:46', 'General', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_actividad`
--

CREATE TABLE `registro_actividad` (
  `id` int(11) NOT NULL,
  `empleado_id` int(11) NOT NULL,
  `fecha_hora_entrada` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_hora_salida` timestamp NULL DEFAULT NULL,
  `horas_trabajadas` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_empleado`
--

CREATE TABLE `ventas_empleado` (
  `id_Vent` int(11) NOT NULL,
  `emplead_nom` varchar(12) NOT NULL,
  `monto` decimal(10,3) NOT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas_empleado`
--

INSERT INTO `ventas_empleado` (`id_Vent`, `emplead_nom`, `monto`, `fecha_hora`) VALUES
(1, 'Juan Pérez', 2500.500, '2025-07-08 15:30:00'),
(2, 'María López', 3100.750, '2025-07-08 17:15:00'),
(3, 'Carlos Ramír', 1800.000, '2025-07-08 19:45:00'),
(4, 'Valentina Ra', 2500.500, '2025-07-08 15:30:00'),
(5, 'Mateo Hernán', 3100.750, '2025-07-08 17:15:00'),
(6, 'Camila Torre', 1800.000, '2025-07-08 19:45:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente_frecuent`
--
ALTER TABLE `cliente_frecuent`
  ADD PRIMARY KEY (`id_Frecuen`);

--
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `devoluciones`
--
ALTER TABLE `devoluciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `encuestas_producto`
--
ALTER TABLE `encuestas_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `encuestas_sistema`
--
ALTER TABLE `encuestas_sistema`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleado_id` (`empleado_id`);

--
-- Indices de la tabla `llegada_producto`
--
ALTER TABLE `llegada_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `papelera_producto`
--
ALTER TABLE `papelera_producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ID_produ`);

--
-- Indices de la tabla `registro_actividad`
--
ALTER TABLE `registro_actividad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleado_id` (`empleado_id`);

--
-- Indices de la tabla `ventas_empleado`
--
ALTER TABLE `ventas_empleado`
  ADD PRIMARY KEY (`id_Vent`),
  ADD KEY `empleado_id` (`emplead_nom`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente_frecuent`
--
ALTER TABLE `cliente_frecuent`
  MODIFY `id_Frecuen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `devoluciones`
--
ALTER TABLE `devoluciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `encuestas_producto`
--
ALTER TABLE `encuestas_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `encuestas_sistema`
--
ALTER TABLE `encuestas_sistema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `llegada_producto`
--
ALTER TABLE `llegada_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `papelera_producto`
--
ALTER TABLE `papelera_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID_produ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `registro_actividad`
--
ALTER TABLE `registro_actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ventas_empleado`
--
ALTER TABLE `ventas_empleado`
  MODIFY `id_Vent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
