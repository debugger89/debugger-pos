CREATE DATABASE  IF NOT EXISTS `debuggerpos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `debuggerpos`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
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
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (-1,'Custom','-1',NULL,NULL),(112,'maliban gold marie 75g','4791034027410',NULL,45),(113,'maliban real chocolat 100g','4791034005111',NULL,70),(114,'maliban lmemon puff 400g','4791034070447',NULL,250),(115,'maliban cheesebits 170g','4791034003414',NULL,200),(116,'maliban wafers vanilla cream 90g','4791034071666',NULL,75),(117,'maliban wafers chocolate cream 90g','4791034071642',NULL,75),(118,'maliban cheese buttons 215g','8888101611804',NULL,350),(119,'munchee chocolate cream biscuits 100g ','8888101270018',NULL,70),(120,'ritsbwry chunky choc 120g','4792192601221',NULL,130),(121,'ritsbery chunky choc 60g','4792192602204',NULL,70),(122,'sachie ginger finger biscuit 120g','4796004350109',NULL,70),(123,'sachie sawbara 100g','4796004350529',NULL,60),(124,'munchee tikiri marie 80g','8888101280208',NULL,45),(125,'munchee chocolate marie 90g','8888101281205',NULL,55),(126,'munchee milk short cake biscuits 85g','8888101030278',NULL,60),(127,'munchee milk short cake biscuits 200g','8888101030407',NULL,120),(128,'maliban nice biscuits 100g','4791034020114',NULL,65),(129,'munchee nice biscuits 100g','8888101020200',NULL,65),(130,'munchee chocolate puff 100g','8888101271206',NULL,75),(131,'maliban milk short cake biscuits 85g','4791034039215',NULL,60),(132,'munchee crunchee carols 100g','8888101276201',NULL,65),(133,'munchee crunchee carols 300g',NULL,NULL,150),(134,'maggi coconut milk power 300g','4792024008723',NULL,495),(135,'maggi coconut milk power 125g','4792024011372',NULL,210),(136,'maggi coconut milk power 25g','4792024005814',NULL,40),(137,'bic easy2','3086127501122',NULL,65),(138,'siddhalepa 10g','4792172000037',NULL,105),(139,'siddhalepa 2.5g','4792172000013',NULL,35),(140,'cherish gift assortment 400g',NULL,NULL,340),(141,'cherish wafers chocolate cream 375g','4792102000021',NULL,240),(142,'cherish wafers choco cream 225g','4792102006023',NULL,140),(143,'cherish wafers vanilla cream 375g','4792102006009',NULL,230),(144,'prima instant noodles 345g','4792018233513',NULL,165),(145,'prima broad instant noodles 80g','4792018233148',NULL,62),(146,' prima chiken instant noodles 74g','4792018234312',NULL,60),(147,'cherish custard cream biscuits 240g','4792102007297',NULL,120),(148,'cherish milk shorties  biscuits 450g',NULL,NULL,160),(149,'cherish orange cream biscuits 330g','4790014650044',NULL,165),(150,'cherish duplex cream biscuits 400g','4792102007372',NULL,230),(151,'cherish chocolate cream biscuits 400g','4790014650013',NULL,240),(152,'cherish chocolate cream biscuits 200g','4792102007624',NULL,120),(153,'cherish milk shorties  biscuits 280g',NULL,NULL,110),(154,'cherish wafers milk cream 375g','4790014650211',NULL,240),(155,'cherish nice biscuits 500g','4792102003008',NULL,230),(156,'cherish lemon cream biscuits 330g','4790014650037',NULL,180),(157,'cherish vanilla peeps biscuits 240g',NULL,NULL,110),(158,'cherish choco peeps biscuits 240g','4792102007266',NULL,110),(159,'munchee tifin onion 125g','8888101931193',NULL,100),(160,'cherish milk marie biscuits 80g','4792102007150',NULL,40),(161,'cherish vanilla peeps biscuits 50g','4790014650259',NULL,25),(162,'cherish choco peeps biscuits 50g',NULL,NULL,25),(163,'ritsbwry chocolate fingers 45g','4792192526210',NULL,50),(164,'happy cow cheese 120g','9066085415284',NULL,384),(165,'marmite 55g','4792081007400',NULL,195),(166,'munchee super cream cracker 230g','8888101430399',NULL,120),(167,'munchee super cream cracker 125g','8888101430153',NULL,75),(168,'maliban smart cream craker 190g','4791034042116',NULL,100),(169,'maliban smart cream craker 125g','4791034042611',NULL,75),(170,'maliban chocolate puff biscuit 200g','4791034070287',NULL,130),(171,'munchee chocolate puff biscuits 200g','8888101271404',NULL,130),(172,'maliban lemon puff biscuits 200g','4791034017015',NULL,130),(173,'maliban lemon puff biscuits 100g','4791034017114',NULL,75),(174,'munchee lemon puff biscuits 200g','8888101090401',NULL,130),(175,'munchee lemon puff biscuits 100g','8888101090203',NULL,75),(176,'munchee savoury nuts 170g','8888101612702',NULL,180),(177,'munchee cheese buttons 170g','8888101611705',NULL,200),(178,'munchee bran cracker 240g','8888101132385',NULL,150),(179,'maliban spicy crackers 170g','4791034060110',NULL,130),(180,'maliban real bran cracker 210g','4791034001519',NULL,150),(181,'maliban smart cream cracker 230g','4791034071604',NULL,120),(182,'maliban smart cream cracker 500g','4791034042215',NULL,240),(183,'munchee super cream cracker 490g','8888101430115',NULL,240),(184,'maliban real chocolat biscuit 400g','4791034070546',NULL,250),(185,'munchee shortties biscuits 325g','8888101311070',NULL,150),(186,'maliban ginger biscuit 370g','4791034070218',NULL,220),(187,'maliban nice biscuits 435g','4791034070249',NULL,230),(188,'munchee nice biscuits 400g','8888101020101',NULL,230),(189,'munchee chocolate cream biscuits 400g','8888101270117',NULL,250),(190,'maliban chick bits 30g','4791034004213',NULL,30),(191,'munchee savoury nuts 30g','8888101612269',NULL,30),(192,'munchee chocolate cream wafers 400g','4792192509619',NULL,260),(193,'munchee tikiri marie 360g','8888101280109',NULL,180),(194,'munchee wafers vanilla cream 400g',NULL,NULL,260),(195,'munchee hawaian cookies 200g','8888101080402',NULL,130),(196,'nestle nestomalt 400g','4792024016230',NULL,350),(197,'anchor 400g','4791085011079',NULL,380),(198,'nestle nestomalt 175g','4792024016216',NULL,165),(199,'maliban milk powder 1kg','4792029100033',NULL,945),(200,'maliban milk powder 400g','4790015950624',NULL,380),(201,'maliban milk powder 150g','4792029000128',NULL,140),(202,'maliban melko 400g','4792029000111',NULL,340),(203,'maliban milk powder 18g',NULL,NULL,20),(204,'maliban milk powder 60g',NULL,NULL,60),(205,'horlicks 400g','4796005666599',NULL,475),(206,'nestle milo 400g','4792024013215',NULL,400),(207,'nestle milo 200g','4792024013314',NULL,205),(208,'viva 400g','4796005666513',NULL,340),(209,'lipton ceylonta 200g','4796005650987',NULL,270),(210,'lipton ceylonta 100g','4796005650970',NULL,135),(211,'lipton ceylonta 50g','4796005650963',NULL,65),(212,'laojee 200g','4796005650208',NULL,230),(213,'laojee 100g','4796005650192',NULL,115),(214,'laojee 50g','4796005650185',NULL,52),(215,'laojee ginger 90g','4796005667305',NULL,150),(216,'watawala tea 100g','4791052500179',NULL,130),(217,'watawala tea 50g','4791052500162',NULL,60),(218,'maliban tea 50g','4796021060036',NULL,60),(219,'prima kottu mee 80g','4792018233131',NULL,35),(220,'prima broad instant noodles 80g','4792018233148',NULL,62),(221,'maggi chicken instant noodles 73g','4792024015646',NULL,65),(222,'prima instant noodles 345g','4792018233513',NULL,190),(223,'jack mackerel canned fish 155g','4797001021054',NULL,200),(224,'jack mackerel canned fish 285g','4796012040436',NULL,360),(225,'prima stella chiken instant noodles 74g','4792018234312',NULL,60),(226,'dil chilli powder 250g','4796000510019',NULL,240),(227,'dil chilli powder 100g','4796000510026',NULL,100),(228,'cbl samaposha 200g','4792109000024',NULL,90),(229,'dil chilli powder 50g','4796000510033',NULL,55),(230,' dil chilly pieces 250g','4796000510057',NULL,240),(231,'dil chilli pieces 100g',NULL,NULL,105),(232,'dil chilli pieces 50g',NULL,NULL,55),(233,'dil curry powder 50g(amu)','4796000511108',NULL,44),(234,'dil curry powder 100g (bedapu)','4796000510101',NULL,86),(235,'dil maldive fish chips 130','4796000510880',NULL,130),(236,'dil chicken curry powder 50g','4796000510309',NULL,65),(237,'kumuduni maldives fish 100g',NULL,NULL,220),(238,'maliban yahaposha 200g','4796021060012',NULL,90),(239,'samagi white rice 1kg','4796003810017',NULL,175),(240,'prima chakki atta flour 1kg','4796016600063',NULL,160),(241,'harischandra noodles 400g','4792083010316',NULL,140),(242,'samagi string hoppers flour 1 kg',NULL,NULL,175),(243,'lanka soy kiri malu  50g','4796002019008',NULL,65),(244,'raigam chinese soya dewel 90g','4792149011530',NULL,110),(245,'raigam soya themparaduwa 85g','4792149011912',NULL,100),(246,'raigam chicken soya devel 110g','4972149011727',NULL,110),(247,'raigam soya meat curry flavour 90g ',NULL,NULL,75),(248,'prima wheat  flour ','4796016600100',NULL,105),(249,'samaposha 200g','4792109000024',NULL,90),(250,'maliban yahaposha 200g','4796021060012',NULL,90),(251,'dil food roasted curry powder 100g ','4796000510132',NULL,100),(252,'dil food roasted curry powder 50g',NULL,NULL,50),(253,'dil food pepper powder 100g ','4796000510170',NULL,180),(254,'dil food pepper powder 50g ','4796000510187',NULL,90),(255,'dil food pepper powder 25g','4796000511115',NULL,45),(256,'dil food mustard seed 100g','4796000510569',NULL,60),(257,'dil food mustard seed  50g','4796000510576',NULL,30),(258,'dil food fenugreek 50g','4796000510590',NULL,30),(259,'dil food tumeric powder 25g ',NULL,NULL,165),(260,'freelan papadam 60g',NULL,NULL,85),(261,'hesara gamboge paste 100g',NULL,NULL,50),(262,'edinborough chinese chili paste 100g',NULL,NULL,175),(263,'dil food cummin seed 50g','4796000510491',NULL,55),(264,'dil food fennel seed 50g','4796000510644',NULL,45),(265,'dil food coriander 50g','4796000510200',NULL,35),(266,'dil food coriander 100g','4796000510477',NULL,55),(267,'dil food mustard powder 50g ','4796000510347',NULL,35),(268,'dil food tamarind 100g','4496000810699',NULL,95),(269,'dil food goraka 50g',NULL,NULL,40),(270,'dil food sago 100g','4796000510712',NULL,60),(271,'dil food barley 100g','4796000510736',NULL,60),(272,'raigam coconut vinegar 350ml','4792149050140',NULL,120),(273,'MD mango jam 300g ','4792098007073',NULL,230),(274,'nestle milkmaid 390g','4792024011792',NULL,275),(275,'MD strawberry flavoured melon jam 300g','4792098011070',NULL,230),(276,'MD woodapple jam 300g','4792098013074',NULL,230),(277,'fortune coconut oil 675ml','4790016590324',NULL,470),(278,'fortune coconut oil 350ml ','4790016590331',NULL,270),(279,'fortune coconut oil 200ml','4790016590157',NULL,160),(280,'prima vegetable oil 1000ml','4792018451139',NULL,880),(281,'prima vegetable oil 500ml','4792018451115',NULL,495),(282,'edinborough mayonnaise 200g ','4792212008245',NULL,375),(283,'edinborough  soya sauce 325ml ','4792212003165',NULL,155),(284,'MD tomato sauce 200g','4792098089031',NULL,160),(285,'MD tomato sauce 400G ','4792098089147',NULL,280),(286,'nestle mixed cereals and vegitables with milk','9556001227676',NULL,420),(287,'nestle cerelac with red rice and milk 250g','9556001227744',NULL,420),(288,'nestle  ceregrow wheat honey and dates 250g','9556001241863',NULL,470),(289,'nestle cerelac mixed fruits with milk 250g','9556001227720',NULL,420),(290,'motha strawberry flavoured jelly 100g','4792551000016',NULL,100),(291,'motha apple flavoured jelly 100g ','4792551000108',NULL,100),(292,'motha orange flavoured jelly 100g','4792551000313',NULL,100),(293,'prima stella jam strawberry 100g',NULL,NULL,45),(294,'prima stella jam mixed fruit 100g',NULL,NULL,40),(295,'MD divul kiri 500ml ','4792098433568',NULL,140),(296,'MD mango nectar 500ml','4792098434565',NULL,140),(297,'MD mixed fruit nectar 200ml ','4792098338382',NULL,60),(298,'MD  mango nectar 200 ml ',NULL,NULL,60),(299,'MD  divul kiri 200 ml ','4792098343386',NULL,60),(300,'sunquick mandarin 330ml','4792190120014',NULL,390),(301,'sanquick fruit cocktail 330ml','4792190120069',NULL,390),(302,'sanquick mango  330ml','4792190120373',NULL,390),(303,'MD instant orange drink mix 150g ','4792098318759',NULL,120),(304,'lakmuthu soya meat  35g ',NULL,NULL,30),(305,'lakmuthu soya meat  bugget pack 60g',NULL,NULL,60),(306,'motha gelatine 30g ','4792551032017',NULL,135),(307,'kandos coco powder 100g','4791025131119',NULL,220),(308,'motha cornflour 200g ','4792551031027',NULL,145),(309,'moths baking powder 50g ','4792551036022',NULL,85),(310,'gango orange flavoured 50g ','4792149010014',NULL,60),(311,'MD mango flavoured drink 150g ','4792098269754',NULL,125),(312,'nature\'s  secrets papaya facial wash 100ml ','4792054008489',NULL,330),(313,'nature\'s secrets lotus facial wash 100ml','4792054001060',NULL,330),(314,'nature\'s  secrets cucumber facial wash 100ml ','4792054000247',NULL,330),(315,' nature\'s  secrets kohomba-kaha facial wash 100ml','4792054001831',NULL,330),(316,'nature\'s secrets carrot facial wash 100ml ','4792054000315',NULL,330),(317,' nature\'s  secrets peppermint facial wash 100ml ','4792054001428',NULL,330),(318,' nature\'s  secrets perfume shampoo 100ml  ','4792054014503',NULL,210),(319,' nature\'s  secrets anti- dandruff shampoo 100ml ','4792054001138',NULL,250),(320,'baby cheramy baby cream 100ml','4791111100043',NULL,155),(321,'paris floral cologne spray 50ml ','4791111110202',NULL,310),(322,'goya captivating rose cologne spray 50ml ','4791111109107',NULL,480),(323,'baby cheramy baby cologne 100ml ','4791111141046',NULL,252),(324,'baby cheramy baby cologne 50ml ','4791111100104',NULL,148),(325,'denta adults toothbrush medium ','4791010002066',NULL,60),(326,'denta adults toothbrush soft ','4791010002257',NULL,60),(327,'signal tooth brush medium ','4796005650680',NULL,60),(328,'signal tooth brush deep clean medium ','4796005656323',NULL,73),(329,'signal triple clean soft ',NULL,NULL,55),(330,'signal triple clean medium ',NULL,NULL,55),(331,'sera noodles regular 400g','4792109000659',NULL,120),(332,'sera festive noodles 325g','4792109000666',NULL,130),(333,'baby cheramy cotton care baby diaperes 4','4791111141558',NULL,215),(334,'lanka soy textured soya protein ( defatted) 90g','4796002070153',NULL,70),(335,'sapthami incense sticks ','4796018000106',NULL,100),(336,'saman pichcha mal incense sticks',NULL,NULL,20),(337,'raveena incense sticks','4796000971162',NULL,50),(338,'dahamsa sugandi incense sticks',NULL,NULL,50),(339,'sapumal incense sticks','4796000970554',NULL,100),(340,'wandhana incense sticks ',NULL,NULL,20),(341,'nandana incense sticks ',NULL,NULL,20),(342,'maliban cheesebits 170g','4791034003414',NULL,200),(343,'maliban cheesebits 170g','4791034003414',NULL,200),(344,'maliban cheesebits 170g','4791034003414',NULL,200),(345,'maliban cheesebits 170g','4791034003414',NULL,200),(346,'maliban cheesebits 170g','4791034003414',NULL,200);
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
INSERT INTO `sale_items` VALUES (98,10050,115,1,200,200),(99,10050,117,1,75,75),(100,10050,120,1,130,130),(101,10051,127,1,120,120),(102,10051,150,1,230,230),(103,10052,112,1,45,45);
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
INSERT INTO `sales` VALUES (10050,'2021-09-12 22:26:09',405),(10051,'2021-09-12 22:27:55',350),(10052,'2021-09-12 22:41:01',45);
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
  KEY `fk_productif_idx` (`productid`),
  CONSTRAINT `fk_productif` FOREIGN KEY (`productid`) REFERENCES `products` (`prodid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
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

-- Dump completed on 2021-09-12 22:49:11
