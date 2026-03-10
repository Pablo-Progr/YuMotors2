create database YuMotors3;

use YuMotors3;

create table roles(
idRol int primary key auto_increment,
nombre varchar(10) not null
);

insert into roles(nombre) value ("admin");
insert into roles(nombre) value ("user");
 
create table usuarios (
idUsuario int primary key auto_increment,
nombre varchar(50) not null,
pass varchar(250) not null,
mail varchar(250),
idRol int not null,
foreign key (idRol) references roles(idRol)
);

select * from usuarios;

select * from roles;
select * from usuarios;

create table accesorios(
idAccesorio int primary key auto_increment,
nombre varchar(50)not null,
marca varchar(50) not null,
descripcion text,
precio decimal(20,2) not null,
stock int default 1,
imagen varchar(150)
);

INSERT INTO accesorios 
    (nombre, marca, descripcion, precio, stock, imagen) 
VALUES
('Filtro de Aire K&N', 'K&N', 'Filtro de alto flujo reutilizable para Toyota Hilux 2016-2022', 154150.00, 40, 'https://californiaparts.com.ar/wp-content/uploads/2023/11/c_RC-1060.jpg'),
('Barras de Techo Thule WingBar', 'Thule', 'Juego de barras de aluminio aerodinámicas, color negro, 120cm', 400000.00, 15, 'https://www.sumitate.com.ar/img/articulos/barra_de_techo_thule_wingbar_edge_959x_2_uds_aerodinamica_al_1_imagen3.jpg'),
('Lámpara H4 Night Breaker', 'Osram', 'Juego de 2 lámparas halógenas, 200% más de brillo', 69600.00, 60, 'https://http2.mlstatic.com/D_NQ_NP_885179-MLA94344481131_102025-O.webp'),
('Batería 12V 75Ah', 'Bosch', 'Batería S4 sellada, libre de mantenimiento, 680A CCA', 135000.00, 20, 'https://static2.aastatic.com.ar/files/variants/1200/89793f8758a242aa94e1bd0a833729ba.jpg'),
('Kit de Cera Rápida', 'Meguiar', 'Cera Ultimate Quik Wax, 450ml, incluye microfibra', 41400.00, 50, 'https://http2.mlstatic.com/D_NQ_NP_944787-MLA46884567161_072021-O.webp'),
('Portabicicletas de Techo ProRide', 'Thule', 'Portabicicletas vertical para 1 bicicleta, montaje en barras', 400000.00, 10, 'https://www.sumitate.com.ar/img/articulos/barra_de_techo_thule_wingbar_edge_959x_2_uds_aerodinamica_al_1_imagen3.jpg'),
('Alfombras de Goma WeatherFit', 'WeatherTech', 'Juego completo (delantero y trasero) para VW Amarok', 140000.00, 25, 'https://http2.mlstatic.com/D_618491-MLA93505067315_092025-C.jpg'),
('Sensor de Estacionamiento Trasero', 'OEM', 'Kit universal de 4 sensores ultrasónicos, display LED', 145000.00, 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9rqChP-8RDY1L50uwk2jNEe-gMjN4KRlVGQ&s'),
('Funda Cubre Volante de Cuero', 'Sparco', 'Funda universal de cuero sintético, color negro/rojo', 40500.00, 70, 'https://http2.mlstatic.com/D_NQ_NP_677337-MLA31614387083_072019-O.webp'),
('Cargador USB Carga Rápida', 'Anker', 'Cargador de auto 12V, 2 puertos USB, 30W', 50000.00, 100, 'https://m.media-amazon.com/images/I/61Bz9tB1G+L._AC_SL1280_.jpg'),
('Gato Hidráulico Tipo Botella 2T', 'Bremen', 'Gato hidráulico compacto, capacidad 2 toneladas', 48500.00, 22, 'https://http2.mlstatic.com/D_Q_NP_666276-MLU73473314994_122023-O.webp'),
('Kit de Seguridad Vial', 'Genérico', 'Incluye matafuegos 1kg, balizas, chaleco y botiquín', 24455.00, 40, 'https://eversafesrl.com/wp-content/uploads/2016/11/002A-Kit-de-seguridad-7-en-1.jpg'),
('Escobillas Limpiaparabrisas 24"', 'Bosch', 'Juego de 2 escobillas Aerotwin, multianclaje', 28400.00, 80, 'https://gomatodo.com/wp-content/uploads/2024/11/escobillas-aerotwin-repuestodo-service-1-unidad.jpg'),
('Cámara de Retroceso HD', 'Genérico', 'Cámara impermeable con visión nocturna, 170 grados', 15750.00, 35, 'https://http2.mlstatic.com/D_684697-MLA84874736545_052025-C.jpg'),
('Líquido Refrigerante Rojo 1L', 'ACDelco', 'Refrigerante/Anticongelante orgánico concentrado', 25500.00, 150, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ymE8NPtdmrKHcNeEqTpU_8i1JPPzALE8yw&s'),
('Enganche de Remolque', 'SteelTiger', 'Enganche para Ford Ranger T6, incluye bulonería', 395000.00, 12, 'https://http2.mlstatic.com/D_NQ_NP_2X_692654-MLA75267667691_032024-T.webp'),
('Aceite Sintético 5W-30 (4L)', 'Mobil 1', 'Aceite de motor 100% sintético, API SN Plus', 49965.00, 50, 'https://pldistribucion.com.ar/web/wp-content/uploads/esp-e1619624152188.jpg'),
('Parasol Plegable Aluminizado', 'Genérico', 'Parasol para parabrisas, reflectivo, 130x70cm', 4599.99, 200, 'https://http2.mlstatic.com/D_776119-MLA83008259843_032025-C.jpg'),
('Cubre Carter Metálico', 'Bracco', 'Protector de carter de acero para Fiat Cronos', 196790.00, 18, 'https://bracco4x4.com/wp-content/uploads/2018/02/cubre-carter.jpg'),
('Lona Marinera para Caja', 'FlashCover', 'Lona con estructura de aluminio para VW Saveiro', 314000.00, 10, 'https://accesoriosjorge.com.ar/wp-content/uploads/2020/11/1-11.jpg');

select * from accesorios; 

create table repuestos (
idRepuesto int primary key auto_increment,
nombre varchar(50)not null,
marca varchar(50) not null,
numeroParte varchar(50) not null unique,
descripcion text,
precio decimal(20,2) not null,
stock int default 1,
imagen varchar(150)
);

INSERT INTO repuestos
    (nombre, marca, numeroParte, descripcion, precio, stock, imagen)
VALUES
('Pastillas de Freno Delanteras', 'Bosch', 'BP1455', 'Juego de pastillas de freno cerámicas para VW Vento 2.0T', 63700.00, 30, 'https://http2.mlstatic.com/D_NQ_NP_672437-MLA89991414421_082025-O.webp'),
('Disco de Freno Delantero', 'Fremax', 'BD4751', 'Disco de freno ventilado (288mm) para Peugeot 308/408', 15000.00, 20, 'https://http2.mlstatic.com/D_NQ_NP_854328-MLA92083797274_092025-O.webp'),
('Filtro de Aceite', 'Mann-Filter', 'W719/45', 'Filtro de aceite blindado para Ford Ranger 3.2 TDCi', 18000.00, 150, 'https://s7g10.scene7.com/is/image/mannhummel/W_7058-filter-with-box?qlt=82&ts=1760882134414&dpr=off'),
('Filtro de Aire de Motor', 'Mahle', 'LX3070', 'Filtro de panel para Renault Duster 2.0 16V', 22000.00, 80, 'https://http2.mlstatic.com/D_NQ_NP_826871-MLA85923097741_062025-O.webp'),
('Bujía de Iridio (Unidad)', 'NGK', 'BKR6EIX', 'Bujía Iridium IX para Chevrolet Corsa/Meriva 1.8', 19600.00, 200, 'https://acdn-us.mitiendanube.com/stores/108/925/products/ngk-iridium1-cd461e1a3102b423e816226590516865-1024-1024.webp'),
('Amortiguador Delantero', 'Monroe', 'G8112', 'Amortiguador a gas OESpectrum (lado derecho) para Fiat Cronos', 110000.00, 16, 'https://acdn-us.mitiendanube.com/stores/005/955/023/products/d_897050-mla31019545131_062019-o-ca69ba7eb47403720b17444770988754-1024-1024.jpg'),
('Kit de Distribución', 'SKF', 'VKMA01113', 'Kit correa de distribución + tensor para VW Gol Trend 1.6 8V', 55000.00, 25, 'https://vehicleaftermarket.skf.com/binaries/pub12/Images/SKF%20timing%20belt%20kit_tcm_12-519293.jpg'),
('Bomba de Agua', 'Dolz', 'A188', 'Bomba de agua + junta para Renault Clio 1.6 K4M', 62800.00, 30, 'https://www.idolz.com/wp-content/uploads/2021/05/bombas-de-agua-dolz.jpg'),
('Bobina de Encendido', 'Bosch', 'F000ZS0210', 'Bobina tipo lápiz para Renault Sandero/Logan 1.6 8V', 146155.00, 40, 'https://http2.mlstatic.com/D_781288-MLA72064181146_102023-C.jpg'),
('Extremo de Dirección', 'TRW', 'JBJ753', 'Extremo de dirección (lado izquierdo) para Toyota Hilux 2005-2015', 32350.00, 50, 'https://http2.mlstatic.com/D_NQ_NP_2X_684379-MLA84092645366_052025-T.webp'),
('Radiador de Motor', 'Valeo', 'TA6512', 'Radiador de agua y motor, de aluminio, para VW Suran/Fox', 16100.00, 10, 'https://m.media-amazon.com/images/I/81AQiy1G7mL._AC_SL1500_.jpg'),
('Sensor de Oxígeno (Sonda Lambda)', 'Denso', 'DOX-0109', 'Sonda lambda 4 cables (universal) pre-catalizador', 160000.00, 22, 'https://cdn.autodoc.de/thumb?id=1665311&m=0&n=0&lng=es&rev=94077894'),
('Termostato Completo', 'Vernet', 'TH6988.87J', 'Cuerpo termostato + sensor para Peugeot 207 1.4 TU3JP', 47900.00, 18, 'https://acdn-us.mitiendanube.com/stores/001/812/330/products/1336v60o1-b80a56db5d7096d9de16813142780065-1024-1024.jpg'),
('Embrague (Kit 3 piezas)', 'Luk', '622309400', 'Placa, disco y rulemán de empuje para Ford Focus 2.0 Duratec', 165000.00, 8, 'https://http2.mlstatic.com/D_NQ_NP_2X_882523-MLA85454488466_062025-T.webp'),
('Bomba de Combustible', 'Bosch', 'F000TE159A', 'Bomba de nafta eléctrica (refil) universal 3.5 Bar', 35000.00, 35, 'img/bosch_bomba_refil.jpg');

select * from repuestos;

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
imagen varchar(150),
estado int default 0
);

INSERT INTO vehiculosUsados 
    (marca, modelo, anio, kilometraje, descripcion, precio, imagen) 
VALUES
('Volkswagen', 'Gol Trend 1.6', 2018, '85.000', 'Versión Pack 3, 5 puertas. Único dueño, VTV al día. Muy buen estado general.', 15500000.00, 'https://cuyomotor.com.ar/wp-content/uploads/2024/08/662200_1_im-1024x596.jpg'),
('Toyota', 'Hilux 2.8 SRX 4x4', 2019, '110.000', 'Automática, 6 velocidades. Cubiertas nuevas. Uso particular. Impecable.', 38000000.00, 'https://www.region20.com.ar/images/5/4/4/5/2/1/544521_1.jpeg?v=2'),
('Ford', 'Ranger 3.2 XLT', 2017, '130.000', '4x2 Manual. Lona, cobertor y enganche. Service oficiales.', 29000000.00, 'https://landinginteligente.com/fotos/CatalogoUsados/deconcesionarias--2023-6-14--18-22-32/aa680d27-9cb8-4f69-ad23-fa1638b518e2.jpg'),
('Peugeot', '208 Feline 1.6', 2020, '45.000', 'Tope de gama. Techo panorámico, climatizador. Papeles al día, listo para transferir.', 21000000.00, 'https://www.automotoresoscar.com.ar/uploads/zzz_oscar/IMG_20220329_163501981_HDR_930.jpg'),
('Fiat', 'Cronos Drive 1.3', 2021, '30.000', 'Versión con pack Conectividad. GNC de 5ta generación. Excelente estado.', 19500000.00, 'https://www.automotoresvillar.com.ar/wp-content/uploads/2024/01/FIAT-CRONOS-DRIVE-PACK-PLUS-2023-5.jpg'),
('Chevrolet', 'Onix 1.2 Turbo LTZ', 2022, '25.000', 'Casi nuevo, en garantía. Caja automática. Full, con WiFi a bordo.', 22000000.00, 'https://www.autoweb.com.ar/wp-content/uploads/2021/09/Chevrolet-Onix-Plus-1.2-estatica.jpg'),
('Renault', 'Sandero Stepway', 2016, '95.000', 'Versión Intens 1.6. Pantalla multimedia MediaNav. 4 cubiertas con poco uso.', 14800000.00, 'https://canaliniautomotores.com.ar/wp-content/uploads/2024/08/IMG_8347-de-tamano-grande.jpeg'),
('Toyota', 'Etios XLS 1.5 AT', 2019, '60.000', 'Sedán 4 puertas. Caja automática. Muy económico. Services oficiales.', 16200000.00, 'https://web.toyotasanjuan.com.ar/wp2024_dic/wp-content/uploads/2025/05/foto-1-1.jpg'),
('Ford', 'Ka SE 1.5', 2017, '78.000', '5 puertas. Aire y dirección. VTV vigente. Muy ágil para la ciudad.', 14000000.00, 'https://cdncla.lavoz.com.ar/avisos/aviso_auto/5546280/vehiculos-auto-5546280-a57d9776-f9f4-4dd8-9abc-2e8779c04691.webp'),
('Volkswagen', 'Amarok 2.0 TDI Highline', 2018, '140.000', '4x4 Automática. Asientos de cuero. Lona. Service recién hecho. Lista para trabajar.', 33500000.00, 'https://cdncla.lavoz.com.ar/files/avisos/aviso_auto/aviso-auto-volkswagen-amarok-14825398.webp');

select * from vehiculosUsados;

create table vehiculosPostVenta (
idVehiculoPostVenta int primary key auto_increment,
patente varchar(10) not null unique,
marca varchar(50) not null,
modelo varchar(50) not null,
anio int not null,
telefono varchar(20),
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
tipoPostVent text,
descripcion text,
estado int default 0,
idVehiculoPostVenta int,
foreign key (idVehiculoPostVenta) references vehiculosPostVenta(idVehiculoPostVenta)
);

INSERT INTO registroPostVenta 
    (fecha, hora, kilometraje, tipoPostVent, descripcion, estado, idVehiculoPostVenta) 
VALUES
('2025-10-01', '09:00:00', '105.000', 'Service', 'Service programado de 100.000 km. Cambio de aceite, filtros de aire y aceite.', 2, 1),
('2025-10-05', '11:30:00', '80.000', 'Reparación', 'Revisar tren delantero, hace ruido al girar a la derecha.', 2, 2),
('2025-10-10', '15:00:00', '120.000', 'Control', 'Checkeo general pre-viaje de vacaciones.', 2, 3),
('2025-11-01', '08:30:00', '60.000', 'Garantía', 'Falla en el levantavidrios del conductor. No sube.', 1, 4),
('2025-11-02', '10:00:00', '130.000', 'Reparación', 'Cambio de kit de distribución completo (correa y tensor).', 2, 5),
('2025-11-05', '09:00:00', '115.000', 'Service', 'Service de 110.000 km. Cambio de aceite y filtro de aire.', 0, 1),
('2025-11-06', '14:00:00', '95.000', 'Reparación', 'Cambio de pastillas de freno delanteras.', 1, 6),
('2025-11-07', '16:00:00', '70.000', 'Reparación', 'Luz de check engine encendida. Se solicita escaneo.', 0, 7),
('2025-11-08', '09:30:00', '40.000', 'Service', 'Service de 40.000 km.', 2, 8),
('2025-11-08', '11:00:00', '82.000', 'Control', 'Revisión sistema de frenos, líquido bajo. Posible pérdida.', 1, 2),
('2025-11-08', '17:00:00', '61.000', 'Garantía', 'Ingreso por ruido en motor al arrancar en frío.', 0, 4),
('2025-11-09', '08:30:00', '125.000', 'Reparación', 'Embrague patina. Se solicita cotización y reemplazo.', 0, 3),
('2025-11-09', '10:00:00', '98.000', 'Service', 'Service de 100.000 km (atrasado). Revisión general.', 0, 6),
('2025-11-09', '11:00:00', '41.000', 'Reparación', 'Alineación y balanceo por desgaste desparejo de cubiertas.', 1, 8),
('2025-11-09', '15:00:00', '72.000', 'Control', 'Revisión general de luces y fluidos para VTV.', 2, 7);

ALTER TABLE vehiculosPostVenta
ADD COLUMN idUsuario INT,
ADD CONSTRAINT fk_vehiculo_usuario
FOREIGN KEY (idUsuario)
REFERENCES usuarios(idUsuario)
ON DELETE SET NULL
ON UPDATE CASCADE;

create table carrito (
    idCarrito int primary key auto_increment,
    idUsuario int not null,
	estado int default 0,
    fechaCreacion timestamp default current_timestamp,
    foreign key (idUsuario) references usuarios(idUsuario)
);

create table carrito_items (
    idItem int primary key auto_increment,
    idCarrito int not null,
    tipoProducto enum('repuesto', 'accesorio') not null, -- Para saber a qué tabla mirar
    idProducto int not null, -- Aquí guardas el idRepuesto o el idAccesorio
    cantidad int not null default 1,
    foreign key (idCarrito) references carrito(idCarrito)
);

select * from carrito





