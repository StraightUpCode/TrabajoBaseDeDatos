-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema SISTEMA_NOMINA
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SISTEMA_NOMINA
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LMAO` ;
USE `LMAO` ;

-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`PeriodoPago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`PeriodoPago` (
  `idPeriodoPago` INT(11) NOT NULL AUTO_INCREMENT,
  `inicioPeriodo` DATE NOT NULL,
  `finPeriodo` DATE NOT NULL,
  PRIMARY KEY (`idPeriodoPago`))
ENGINE = InnoDB
AUTO_INCREMENT = 172
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Cargo` (
  `idCargo` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idCargo`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`DiaDePago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`DiaDePago` (
  `idDiaDePago` INT(11) NOT NULL AUTO_INCREMENT,
  `diaPago` INT(11) NOT NULL,
  PRIMARY KEY (`idDiaDePago`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`FrecuenciaDePago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`FrecuenciaDePago` (
  `idFrecuenciaDePago` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idFrecuenciaDePago`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Trabajador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Trabajador` (
  `idTrabajador` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  `apellido` VARCHAR(25) NOT NULL,
  `idCargo` INT(11) NOT NULL,
  `cedula` VARCHAR(14) NOT NULL,
  `salario` DECIMAL(9,2) NOT NULL,
  `salarioPorHora` TINYINT(1) NOT NULL,
  `fechaDeContratacion` DATE NOT NULL,
  `idDiaPago` INT(11) NOT NULL,
  `idFrecuenciaDePago` INT(11) NOT NULL,
  PRIMARY KEY (`idTrabajador`),
  INDEX `FK_Trabajador_Cargo` (`idCargo` ASC) VISIBLE,
  INDEX `FK_Trabajador_FrecuenciaDePago` (`idFrecuenciaDePago` ASC) VISIBLE,
  INDEX `FK_Trabajador_DiaDePago` (`idDiaPago` ASC) VISIBLE,
  CONSTRAINT `FK_Trabajador_Cargo`
    FOREIGN KEY (`idCargo`)
    REFERENCES `SISTEMA_NOMINA`.`Cargo` (`idCargo`),
  CONSTRAINT `FK_Trabajador_DiaDePago`
    FOREIGN KEY (`idDiaPago`)
    REFERENCES `SISTEMA_NOMINA`.`DiaDePago` (`idDiaDePago`),
  CONSTRAINT `FK_Trabajador_FrecuenciaDePago`
    FOREIGN KEY (`idFrecuenciaDePago`)
    REFERENCES `SISTEMA_NOMINA`.`FrecuenciaDePago` (`idFrecuenciaDePago`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Nomina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Nomina` (
  `idNomina` INT(11) NOT NULL AUTO_INCREMENT,
  `idTrabajador` INT(11) NOT NULL,
  `idPeriodoPago` INT(11) NOT NULL,
  `fechaDeEmision` DATE NOT NULL,
  `salarioPagado` DECIMAL(7,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idNomina`),
  INDEX `FK_Nomina_Trabajador` (`idTrabajador` ASC) VISIBLE,
  INDEX `FK_Nomina_PeriodoPago` (`idPeriodoPago` ASC) VISIBLE,
  CONSTRAINT `FK_Nomina_PeriodoPago`
    FOREIGN KEY (`idPeriodoPago`)
    REFERENCES `SISTEMA_NOMINA`.`PeriodoPago` (`idPeriodoPago`),
  CONSTRAINT `FK_Nomina_Trabajador`
    FOREIGN KEY (`idTrabajador`)
    REFERENCES `SISTEMA_NOMINA`.`Trabajador` (`idTrabajador`))
ENGINE = InnoDB
AUTO_INCREMENT = 76
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`IngresoNoFijo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`IngresoNoFijo` (
  `idIngresoNoFijo` INT(11) NOT NULL AUTO_INCREMENT,
  `idNomina` INT(11) NOT NULL,
  `viatico` DECIMAL(7,2) NOT NULL,
  `incentivo` DECIMAL(7,2) NULL DEFAULT NULL,
  `pagoHorasExtras` DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (`idIngresoNoFijo`),
  INDEX `FK_INF_Planilla` (`idNomina` ASC) VISIBLE,
  CONSTRAINT `FK_INF_Planilla`
    FOREIGN KEY (`idNomina`)
    REFERENCES `SISTEMA_NOMINA`.`Nomina` (`idNomina`))
ENGINE = InnoDB
AUTO_INCREMENT = 41
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Aguinaldo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Aguinaldo` (
  `idAguinaldo` INT(11) NOT NULL AUTO_INCREMENT,
  `idIngresoNoFijo` INT(11) NOT NULL,
  `decimoTercerMes` DECIMAL(7,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idAguinaldo`),
  INDEX `FK_INF_Aguinaldo` (`idIngresoNoFijo` ASC) VISIBLE,
  CONSTRAINT `FK_INF_Aguinaldo`
    FOREIGN KEY (`idIngresoNoFijo`)
    REFERENCES `SISTEMA_NOMINA`.`IngresoNoFijo` (`idIngresoNoFijo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Deduccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Deduccion` (
  `idDeduccion` INT(11) NOT NULL AUTO_INCREMENT,
  `idNomina` INT(11) NOT NULL,
  `inss` DECIMAL(12,2) NULL DEFAULT NULL,
  `IR` DECIMAL(12,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idDeduccion`),
  INDEX `FK_Deduccion_Planilla` (`idNomina` ASC) VISIBLE,
  CONSTRAINT `FK_Deduccion_Planilla`
    FOREIGN KEY (`idNomina`)
    REFERENCES `SISTEMA_NOMINA`.`Nomina` (`idNomina`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Prestamo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Prestamo` (
  `idPrestamo` INT(11) NOT NULL AUTO_INCREMENT,
  `idTrabajador` INT(11) NOT NULL,
  `fechaInicial` DATE NOT NULL,
  `cuota` INT(11) NOT NULL,
  `monto` INT(11) NOT NULL,
  `cancelado` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idPrestamo`),
  INDEX `FK_Prestamo_Trabajador` (`idTrabajador` ASC) VISIBLE,
  CONSTRAINT `FK_Prestamo_Trabajador`
    FOREIGN KEY (`idTrabajador`)
    REFERENCES `SISTEMA_NOMINA`.`Trabajador` (`idTrabajador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`PagoPrestamo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`PagoPrestamo` (
  `idPagoPrestamo` INT(11) NOT NULL AUTO_INCREMENT,
  `idPrestamo` INT(11) NOT NULL,
  `montoPagado` INT(11) NOT NULL,
  `fechaDePago` DATE NOT NULL,
  PRIMARY KEY (`idPagoPrestamo`),
  INDEX `FK_PagoPrestamo_Prestamo` (`idPrestamo` ASC) VISIBLE,
  CONSTRAINT `FK_PagoPrestamo_Prestamo`
    FOREIGN KEY (`idPrestamo`)
    REFERENCES `SISTEMA_NOMINA`.`Prestamo` (`idPrestamo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`DNFija_Prestamo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`DNFija_Prestamo` (
  `idDeduccion` INT(11) NOT NULL AUTO_INCREMENT,
  `idPagoPrestamo` INT(11) NOT NULL,
  PRIMARY KEY (`idDeduccion`, `idPagoPrestamo`),
  INDEX `FK_DNFJP_Prestamo` (`idPagoPrestamo` ASC) VISIBLE,
  CONSTRAINT `FK_DNFJP_Deduccion`
    FOREIGN KEY (`idDeduccion`)
    REFERENCES `SISTEMA_NOMINA`.`Deduccion` (`idDeduccion`),
  CONSTRAINT `FK_DNFJP_Prestamo`
    FOREIGN KEY (`idPagoPrestamo`)
    REFERENCES `SISTEMA_NOMINA`.`PagoPrestamo` (`idPagoPrestamo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`DeduccionNoFija`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`DeduccionNoFija` (
  `idDeduccionNoFija` INT(11) NOT NULL AUTO_INCREMENT,
  `idDeduccion` INT(11) NOT NULL,
  `deduccionHorasRetraso` DECIMAL(5,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idDeduccionNoFija`),
  INDEX `FK_Deduccion_DNFija` (`idDeduccion` ASC) VISIBLE,
  CONSTRAINT `FK_Deduccion_DNFija`
    FOREIGN KEY (`idDeduccion`)
    REFERENCES `SISTEMA_NOMINA`.`Deduccion` (`idDeduccion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Empresa` (
  `ruc` VARCHAR(50) NOT NULL,
  `nombreEmpresa` VARCHAR(50) NOT NULL,
  `direccionEmpresa` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(14) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Horario` (
  `idHorario` INT(11) NOT NULL AUTO_INCREMENT,
  `horaEntrada` TIME NOT NULL,
  `horaSalida` TIME NOT NULL,
  PRIMARY KEY (`idHorario`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Horas_Trabajador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Horas_Trabajador` (
  `idHoraTrabajador` INT(11) NOT NULL AUTO_INCREMENT,
  `idTrabajador` INT(11) NOT NULL,
  `mes` INT(11) NOT NULL,
  `horasTrabajadas` DECIMAL(4,1) NOT NULL,
  `horasExtras` DECIMAL(4,1) NOT NULL,
  PRIMARY KEY (`idHoraTrabajador`),
  INDEX `FK_HT_Trabajadro` (`idTrabajador` ASC) VISIBLE,
  CONSTRAINT `FK_HT_Trabajadro`
    FOREIGN KEY (`idTrabajador`)
    REFERENCES `SISTEMA_NOMINA`.`Trabajador` (`idTrabajador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`IngresoNoFijoVendedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`IngresoNoFijoVendedor` (
  `idIngresoNoFijoVendedor` INT(11) NOT NULL,
  `idIngresoNoFijo` INT(11) NOT NULL,
  `pagaDeComision` DECIMAL(7,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idIngresoNoFijoVendedor`),
  INDEX `FK_INF_Vendedor` (`idIngresoNoFijo` ASC) VISIBLE,
  CONSTRAINT `FK_INF_Vendedor`
    FOREIGN KEY (`idIngresoNoFijo`)
    REFERENCES `SISTEMA_NOMINA`.`IngresoNoFijo` (`idIngresoNoFijo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`MarcadoHorario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`MarcadoHorario` (
  `idControlTrabajador_Horario` INT(11) NOT NULL AUTO_INCREMENT,
  `idTrabajador` INT(11) NOT NULL,
  `horaEntrada` TIME NOT NULL,
  `horaSalida` TIME NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`idControlTrabajador_Horario`),
  INDEX `FK_Trabajador_MarcadoHorario` (`idTrabajador` ASC) VISIBLE,
  CONSTRAINT `FK_Trabajador_MarcadoHorario`
    FOREIGN KEY (`idTrabajador`)
    REFERENCES `SISTEMA_NOMINA`.`Trabajador` (`idTrabajador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`SalarioAcumulado_IR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`SalarioAcumulado_IR` (
  `idSalarioAcumulado` INT(11) NOT NULL AUTO_INCREMENT,
  `idTrabajador` INT(11) NOT NULL,
  `salarioAcumulado` DECIMAL(16,2) NULL DEFAULT NULL,
  `meses` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idSalarioAcumulado`),
  INDEX `FK_SalarioAcumulador_Trabajador` (`idTrabajador` ASC) VISIBLE,
  CONSTRAINT `FK_SalarioAcumulador_Trabajador`
    FOREIGN KEY (`idTrabajador`)
    REFERENCES `SISTEMA_NOMINA`.`Trabajador` (`idTrabajador`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Trabajador_Horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Trabajador_Horario` (
  `idT_H` INT(11) NOT NULL AUTO_INCREMENT,
  `idTrabajador` INT(11) NOT NULL,
  `idHorario` INT(11) NOT NULL,
  PRIMARY KEY (`idT_H`),
  INDEX `FK_TH_Trabajador` (`idTrabajador` ASC) VISIBLE,
  INDEX `FK_TH_Horario` (`idHorario` ASC) VISIBLE,
  CONSTRAINT `FK_TH_Horario`
    FOREIGN KEY (`idHorario`)
    REFERENCES `SISTEMA_NOMINA`.`Horario` (`idHorario`),
  CONSTRAINT `FK_TH_Trabajador`
    FOREIGN KEY (`idTrabajador`)
    REFERENCES `SISTEMA_NOMINA`.`Trabajador` (`idTrabajador`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`User` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `idRol` INT(11) NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `FK_User_Rol` (`idRol` ASC) VISIBLE,
  CONSTRAINT `FK_User_Rol`
    FOREIGN KEY (`idRol`)
    REFERENCES `SISTEMA_NOMINA`.`Rol` (`idRol`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`Vendedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`Vendedor` (
  `idVendedor` INT(11) NOT NULL AUTO_INCREMENT,
  `idTrabajador` INT(11) NOT NULL,
  `porcentajeComision` INT(11) NOT NULL,
  PRIMARY KEY (`idVendedor`),
  INDEX `FK_Vendedor_Trabajador` (`idTrabajador` ASC) VISIBLE,
  CONSTRAINT `FK_Vendedor_Trabajador`
    FOREIGN KEY (`idTrabajador`)
    REFERENCES `SISTEMA_NOMINA`.`Trabajador` (`idTrabajador`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `SISTEMA_NOMINA`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SISTEMA_NOMINA`.`sessions` (
  `session_id` VARCHAR(128) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `expires` INT(11) UNSIGNED NOT NULL,
  `data` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
USE `SISTEMA_NOMINA`;

DELIMITER $$
USE `SISTEMA_NOMINA`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `SISTEMA_NOMINA`.`salarioAcumulado`
AFTER INSERT ON `SISTEMA_NOMINA`.`Trabajador`
FOR EACH ROW
BEGIN 
	INSERT INTO SalarioAcumulado_IR(idTrabajador , salarioAcumulado) values(new.idTrabajador , 0);
END$$

USE `SISTEMA_NOMINA`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `SISTEMA_NOMINA`.`sumarSalarioAcumulado`
BEFORE UPDATE ON `SISTEMA_NOMINA`.`SalarioAcumulado_IR`
FOR EACH ROW
BEGIN 
IF new.salarioAcumulado > 0 THEN SET new.salarioAcumulado = old.salarioAcumulado + new.salarioAcumulado;
    SET new.meses = old.meses + 1 ;
    END IF;
END$$


DELIMITER ;


Insert into FrecuenciaDePago(nombre) values ("Mensual") , ("Quincenal");

Insert into Cargo(nombre) values ("Ingeniero"), ("Administrador");

Insert into DiaDePago(diaPago) values(15), (30) ;

Insert into Horario(horaEntrada, horaSalida) values('7:00','12:00'), ('1:00','5:00');

Insert into Trabajador(nombre, apellido, idCargo, cedula, salario, salarioPorHora, fechaDeContratacion, idDiaPago, idFrecuenciaDePago) values("Rodney","Sanchez",1,"35987lmao",2500.25,FALSE,"2019-05-02",1,1);

insert into Trabajador_Horario(idTrabajador, idHorario) values (1,2);