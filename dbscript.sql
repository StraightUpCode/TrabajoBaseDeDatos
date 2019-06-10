CREATE DATABASE IF NOT EXISTS SISTEMA_NOMINA ; 
USE SISTEMA_NOMINA; 

CREATE TABLE IF NOT EXISTS Empresa (
	ruc varchar(50) not null,
    nombreEmpresa varchar(50) not null,
    direccionEmpresa varchar(50) not null,
    telefono varchar(14) not null
) ENGINE INNODB;

CREATE TABLE IF NOT EXISTS FrecuenciaDePago (
	idFrecuenciaDePago int auto_increment not null,
    nombre varchar(25) not null,
    CONSTRAINT PK_FrecuenciaDePago Primary Key (idFrecuenciaDePago)
)ENGINE INNODB; 

CREATE TABLE IF NOT EXISTS Trabajador (
	idTrabajador int auto_increment not null,
    nombre varchar(25) not null,
    apellido varchar(25) not null,
    idCargo int not null, /* FK de Cargo */ 
    cedula varchar(14) not null,
    salario numeric(20,2) not null, /* Crear Trigger que determine si es mayor que 0 */ 
    salarioPorHora bool not null,
    fechaDeContratacion date not null,
    idDiaPago int not null, /* FK de Dia de Pago */ 
    idFrecuenciaDePago int not null, /* FK Frecuencia de Pago */
    BorradoLogico boolean default false not null,
    CONSTRAINT PK_Trabajador PRIMARY KEY (idTrabajador)
) ENGINE INNODB ;

CREATE TABLE IF NOT EXISTS Vendedor (
	idVendedor int not null auto_increment,
	idTrabajador int not null, /* FK a Trabajador */
    porcentajeComision numeric(5,2) not null,
    CONSTRAINT PK_Vendedor PRIMARY KEY (idVendedor)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS Horas_Trabajador (
	idHoraTrabajador int not null auto_increment,
    idTrabajador int not null, /* FK a Trabajador */
    mes int not null, 
    horasTrabajadas numeric(4,1) not null,
    horasExtras numeric(4,1) not null,
    
    CONSTRAINT PK_Hora_Trabajador PRIMARY KEY (idHoraTrabajador)
)ENGINE INNODB; 
CREATE TABLE IF NOT EXISTS MarcadoHorario (
    idControlTrabajador_Horario int not null auto_increment,
    idTrabajador int not null, /* FK a Trabajador */
    horaEntrada time not null,
    horaSalida time not null,
    fecha date not null,
    CONSTRAINT PK_ControlTrabajador_Horario primary key (idControlTrabajador_Horario)
    
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS Horario(
idHorario int not null auto_increment,
horaEntrada time not null,
horaSalida time not null,
CONSTRAINT PK_Horario primary key (idHorario)
);

CREATE TABLE IF NOT EXISTS Trabajador_Horario (
idT_H int not null auto_increment,
idTrabajador int not null,
idHorario int not null,
constraint PK_Trabajador_Horario primary key (idT_H)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS Cargo (
idCargo int not null auto_increment,
nombre varchar(25) not null,
BorradoLogico boolean default false not null,

constraint PK_Cargo primary key (idCargo)

)ENGINE INNODB;
CREATE TABLE IF NOT EXISTS DiaDePago (
idDiaDePago int not null auto_increment,
diaPago int not null,
constraint PK_Dia_de_pago primary key ( idDiaDePago)
)ENGINE INNODB;
CREATE TABLE IF NOT EXISTS Prestamo (
idPrestamo int not null auto_increment,
idTrabajador int not null,
fechaInicial date not null,
cuota int not null,
monto int not null,
cancelado boolean,
constraint PK_Prestamo primary key(idPrestamo)
)ENGINE INNODB;
CREATE TABLE IF NOT EXISTS PagoPrestamo (
idPagoPrestamo int not null auto_increment,
idPrestamo int not null,
montoPagado int not null,
fechaDePago date not null,
constraint PK_PagoPrestamo primary key (idPagoPrestamo)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS PeriodoPago(
idPeriodoPago int not null auto_increment,
inicioPeriodo date not null,
finPeriodo date not null,
CONSTRAINT PK_PeriodoPago primary key (idPeriodoPago)
);

CREATE TABLE IF NOT EXISTS Nomina(
idNomina int not null auto_increment,
idTrabajador int not null ,
idPeriodoPago int not null,
fechaDeEmision date not null,
salarioPagado numeric(20,2), 
CONSTRAINT PK_Nomina primary key (idNomina)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS Deduccion(
idDeduccion int not null auto_increment,
idNomina int not null ,
inss numeric(20,2),
IR numeric(20,2),
CONSTRAINT PK_Deduccion primary key(idDeduccion)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS DeduccionNoFija(
 idDeduccionNoFija int not null auto_increment,
 idDeduccion int not null ,
 deduccionHorasRetraso numeric(5,2),
 CONSTRAINT PK_DeduccionNoFija primary key (idDeduccionNoFija)
 )ENGINE INNODB;

CREATE TABLE IF NOT EXISTS DNFija_Prestamo(
 idDeduccion int not null auto_increment,
idPagoPrestamo int not null ,
CONSTRAINT PK_dnfija_Prestamo primary key (idDeduccion , idPagoPrestamo)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS IngresoNoFijo(
idIngresoNoFijo int not null auto_increment,
idNomina int not null ,
viatico numeric(20,2) not null,
incentivo numeric(20,2) not null,
pagoHorasExtras numeric(20,2) not null,
CONSTRAINT PK_IngresoNoFijo primary key (idIngresoNoFijo)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS Aguinaldo(
idAguinaldo int not null auto_increment,
idIngresoNoFijo int not null ,
decimoTercerMes numeric(20,2),
CONSTRAINT PK_Aguinaldo primary key (idAguinaldo)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS IngresoNoFijoVendedor(
idIngresoNoFijoVendedor int not null, 
idIngresoNoFijo int not null, 
pagaDeComision numeric(20,2),
CONSTRAINT PK_ingresoNoFijoVendedor primary key (idIngresoNoFijoVendedor)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS User (
    idUser int auto_increment,
    username varchar(50) not null,
    password varchar(50) not null,
    idRol  int not null,
	BorradoLogico boolean default false,
    CONSTRAINT PK_User PRIMARY Key (idUser)
)ENGINE INNODB; 

CREATE TABLE IF NOT EXISTS Rol (
    idRol int auto_increment,
    nombre varchar(50) not null,
    CONSTRAINT PK_Rol PRIMARY KEY (idRol)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS SalarioAcumulado_IR (
    idSalarioAcumulado int auto_increment,
    idTrabajador int not null,
    salarioAcumulado numeric(20,2) default 0,
    meses int default 0 ,
    CONSTRAINT PK_SalarioAcumulador PRIMARY KEY (idSalarioAcumulado)
)ENGINE INNODB;
Alter Table SalarioAcumulado_IR
    ADD Constraint FK_SalarioAcumulador_Trabajador FOREIGN KEY (idTrabajador) REFERENCES Trabajador(idTrabajador);
/* Llabe Foranea Usuario */
Alter Table User 
    ADD CONSTRAINT FK_User_Rol FOREIGN KEY (idRol) REFERENCES Rol(idRol);

/* Llave Foranea en la tabla Vendedor*/
Alter Table Vendedor
	ADD Constraint  FK_Vendedor_Trabajador FOREIGN KEY (idTrabajador) REFERENCES Trabajador(idTrabajador) ;
/* Llave Foranea en la Tabla Horas_Trabajador*/
ALTER TABLE Horas_Trabajador
	ADD CONSTRAINT FK_HT_Trabajadro FOREIGN KEY (idTrabajador) REFERENCES Trabajador(idTrabajador);
/* Llaves Foraneas en la Tabla Trabajador */
Alter Table Trabajador
	ADD CONSTRAINT FK_Trabajador_Cargo FOREIGN Key (idCargo) REFERENCES Cargo(idCargo),
    ADD CONSTRAINT FK_Trabajador_FrecuenciaDePago FOREIGN KEY (idFrecuenciaDePago) REFERENCES FrecuenciaDePago(idFrecuenciaDePago),
    	ADD CONSTRAINT FK_Trabajador_DiaDePago FOREIGN Key (idDiaPago) REFERENCES DiaDePago(idDiaDePago);

/* Llaves Foreaneas MarcadoHorario*/ 
Alter Table MarcadoHorario
	ADD CONSTRAINT FK_Trabajador_MarcadoHorario FOREIGN KEY (idTrabajador) references Trabajador(idTrabajador);
/* Llaves Foreanea Trabajador Horario */
Alter Table Trabajador_Horario 
	ADD CONSTRAINT FK_TH_Trabajador FOREIGN KEY (idTrabajador) References Trabajador(idTrabajador);

Alter Table Trabajador_Horario 
	ADD CONSTRAINT FK_TH_Horario FOREIGN KEY (idHorario) References Horario(idHorario);
/* LLaves Foraneas Prestamo*/
Alter Table Prestamo
	ADD CONSTRAINT FK_Prestamo_Trabajador FOREIGN KEY (idTrabajador) references Trabajador(idTrabajador);
/* Llave Forenea en pago Prestamo */
Alter Table PagoPrestamo
	ADD CONSTRAINT FK_PagoPrestamo_Prestamo FOREIGN KEY (idPrestamo) REFERENCES Prestamo(idPrestamo);
/* Llave Foranea Nomina */
ALTER TABLE Nomina
	ADD CONSTRAINT FK_Nomina_Trabajador FOREIGN KEY (idTrabajador) REFERENCES Trabajador(idTrabajador);
ALTER TABLE Nomina
	ADD CONSTRAINT FK_Nomina_PeriodoPago FOREIGN KEY (idPeriodoPago) REFERENCES PeriodoPago(idPeriodoPago);
/* Llave Foranea Deduccion */
ALTER TABLE Deduccion
	ADD CONSTRAINT FK_Deduccion_Planilla FOREIGN KEY (idNomina) REFERENCES Nomina(idNomina);
/* Llave Foranea Deduccion No Fija */
ALTER TABLE DeduccionNoFija
	ADD CONSTRAINT FK_Deduccion_DNFija FOREIGN KEY (idDeduccion) REFERENCES Deduccion(idDeduccion);
/* Llave Foranea DNF Fija Prestamo */
ALTER TABLE DNFija_Prestamo 
	ADD CONSTRAINT FK_DNFJP_Prestamo FOREIGN KEY (idPagoPrestamo) REFERENCES PagoPrestamo(idPagoPrestamo);
ALTER TABLE DNFija_Prestamo 
	ADD CONSTRAINT FK_DNFJP_Deduccion FOREIGN KEY (idDeduccion) REFERENCES Deduccion(idDeduccion);
/* Llave Foraneas Ingreso no Fijo */ 
ALTER TABLE IngresoNoFijo
	ADD CONSTRAINT FK_INF_Planilla FOREIGN KEY (idNomina) REFERENCES Nomina(idNomina);
/* Llave Foranea Aguinaldo */
ALTER TABLE Aguinaldo
	ADD CONSTRAINT FK_INF_Aguinaldo FOREIGN KEY (idIngresoNoFijo) REFERENCES IngresoNoFijo(idIngresoNoFijo);

/* Llave Foranea I N F Vendedor */
ALTER TABLE IngresoNoFijoVendedor
	ADD CONSTRAINT FK_INF_Vendedor FOREIGN KEY (idIngresoNoFijo) REFERENCES IngresoNoFijo(idIngresoNoFijo);


/* Triggers  */
DELIMITER $$
CREATE TRIGGER salarioAcumulado 
AFTER INSERT ON Trabajador 
FOR EACH ROW 
BEGIN 
	INSERT INTO SalarioAcumulado_IR(idTrabajador , salarioAcumulado, meses) values(new.idTrabajador , 0, 0);
END$$ 



DELIMITER $$
CREATE TRIGGER sumarSalarioAcumulado 
BEFORE UPDATE ON SalarioAcumulado_IR  
FOR EACH ROW 
BEGIN 
	IF new.salarioAcumulado > 0 THEN SET new.salarioAcumulado = old.salarioAcumulado + new.salarioAcumulado;
    SET new.meses = old.meses + 1 ;
    END IF;
END$$ 


Insert into Rol (nombre) values("admin");*/
Insert into User(username, password , idRol) values ("root", "admin" , 1);

/* Mock Data  */

Insert into FrecuenciaDePago(nombre) values ("Mensual") , ("Quincenal");

Insert into Cargo(nombre) values ("Ingeniero"), ("Administrador"),("Vendedor");

Insert into DiaDePago(diaPago) values(15), (30) ;

Insert into Horario(horaEntrada, horaSalida) values('7:00','12:00'), ('1:00','5:00');
Insert into Trabajador(nombre, apellido, idCargo, cedula, salario, salarioPorHora, fechaDeContratacion, idDiaPago, idFrecuenciaDePago) values("Roberto","Sanchez",1,"35987lmao",10000.25,FALSE,"2019-05-02",1,1)
("Luz","Perez",1,"35987lmao",1000.25,FALSE,"2019-05-02",1,1),
("Maria","Luisa",1,"35987lmao",20.25,TRUE,"2019-05-02",1,1);
/*
insert into Trabajador_Horario(idTrabajador, idHorario) values (1,2),(2,1),(3,1);
/*  End Mock Data  */