use Buenavid;

INSERT INTO categories (nombre) values ('Vino Blanco'),('Vino Tinto'),('Vino Rosado'),('Vino Espumantes');

INSERT INTO origins (region) values ('Mendoza'),('Salta'),('Neuquén'),('Gonzalez Catán');

INSERT INTO wineries (nombre) values ('Falasco'),('Luigi Bosca'),('Mendel'),('Bressia'),('Terrazas de los Andes'),('Pulenta Estate'),
('Lagarde'),('Familia Zuccardi');


INSERT INTO products (description,year,price,discount,recomended,image,winery_id,category_id,origin_id)
VALUES ('Chacabuco Sauvignon Blanc',2020,10000,0,false,'1669163181170-chacabuco-sauvignon-blanc.jpg',4,1,1),
('Luigi Bosca Chardonnay',2018,16000,20,true,'1669163415810-luigi-bosca-chardonnay-2019.jpeg',5,1,1),
('Lunta Torrontes',2019,14000,10,true,'1669163637649-lunta-torrontes-2019.png',6,1,1),
('Proyecto Hermanas Souvignon Blanc',2021,9000,15,true,'1669163718993-proyecto-hermanas-sauvignon-blanc-2021.jpeg',7,1,1),
('Santa Julia Chenin Dulce',2009,21000,0,true,'1669163790515-santa-julia-chenin-dulce.jpeg',1,1,1),
('Sylvestra Sauvignon Blanc',2020,15000,5,false,'1669163849535-sylvestra-sauvignon-blanc-2021.jpg',5,1,2),
('Zuccardi Q Chardonnay',2015,23000,0,false,'1669163923590-zuccardi-q-chardonnay-2019.jpg',6,1,1),
('Achaval Ferrer Malbec',2016,21000,10,true,'16706788905671669164156470-achaval-ferrer-malbec-2016.jpg',2,2,1),
('Altos del Plata Cabernet Sauvignon',2020,10000,10,false,'1669164248201-altos-del-plata-cabernet-sauvignon-2020.jpeg',1,2,3),
('Colonia Las Liebres Bonarda Orgánico',2019,8500,5,true,'1669164320993-colonia-las-liebres-bonarda-organico-2020.jpg',8,2,1),
('DV Catena Malbec',2020,10000,10,false,'1669164396098-dv-catena-malbec-2021.jpg',3,2,3),
('Fin del Mundo Pinot Noir',2018,14000,5,true,'1669164509544-fin-del-mundo-pinot-noir-2020.jpg',5,2,1),
('La Flor Malbec',2020,12000,10,true,'1669164555048-la-flor-malbce-2020.jpg',4,2,1),
('Lagarde Malbec',2014,31000,0,true,'1669164604903-lagarde-malbec-2014.jpeg',8,2,2),
('Pulenta Estate Gran Cabernet',2017,18000,10,false,'1669164663693-pulenta-estate-gran-cabernet-franc-2018.jpg',7,2,3),
('Tomero Cabernet Sauvignon',2021,16000,15,true,'1669164721579-tomero-cabernet-sauvignon-2021.jpg',4,2,1),
('Antonieta Rose Pinot Noir',2021,8600,10,false,'1669164794235-antonieta-rose-pinot-noir.jpeg',1,3,1),
('Chakana Nune Rose',2020,7500,0,true,'1669164861992-chakana-nuna-rose.jpeg',5,3,2),
('La Flor Rose',2019,7950,5,true,'1669164913148-la-flor-rose.png',6,3,1),
('Punto Final Rose Malbec Orgánico',2020,6700,10,false,'1669164970973-punto-final-rose-malbec.png',3,3,3),
('Quieto Rose Cabernet Franc',2021,6000,5,false,'1669165030774-quieto-rose-cabernet-franc-2021.png',5,3,1),
('Baron B Brut Nature',2020,8800,10,false,'1669165082644-baron-b-brut-nature.jpeg',5,4,3),
('Casa Boher Extra Brut Chardonnay Pinot',2021,7800,5,true,'1669165144416-casa-boher-extra-brut-chardonnay-pinot-noir.jpeg',2,4,4),
('Fin del Mundo Extra Brut Blanc de Noir',2020,8560,0,false,'1669165217002-fin-del-mundo-extra-brut-blanc-de-noir.jpg',1,4,2),
('Jasmine Monet Extra Brut Organic',2020,7690,5,true,'1669165287161-jasmine-monet-extra-brut.jpg',8,4,1);

INSERT INTO roles (nombre)VALUES('Cliente'),('Administrador');


INSERT INTO users(rol_id,first_name,last_name,cellphone,date,email,password)
VALUES(1,'Lautaro','Taurino','1159728790','1987-09-04','lt@gmail.com','$2a$10$BC1owBVAHUICGntX8ujclexioJsx8iCoiD6J0TxnFumtzQ3Y2p/S2'),
(1,'Alejandro Manuel','Torres','1153405380','1967-09-27','aleto67@gmail.com','$2a$10$23iTkJxy7cs6I/pzgyPYXevDaAcy1ejo207Q.79eJvsEQa8wK0ovq'),
(1,'Facundo','García','1133334444','2004-02-14','fg@gmail.com','$2a$10$BwxQe2XXc/yff9d3DT.23e6Ch4EjmkHk5MhSZGhbQADiQ.wtHOzpq'),
(1,'Santiago','Uriburu','1199887733','2002-01-29','su@gmail.com','$2a$10$L459ekc953EThmmHJLTMuuso201LmYv7jj5N9vmRsibsF1/y1GePC'),
(2,'NatiAdmin','Profe',NULL,NULL,'NatiAdmin@dh.com','$2a$10$U8Txb0cS3n0MGqCv7wZ9JO1QIRRnh1Be.m6aWOuVKdB0/EZ237qLK'),
(1,'NatiUser','Profe',NULL,NULL, 'NatiUser@dg.com','$2a$10$Jt4pfPX.CK77LtnC3dq.oe0M0Y9AkQ81RetB.vV7OpVw.O1OB735a'),
(2,'Bautista','Lentz',NULL, NULL, 'bl@gmail.com','$2a$10$IlDF21DhtAv1/yiRCqAtIuXJN9PZVs3NAVslQ56inR/3yM8xgq2gS');