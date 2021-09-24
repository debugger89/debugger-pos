CREATE DATABASE  IF NOT EXISTS `debuggerpos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `debuggerpos`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: debuggerpos
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prodid` int NOT NULL AUTO_INCREMENT,
  `prodname` varchar(500) NOT NULL,
  `prodbarcode` varchar(200) DEFAULT NULL,
  `purchasecost` float DEFAULT NULL,
  `sellprice` float DEFAULT NULL,
  PRIMARY KEY (`prodid`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (-1,'Custom','-1',NULL,NULL),(350,'tttt','12335',NULL,66);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_items`
--

DROP TABLE IF EXISTS `sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_items` (
  `id_sale_items` int NOT NULL AUTO_INCREMENT,
  `saleid` int DEFAULT NULL,
  `productid` int DEFAULT NULL,
  `units` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `unitprice` float DEFAULT NULL,
  PRIMARY KEY (`id_sale_items`),
  KEY `fk_productid_idx` (`productid`),
  KEY `fk_saleid_idx` (`saleid`),
  CONSTRAINT `fk_productid` FOREIGN KEY (`productid`) REFERENCES `products` (`prodid`),
  CONSTRAINT `fk_saleid` FOREIGN KEY (`saleid`) REFERENCES `sales` (`saleid`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_items`
--

LOCK TABLES `sale_items` WRITE;
/*!40000 ALTER TABLE `sale_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `saleid` int NOT NULL AUTO_INCREMENT,
  `saledate` datetime DEFAULT NULL,
  `saletotal` float DEFAULT NULL,
  PRIMARY KEY (`saleid`)
) ENGINE=InnoDB AUTO_INCREMENT=10053 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `stockid` int NOT NULL AUTO_INCREMENT,
  `productid` int DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `purchasedate` datetime DEFAULT NULL,
  PRIMARY KEY (`stockid`),
  UNIQUE KEY `productid_UNIQUE` (`productid`),
  KEY `fk_productif_idx` (`productid`),
  CONSTRAINT `fk_productif` FOREIGN KEY (`productid`) REFERENCES `products` (`prodid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (36,350,NULL,NULL);
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_productstocks`
--

DROP TABLE IF EXISTS `view_productstocks`;
/*!50001 DROP VIEW IF EXISTS `view_productstocks`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_productstocks` AS SELECT 
 1 AS `stockid`,
 1 AS `quantity`,
 1 AS `purchasedate`,
 1 AS `productid`,
 1 AS `prodname`,
 1 AS `prodbarcode`,
 1 AS `purchasecost`,
 1 AS `sellprice`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_saleitems`
--

DROP TABLE IF EXISTS `view_saleitems`;
/*!50001 DROP VIEW IF EXISTS `view_saleitems`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_saleitems` AS SELECT 
 1 AS `prodname`,
 1 AS `prodid`,
 1 AS `purchasecost`,
 1 AS `units`,
 1 AS `id_sale_items`,
 1 AS `unitprice`,
 1 AS `price`,
 1 AS `saleid`,
 1 AS `saledate`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'debuggerpos'
--

--
-- Dumping routines for database 'debuggerpos'
--

--
-- Final view structure for view `view_productstocks`
--

/*!50001 DROP VIEW IF EXISTS `view_productstocks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_productstocks` AS select `stocks`.`stockid` AS `stockid`,`stocks`.`quantity` AS `quantity`,`stocks`.`purchasedate` AS `purchasedate`,`products`.`prodid` AS `productid`,`products`.`prodname` AS `prodname`,`products`.`prodbarcode` AS `prodbarcode`,`products`.`purchasecost` AS `purchasecost`,`products`.`sellprice` AS `sellprice` from (`products` left join `stocks` on((`stocks`.`productid` = `products`.`prodid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_saleitems`
--

/*!50001 DROP VIEW IF EXISTS `view_saleitems`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_saleitems` AS select `products`.`prodname` AS `prodname`,`products`.`prodid` AS `prodid`,`products`.`purchasecost` AS `purchasecost`,`sale_items`.`units` AS `units`,`sale_items`.`id_sale_items` AS `id_sale_items`,`sale_items`.`unitprice` AS `unitprice`,`sale_items`.`price` AS `price`,`sales`.`saleid` AS `saleid`,`sales`.`saledate` AS `saledate` from ((`sales` left join `sale_items` on((`sales`.`saleid` = `sale_items`.`saleid`))) left join `products` on((`products`.`prodid` = `sale_items`.`productid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-24 21:19:04
