create database YuMotors2;

use YuMotors2;

create table roles(
idRol int primary key auto_increment,
nombre varchar(10) not null
);

insert into roles(nombre) value ("admin");
/* 
insert into roles(nombre) value ("postVenta"), ("asesor");
 */
 
create table usuarios (
idUsuario int primary key auto_increment,
nombre varchar(50) not null,
pass varchar(250) not null,
idRol int not null,
foreign key (idRol) references roles(idRol)
);

select * from roles;
select * from usuarios;

create table accesorios(
idAccesorio int primary key auto_increment,
nombre varchar(50)not null,
marca varchar(50) not null,
descripcion text,
precio decimal(8,2) not null,
stock int default 1,
imagen varchar(150)
);

INSERT INTO accesorios 
    (nombre, marca, descripcion, precio, stock, imagen) 
VALUES
('Filtro de Aire K&N', 'K&N', 'Filtro de alto flujo reutilizable para Toyota Hilux 2016-2022', 75.00, 40, 'img/kn_filtro_hilux.jpg'),
('Barras de Techo Thule WingBar', 'Thule', 'Juego de barras de aluminio aerodinámicas, color negro, 120cm', 280.00, 15, 'img/thule_wingbar.jpg'),
('Lámpara H4 Night Breaker', 'Osram', 'Juego de 2 lámparas halógenas, 200% más de brillo', 35.50, 60, 'img/osram_h4_nightbreaker.jpg'),
('Batería 12V 75Ah', 'Bosch', 'Batería S4 sellada, libre de mantenimiento, 680A CCA', 150.00, 20, 'img/bosch_s4_75ah.jpg'),
('Kit de Cera Rápida', 'Meguiar', 'Cera Ultimate Quik Wax, 450ml, incluye microfibra', 29.99, 50, 'img/meguiars_quikwax.jpg'),
('Portabicicletas de Techo ProRide', 'Thule', 'Portabicicletas vertical para 1 bicicleta, montaje en barras', 190.00, 10, 'img/thule_proride.jpg'),
('Alfombras de Goma WeatherFit', 'WeatherTech', 'Juego completo (delantero y trasero) para VW Amarok', 120.00, 25, 'img/wt_amarok.jpg'),
('Sensor de Estacionamiento Trasero', 'OEM', 'Kit universal de 4 sensores ultrasónicos, display LED', 45.00, 30, 'img/sensor_parking_oem.jpg'),
('Funda Cubre Volante de Cuero', 'Sparco', 'Funda universal de cuero sintético, color negro/rojo', 22.00, 70, 'img/sparco_funda_volante.jpg'),
('Cargador USB Carga Rápida', 'Anker', 'Cargador de auto 12V, 2 puertos USB, 30W', 18.50, 100, 'img/anker_cargador_auto.jpg'),
('Gato Hidráulico Tipo Botella 2T', 'Bremen', 'Gato hidráulico compacto, capacidad 2 toneladas', 38.00, 22, 'img/bremen_gato_2t.jpg'),
('Kit de Seguridad Vial', 'Genérico', 'Incluye matafuegos 1kg, balizas, chaleco y botiquín', 55.00, 40, 'img/kit_seguridad_vial.jpg'),
('Escobillas Limpiaparabrisas 24"', 'Bosch', 'Juego de 2 escobillas Aerotwin, multianclaje', 28.99, 80, 'img/bosch_aerotwin_24.jpg'),
('Cámara de Retroceso HD', 'Genérico', 'Cámara impermeable con visión nocturna, 170 grados', 33.00, 35, 'img/camara_retroceso_hd.jpg'),
('Líquido Refrigerante Rojo 1L', 'ACDelco', 'Refrigerante/Anticongelante orgánico concentrado', 12.50, 150, 'img/acdelco_refrigerante.jpg'),
('Enganche de Remolque', 'SteelTiger', 'Enganche para Ford Ranger T6, incluye bulonería', 95.00, 12, 'img/steeltiger_ranger.jpg'),
('Aceite Sintético 5W-30 (4L)', 'Mobil 1', 'Aceite de motor 100% sintético, API SN Plus', 65.00, 50, 'img/mobil1_5w30.jpg'),
('Parasol Plegable Aluminizado', 'Genérico', 'Parasol para parabrisas, reflectivo, 130x70cm', 9.99, 200, 'img/parasol_aluminio.jpg'),
('Cubre Carter Metálico', 'Bracco', 'Protector de carter de acero para Fiat Cronos', 70.00, 18, 'img/bracco_cubrecarter_cronos.jpg'),
('Lona Marinera para Caja', 'FlashCover', 'Lona con estructura de aluminio para VW Saveiro', 140.00, 10, 'img/flashcover_saveiro.jpg');

create table repuestos (
idRepuesto int primary key auto_increment,
nombre varchar(50)not null,
marca varchar(50) not null,
numeroParte varchar(50) not null unique,
descripcion text,
precio decimal(8,2) not null,
stock int default 1,
imagen varchar(150)
);

INSERT INTO repuestos
    (nombre, marca, numeroParte, descripcion, precio, stock, imagen)
VALUES
('Pastillas de Freno Delanteras', 'Bosch', 'BP1455', 'Juego de pastillas de freno cerámicas para VW Vento 2.0T', 95.00, 30, 'img/bosch_bp1455.jpg'),
('Disco de Freno Delantero', 'Fremax', 'BD4751', 'Disco de freno ventilado (288mm) para Peugeot 308/408', 78.50, 20, 'img/fremax_bd4751.jpg'),
('Filtro de Aceite', 'Mann-Filter', 'W719/45', 'Filtro de aceite blindado para Ford Ranger 3.2 TDCi', 18.00, 150, 'img/mann_w719_45.jpg'),
('Filtro de Aire de Motor', 'Mahle', 'LX3070', 'Filtro de panel para Renault Duster 2.0 16V', 22.50, 80, 'img/mahle_lx3070.jpg'),
('Bujía de Iridio (Unidad)', 'NGK', 'BKR6EIX', 'Bujía Iridium IX para Chevrolet Corsa/Meriva 1.8', 14.99, 200, 'img/ngk_bkr6eix.jpg'),
('Amortiguador Delantero', 'Monroe', 'G8112', 'Amortiguador a gas OESpectrum (lado derecho) para Fiat Cronos', 130.00, 16, 'img/monroe_g8112.jpg'),
('Kit de Distribución', 'SKF', 'VKMA01113', 'Kit correa de distribución + tensor para VW Gol Trend 1.6 8V', 145.00, 25, 'img/skf_vkma01113.jpg'),
('Bomba de Agua', 'Dolz', 'A188', 'Bomba de agua + junta para Renault Clio 1.6 K4M', 88.00, 30, 'img/dolz_a188.jpg'),
('Bobina de Encendido', 'Bosch', 'F000ZS0210', 'Bobina tipo lápiz para Renault Sandero/Logan 1.6 8V', 55.00, 40, 'img/bosch_f000zs0210.jpg'),
('Extremo de Dirección', 'TRW', 'JBJ753', 'Extremo de dirección (lado izquierdo) para Toyota Hilux 2005-2015', 42.00, 50, 'img/trw_jbj753.jpg'),
('Radiador de Motor', 'Valeo', 'TA6512', 'Radiador de agua y motor, de aluminio, para VW Suran/Fox', 160.00, 10, 'img/valeo_ta6512.jpg'),
('Sensor de Oxígeno (Sonda Lambda)', 'Denso', 'DOX-0109', 'Sonda lambda 4 cables (universal) pre-catalizador', 82.00, 22, 'img/denso_dox0109.jpg'),
('Termostato Completo', 'Vernet', 'TH6988.87J', 'Cuerpo termostato + sensor para Peugeot 207 1.4 TU3JP', 60.50, 18, 'img/vernet_th6988.jpg'),
('Embrague (Kit 3 piezas)', 'Luk', '622309400', 'Placa, disco y rulemán de empuje para Ford Focus 2.0 Duratec', 290.00, 8, 'img/luk_kit_embrague.jpg'),
('Bomba de Combustible', 'Bosch', 'F000TE159A', 'Bomba de nafta eléctrica (refil) universal 3.5 Bar', 75.00, 35, 'img/bosch_bomba_refil.jpg');

create table ventasAccesorios (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    fechaVenta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalVenta DECIMAL(10, 2) NOT NULL 
);

INSERT INTO ventasAccesorios 
    (idVenta, fechaVenta, totalVenta) 
VALUES
(1, '2025-9-01 10:30:00', 75.00),
(2, '2025-9-01 11:15:00', 100.99),
(3, '2025-11-02 09:05:00', 85.50),
(4, '2025-11-02 14:20:00', 28.99),
(5, '2025-11-03 16:00:00', 90.00),
(6, '2025-11-03 17:10:00', 479.99),
(7, '2025-10-04 10:00:00', 150.00),
(8, '2025-10-04 11:30:00', 190.00),
(9, '2025-10-05 09:45:00', 190.00),
(10, '2025-9-05 15:00:00', 99.99),
(11, '2025-09-05 10:00:00', 150.00),
(12, '2025-09-08 15:30:00', 59.00),
(13, '2025-09-15 11:00:00', 65.00),
(14, '2025-09-20 09:15:00', 57.98),
(15, '2025-09-28 17:00:00', 70.00),
(16, '2025-10-02 10:10:00', 120.00),
(17, '2025-10-05 12:00:00', 39.98),
(18, '2025-10-10 16:30:00', 75.00),
(19, '2025-10-15 09:00:00', 50.00),
(20, '2025-10-22 11:00:00', 140.00),
(21, '2025-10-28 18:00:00', 38.00),
(22, '2025-12-01 10:00:00', 71.00),
(23, '2025-12-03 12:30:00', 150.00),
(24, '2025-12-05 16:00:00', 33.00),
(25, '2025-12-10 09:30:00', 280.00),
(26, '2025-12-11 11:00:00', 190.00),
(27, '2025-12-15 14:00:00', 130.00),
(28, '2025-12-18 10:20:00', 145.00),
(29, '2025-12-20 17:00:00', 150.00),
(30, '2025-12-23 18:30:00', 19.98);

CREATE TABLE detalleVentasAccesorios (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    idAccesorio INT NOT NULL, 
    cantidad INT NOT NULL,
    precioMomento decimal(8, 2) NOT NULL, 
    
    FOREIGN KEY (idVenta) 
        REFERENCES ventasAccesorios(idVenta) 
        ON DELETE CASCADE,
        
    FOREIGN KEY (idAccesorio) 
        REFERENCES accesorios(idAccesorio)
);

INSERT INTO detalleVentasAccesorios 
    (idVenta, idAccesorio, cantidad, precioMomento) 
VALUES
-- Venta 1 (Total: 75.00)
(1, 1, 1, 75.00),   -- 1x Filtro K&N

-- Venta 2 (Total: 100.99)
(2, 3, 2, 35.50),   -- 2x Lámpara Osram
(2, 5, 1, 29.99),   -- 1x Kit Cera Meguiar's

-- Venta 3 (Total: 85.50)
(3, 8, 1, 45.00),   -- 1x Sensor Estacionamiento
(3, 9, 1, 22.00),   -- 1x Funda Volante Sparco
(3, 10, 1, 18.50),  -- 1x Cargador USB Anker

-- Venta 4 (Total: 28.99)
(4, 13, 1, 28.99),  -- 1x Escobillas Bosch

-- Venta 5 (Total: 90.00)
(5, 15, 2, 12.50),  -- 2x Líquido Refrigerante
(5, 17, 1, 65.00),  -- 1x Aceite Sintético Mobil

-- Venta 6 (Total: 479.99)
(6, 2, 1, 280.00),  -- 1x Barras Techo Thule
(6, 6, 1, 190.00),  -- 1x Portabicicletas Thule
(6, 18, 1, 9.99),   -- 1x Parasol

-- Venta 7 (Total: 150.00)
(7, 4, 1, 150.00),  -- 1x Batería Bosch

-- Venta 8 (Total: 190.00)
(8, 7, 1, 120.00),  -- 1x Alfombras WeatherTech
(8, 19, 1, 70.00),  -- 1x Cubre Carter Bracco

-- Venta 9 (Total: 190.00)
(9, 1, 1, 75.00),   -- 1x Filtro K&N
(9, 15, 4, 12.50),  -- 4x Líquido Refrigerante
(9, 17, 1, 65.00),  -- 1x Aceite Sintético Mobil

-- Venta 10 (Total: 99.99)
(10, 3, 2, 35.50),  -- 2x Lámpara Osram
(10, 13, 1, 28.99), -- 1x Escobillas Bosch

-- Ventas de Septiembre
(11, 4, 1, 150.00),  -- 1x Batería Bosch
(12, 10, 2, 18.50),  -- 2x Cargador USB Anker
(12, 9, 1, 22.00),   -- 1x Funda Volante Sparco
(13, 17, 1, 65.00),  -- 1x Aceite Sintético Mobil
(14, 13, 2, 28.99),  -- 2x Escobillas Bosch
(15, 19, 1, 70.00),  -- 1x Cubre Carter Bracco

-- Ventas de Octubre
(16, 7, 1, 120.00),  -- 1x Alfombras WeatherTech
(17, 5, 1, 29.99),   -- 1x Kit Cera Meguiar's
(17, 18, 1, 9.99),   -- 1x Parasol
(18, 1, 1, 75.00),   -- 1x Filtro K&N
(19, 15, 4, 12.50),  -- 4x Líquido Refrigerante
(20, 20, 1, 140.00), -- 1x Lona Marinera
(21, 11, 1, 38.00),  -- 1x Gato Hidráulico

-- Ventas de Diciembre
(22, 3, 2, 35.50),   -- 2x Lámpara Osram
(23, 16, 1, 95.00),  -- 1x Enganche de Remolque
(23, 12, 1, 55.00),  -- 1x Kit de Seguridad
(24, 14, 1, 33.00),  -- 1x Cámara de Retroceso
(25, 2, 1, 280.00),  -- 1x Barras Techo Thule
(26, 6, 1, 190.00),  -- 1x Portabicicletas Thule
(27, 17, 2, 65.00),  -- 2x Aceite Sintético Mobil
(28, 19, 1, 70.00),  -- 1x Cubre Carter
(28, 1, 1, 75.00),   -- 1x Filtro K&N
(29, 4, 1, 150.00),  -- 1x Batería Bosch
(30, 18, 2, 9.99);   -- 2x Parasol

create table ventasRepuestos (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    fechaVenta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalVenta DECIMAL(10, 2) NOT NULL 
);

/* IDs del 1 al 20, con fechas en Sep, Oct y Nov */
INSERT INTO ventasRepuestos 
    (idVenta, fechaVenta, totalVenta) 
VALUES
(1, '2025-09-02 11:00:00', 95.00),
(2, '2025-09-05 09:30:00', 157.00),
(3, '2025-09-10 14:00:00', 40.50),
(4, '2025-09-18 10:15:00', 145.00),
(5, '2025-09-25 17:00:00', 260.00),
(6, '2025-10-01 09:00:00', 88.00),
(7, '2025-10-07 16:20:00', 160.00),
(8, '2025-10-15 11:00:00', 290.00),
(9, '2025-10-22 10:00:00', 82.00),
(10, '2025-10-28 15:00:00', 60.50),
(11, '2025-11-01 10:30:00', 75.00),
(12, '2025-11-02 09:10:00', 114.96),
(13, '2025-11-03 11:00:00', 90.00),
(14, '2025-11-04 14:00:00', 252.00),
(15, '2025-11-04 16:30:00', 42.00),
(16, '2025-11-05 09:00:00', 59.96),
(17, '2025-11-05 10:30:00', 36.00),
(18, '2025-11-05 15:00:00', 130.00),
(19, '2025-11-06 09:45:00', 45.00),
(20, '2025-11-06 12:00:00', 163.00);

CREATE TABLE detalleVentasRepuestos (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    idRepuesto int NOT NULL, 
    cantidad INT NOT NULL,
    precioMomento decimal(8, 2) NOT NULL, 
    FOREIGN KEY (idVenta) 
        REFERENCES ventasRepuestos(idVenta) 
        ON DELETE CASCADE,
        
    FOREIGN KEY (idRepuesto) 
        REFERENCES repuestos(idRepuesto)
);

INSERT INTO detalleVentasRepuestos 
    (idVenta, idRepuesto, cantidad, precioMomento) 
VALUES
-- Ventas de Septiembre
(1, 1, 1, 95.00),   -- 1x Pastillas de Freno
(2, 2, 2, 78.50),   -- 2x Disco de Freno
(3, 3, 1, 18.00),   -- 1x Filtro de Aceite
(3, 4, 1, 22.50),   -- 1x Filtro de Aire
(4, 7, 1, 145.00),  -- 1x Kit de Distribución
(5, 6, 2, 130.00),  -- 2x Amortiguador Delantero

-- Ventas de Octubre
(6, 8, 1, 88.00),   -- 1x Bomba de Agua
(7, 11, 1, 160.00), -- 1x Radiador de Motor
(8, 14, 1, 290.00), -- 1x Kit Embrague
(9, 12, 1, 82.00),  -- 1x Sonda Lambda
(10, 13, 1, 60.50), -- 1x Termostato

-- Ventas de Noviembre
(11, 15, 1, 75.00), -- 1x Bomba de Combustible
(12, 9, 1, 55.00),  -- 1x Bobina de Encendido
(12, 5, 4, 14.99),  -- 4x Bujía de Iridio
(13, 3, 5, 18.00),  -- 5x Filtro de Aceite
(14, 1, 1, 95.00),  -- 1x Pastillas de Freno
(14, 2, 2, 78.50),  -- 2x Disco de Freno
(15, 10, 1, 42.00), -- 1x Extremo de Dirección
(16, 5, 4, 14.99),  -- 4x Bujía de Iridio
(17, 3, 2, 18.00),  -- 2x Filtro de Aceite
(18, 6, 1, 130.00), -- 1x Amortiguador Delantero
(19, 4, 2, 22.50),  -- 2x Filtro de Aire
(20, 8, 1, 88.00),  -- 1x Bomba de Agua
(20, 15, 1, 75.00); -- 1x Bomba de Combustible

create table consultas(
idConsulta int primary key auto_increment,
nombre varchar(50) not null,
email varchar(100) not null,
telefono varchar(15) not null,
asunto varchar(50) not null,
mensaje text not null,
preferencia varchar(10),
estado int default 0
);

INSERT INTO consultas 
    (nombre, email, telefono, asunto, mensaje, preferencia, estado) 
VALUES
('Carlos González', 'carlos.gonzalez@example.com', '+543815551234', 'Consulta VW Gol Trend 2018', 'Hola, estoy interesado en el Gol Trend 2018. ¿Sigue disponible? ¿Aceptan permutas?', 'telefono', 0),
('María Rodríguez', 'maria_rod@example.com', '+541145558877', 'Stock Pastillas de Freno BP1455', 'Buen día, ¿tienen stock de las pastillas de freno Bosch BP1455 para un VW Vento?', 'email', 0),
('Juan Pérez', 'jperez@gmail.com', '+543515559090', 'Precio Barras de Techo Thule', 'Quería saber el precio final instaladas de las barras Thule WingBar para una Hilux.', 'telefono', 1),
('Ana López', 'ana.lopez@hotmail.com', '+542215554433', 'Horarios de atención', '¿Cuáles son sus horarios de atención los sábados?', 'email', 1),
('Miguel Torres', 'miguetorres@example.org', '+5438145551111', 'Permuta por Ford Ranger 2017', 'Tengo un Fiat Cronos 2020 y quiero entregarla por la Ranger 2017. ¿Es posible? ¿Qué diferencia tendría?', 'telefono', 0),
('Sofía Martínez', 'sofimartinez@gmail.com', '+54115552222', 'Kit de Distribución SKF', 'Necesito el kit SKF VKMA01113 para un Gol Trend. ¿Hacen envíos a Buenos Aires?', 'email', 0),
('Luis Giménez', 'lucho.gimenez@example.com', '+543816555333', 'Instalación de Enganche', '¿Cuánto me sale el enganche para una Ford Ranger T6 con la instalación incluida?', 'telefono', 1),
('Elena Vázquez', 'elevazquez@hotmail.com', '+543515557788', 'Financiación Peugeot 208', '¿Qué opciones de financiación tienen para el Peugeot 208 Feline 2020?', 'email', 0),
('David Ruiz', 'david.ruiz@example.com', '+541145559900', 'Compatibilidad Amortiguador', 'El amortiguador Monroe G8112, ¿sirve para el Fiat Palio 2015?', 'email', 1),
('Clara Fernández', 'clarafer@gmail.com', '+542235551212', 'Lona Marinera', 'Busco lona marinera para una VW Saveiro 2019. ¿Tienen stock?', 'telefono', 0),
('Pablo Herrera', 'pablo.herrera@example.com', '+543815556789', 'Info Toyota Hilux 2019', '¿La Hilux SRX 2019 tuvo algún choque? ¿Cuántos dueños tuvo?', 'telefono', 0),
('Laura Sánchez', 'laurisanchez@gmail.com', '+541145550011', 'Filtro de Aceite Mann', '¿Es el filtro W719/45 el correcto para una Ranger 3.2 2015?', 'email', 0),
('Martín Acosta', 'martin.acosta@hotmail.com', '+543515552323', 'Kit de Seguridad', '¿El kit de seguridad vial incluye matafuegos aprobado por VTV?', 'email', 1),
('Valeria Díaz', 'valediaz@example.org', '+542215554545', 'Ver el Fiat Cronos 2021', '¿Podría pasar a ver el Cronos GNC mañana por la tarde?', 'telefono', 0),
('Julián Romero', 'julio.romero@gmail.com', '+5438145558888', 'Bujías NGK Iridio', 'Necesito 4 bujías NGK BKR6EIX. ¿Cuál es el precio por las 4?', 'email', 1),
('Diego Castro', 'diegocastro@example.com', '+54115557766', 'Alfombras WeatherTech', '¿Tienen las alfombras WeatherTech para VW Amarok en color beige?', 'telefono', 0),
('Florencia Núñez', 'flor.nunez@hotmail.com', '+543515559898', 'Kilometraje Onix 2022', '¿El kilometraje del Onix 2022 es real? ¿Tiene garantía de fábrica todavía?', 'email', 1),
('Esteban Molina', 'estebanmol@gmail.com', '+542235556767', 'Bomba de Agua Dolz', '¿La bomba Dolz A188 sirve para un Clio 2 1.6 16v? Gracias.', 'email', 0),
('Gabriela Sosa', 'gaby.sosa@example.com', '+543816555001', 'Sensor de Estacionamiento', '¿Ustedes instalan el kit de sensor de estacionamiento? ¿Cuánto demora?', 'telefono', 0),
('Ricardo Vega', 'ricardo.vega@hotmail.com', '+541145553344', '¿Compran usados?', 'Tengo un VW Voyage 2014, ¿ustedes compran autos usados o solo venden?', 'email', 1);

create table vehiculosUsados(
idVehiculoUsado int primary key auto_increment,
marca varchar(50) not null,
modelo varchar(50) not null,
anio int not null,
kilometraje varchar(10) not null,
descripcion varchar(500) not null,
precio double(10,2) not null,
imagen varchar(150)
);

INSERT INTO vehiculosUsados 
    (marca, modelo, anio, kilometraje, descripcion, precio, imagen) 
VALUES
('Volkswagen', 'Gol Trend 1.6', 2018, '85.000 km', 'Versión Pack 3, 5 puertas. Único dueño, VTV al día. Muy buen estado general.', 15500000.00, 'img/vw_gol_2018.jpg'),
('Toyota', 'Hilux 2.8 SRX 4x4', 2019, '110.000 km', 'Automática, 6 velocidades. Cubiertas nuevas. Uso particular. Impecable.', 38000000.00, 'img/toyota_hilux_2019.jpg'),
('Ford', 'Ranger 3.2 XLT', 2017, '130.000 km', '4x2 Manual. Lona, cobertor y enganche. Service oficiales.', 29000000.00, 'img/ford_ranger_2017.jpg'),
('Peugeot', '208 Feline 1.6', 2020, '45.000 km', 'Tope de gama. Techo panorámico, climatizador. Papeles al día, listo para transferir.', 21000000.00, 'img/peugeot_208_2020.jpg'),
('Fiat', 'Cronos Drive 1.3', 2021, '30.000 km', 'Versión con pack Conectividad. GNC de 5ta generación. Excelente estado.', 19500000.00, 'img/fiat_cronos_2021.jpg'),
('Chevrolet', 'Onix 1.2 Turbo LTZ', 2022, '25.000 km', 'Casi nuevo, en garantía. Caja automática. Full, con WiFi a bordo.', 22000000.00, 'img/chevrolet_onix_2022.jpg'),
('Renault', 'Sandero Stepway', 2016, '95.000 km', 'Versión Intens 1.6. Pantalla multimedia MediaNav. 4 cubiertas con poco uso.', 14800000.00, 'img/renault_sandero_2016.jpg'),
('Toyota', 'Etios XLS 1.5 AT', 2019, '60.000 km', 'Sedán 4 puertas. Caja automática. Muy económico. Services oficiales.', 16200000.00, 'img/toyota_etios_2019.jpg'),
('Ford', 'Ka SE 1.5', 2017, '78.000 km', '5 puertas. Aire y dirección. VTV vigente. Muy ágil para la ciudad.', 14000000.00, 'img/ford_ka_2017.jpg'),
('Volkswagen', 'Amarok 2.0 TDI Highline', 2018, '140.000 km', '4x4 Automática. Asientos de cuero. Lona. Service recién hecho. Lista para trabajar.', 33500000.00, 'img/vw_amarok_2018.jpg');

select * from vehiculosUsados;

create table vehiculosPostVenta (
idVehiculoPostVenta int primary key auto_increment,
patente varchar(10) not null unique,
marca varchar(50) not null,
modelo varchar(50) not null,
anio int not null,
telefono varchar(15),
codigo varchar(6) not null unique
);

INSERT INTO vehiculosPostVenta 
    (idVehiculoPostVenta, patente, marca, modelo, anio, telefono, codigo) 
VALUES
(1, 'AC123BD', 'Volkswagen', 'Amarok', 2018, '+543815551111', 'VW1234'),
(2, 'AD456FE', 'Toyota', 'Hilux', 2019, '+541145552222', 'TO4567'),
(3, 'AB789GH', 'Ford', 'Ranger', 2017, '+543515553333', 'FO7890'),
(4, 'AE321KJ', 'Chevrolet', 'S10', 2020, '+542215554444', 'CH3210'),
(5, 'AA987LK', 'Renault', 'Duster Oroch', 2016, '+543815555555', 'RE9876'),
(6, 'AC567NM', 'Fiat', 'Toro', 2018, '+541145556666', 'FI5678'),
(7, 'AD890PQ', 'Peugeot', 'Partner', 2019, '+543515557777', 'PE8901'),
(8, 'AE012RS', 'Volkswagen', 'Saveiro', 2021, '+543815558888', 'VW0123');

create table registroPostVenta (
idRegistroPostVenta int primary key auto_increment,
fecha date not null,
hora time not null,
kilometraje varchar(10),
tipoPostVent varchar(15),
descripcion text,
estado int default 0,
idVehiculoPostVenta int,
foreign key (idVehiculoPostVenta) references vehiculosPostVenta(idVehiculoPostVenta)
);

INSERT INTO registroPostVenta 
    (fecha, hora, kilometraje, tipoPostVent, descripcion, estado, idVehiculoPostVenta) 
VALUES
('2025-10-01', '09:00:00', '105.000 km', 'Service', 'Service programado de 100.000 km. Cambio de aceite, filtros de aire y aceite.', 2, 1),
('2025-10-05', '11:30:00', '80.000 km', 'Reparación', 'Revisar tren delantero, hace ruido al girar a la derecha.', 2, 2),
('2025-10-10', '15:00:00', '120.000 km', 'Control', 'Checkeo general pre-viaje de vacaciones.', 2, 3),
('2025-11-01', '08:30:00', '60.000 km', 'Garantía', 'Falla en el levantavidrios del conductor. No sube.', 1, 4),
('2025-11-02', '10:00:00', '130.000 km', 'Reparación', 'Cambio de kit de distribución completo (correa y tensor).', 2, 5),
('2025-11-05', '09:00:00', '115.000 km', 'Service', 'Service de 110.000 km. Cambio de aceite y filtro de aire.', 0, 1),
('2025-11-06', '14:00:00', '95.000 km', 'Reparación', 'Cambio de pastillas de freno delanteras.', 1, 6),
('2025-11-07', '16:00:00', '70.000 km', 'Reparación', 'Luz de check engine encendida. Se solicita escaneo.', 0, 7),
('2025-11-08', '09:30:00', '40.000 km', 'Service', 'Service de 40.000 km.', 2, 8),
('2025-11-08', '11:00:00', '82.000 km', 'Control', 'Revisión sistema de frenos, líquido bajo. Posible pérdida.', 1, 2),
('2025-11-08', '17:00:00', '61.000 km', 'Garantía', 'Ingreso por ruido en motor al arrancar en frío.', 0, 4),
('2025-11-09', '08:30:00', '125.000 km', 'Reparación', 'Embrague patina. Se solicita cotización y reemplazo.', 0, 3),
('2025-11-09', '10:00:00', '98.000 km', 'Service', 'Service de 100.000 km (atrasado). Revisión general.', 0, 6),
('2025-11-09', '11:00:00', '41.000 km', 'Reparación', 'Alineación y balanceo por desgaste desparejo de cubiertas.', 1, 8),
('2025-11-09', '15:00:00', '72.000 km', 'Control', 'Revisión general de luces y fluidos para VTV.', 2, 7);

create table vehiculosNuevos(
idVehiculoNuevo int primary key auto_increment,
modelo varchar(20),
descripcionUno text,
descripcionDos text,
descripcionTres text
);

create table imagenVehiculoNuevo (
idImgVehiculoNuevo int primary key auto_increment,
idVehiculoNuevo int,
foreign key (idVehiculoNuevo) references vehiculosNuevo(idVehiculoNuevo)
)












