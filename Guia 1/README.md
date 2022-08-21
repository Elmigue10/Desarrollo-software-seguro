REQUERIMIENTOS:

-Docker

-nodeJs

COMANDOS PARA MONTAR LA BASE DE DATOS MYSQL EN DOCKER:

docker pull mysql

docker run -d -p 3306:3306 --name mysql-db -e MYSQL_ROOT_PASSWORD=secret mysql --lower_case_table_names=1

docker exec -it mysql-db mysql -p

password: secret

CREACIÓN DE LA BASE DE DATOS CON LA TABLA USER:

create database dss;

use dss;

create table user(id int not null AUTO_INCREMENT PRIMARY KEY, document VARCHAR(32) NOT NULL, username VARCHAR(32) NOT NULL, email VARCHAR(32) NOT NULL, password VARCHAR(32) NOT NULL, level int NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE user ADD UNIQUE document(document);
ALTER TABLE user ADD UNIQUE username(username);

Ejecución Frontend:

npm install

ng serve -o