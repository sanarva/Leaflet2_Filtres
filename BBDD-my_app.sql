CREATE TABLE `my_app`.`restaurants` (
  `id_restaurant` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `latitude` DECIMAL(8,6) NOT NULL,
  `longitude` DECIMAL(8,6) NOT NULL,
  `kind_food` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id_restaurant`));


insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Nineteen', 'Plaça de Catalunya, 19, 08002 Barcelona', 41.386227, 2.171018, 'Mediterránea' );
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Atenea', 'Carrer de Joan Güell, 207, 08028 Barcelona', 41.386360, 2.129410, 'Mediterránea' );
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Slow & Low', 'Carrer del Comte Borrell, 119, 08015 Barcelona',41.380509, 2.158314, 'Mediterránea' );
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Alo Beirut', 'Carrer Aribau, 90, 08036 Barcelona', 41.389736, 2.157741, 'Libanés,Árabe' );
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Volubilis', 'Carrer de Tamarit, 151, 08015 Barcelona', 41.378315, 2.160047, 'Libanés' );
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Tien-Tsing', 'Carrer de Floridablanca, 131, 08011 Barcelona', 41.381492, 2.162339, 'China' );
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Chinese Garden', 'Carrer Aragó, 287, 08009 Barcelona', 41.393843, 2.166573, 'China');
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('La Güerita Mexicana', 'Carrer de Manso, 53, 08015 Barcelona', 41.377696, 2.161766, 'Mediterránea,Mexicana');
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Govinda', 'Plaça de la Vila de Madrid, 4, 08002 Barcelona', 41.384194, 2.172533, 'Mediterránea,Vegetariana' );                
insert into my_app.restaurants (name, address, latitude, longitude, kind_food)
                value ('Teresa Carles', 'Carrer de Jovellanos, 2, 08001 Barcelona', 41.385144, 2.168027, 'Vegetariana' );
delete from my_app.restaurants where id_restaurant > 0; 
select * from my_app.restaurants;