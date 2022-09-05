REQUERIMIENTOS:

-Docker

COMANDOS PARA MONTAR LA BASE DE DATOS MYSQL EN DOCKER:

docker pull mysql

docker run -d -p 3306:3306 --name mysql-db -e MYSQL_ROOT_PASSWORD=secret mysql --lower_case_table_names=1

docker exec -it mysql-db mysql -p

password: secret

CREACIÓN DE LA BASE DE DATOS CON LA TABLA USER:

create database if not exists dss;

use dss;

create table if not exists user(
    user_id int not null AUTO_INCREMENT PRIMARY KEY, 
    document VARCHAR(32) NOT NULL, 
    username VARCHAR(32) NOT NULL, 
    email VARCHAR(32) NOT NULL, 
    password VARCHAR(32) NOT NULL, 
    accion varchar(20) default 'insertado',
    level int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

show tables;

describe user;

create table if not exists auditoria_users(
	id int not null auto_increment,
    document_anterior varchar(32),
    username_anterior varchar(32),
    email_anterior varchar(32),
    document_nuevo varchar(32),
    username_nuevo varchar(32),
    email_nuevo varchar(32),
    usuario varchar(40),
    modificado datetime,
    proceso varchar(10),
    user_id int(4),
    primary key(id)
) engine=InnoDB;

show tables;
describe auditoria_users;

create trigger if not exists inserta_auditoria_users after insert on user
for each row
insert into auditoria_users(document_nuevo, username_nuevo, email_nuevo, usuario, modificado, proceso, user_id) 
values (new.document, new.username, new.email, current_user(), now(), new.accion, new.user_id);

create trigger if not exists modifica_auditoria_user before update on user
for each row
insert into auditoria_users(document_anterior, username_anterior, email_anterior, document_nuevo, username_nuevo, email_nuevo, usuario,  modificado, proceso, user_id )
values (old.document, old.username, old.email, new.document, new.username, new.email, current_user(), now(), 'actulizado', new.user_id);

create trigger if not exists elimina_auditoria_users after delete on user
for each row
insert into auditoria_users(document_anterior, username_anterior, email_anterior, usuario, modificado, proceso, user_id)
values (old.document, old.username, old.email, current_user(), now(), 'eliminado', old.user_id);

insert into user(document, username, email, password, level) values 
("1000133451", "miguel1025", "miguel@email.com", "1234", 0),
("1070242094", "johan24", "johan@email.com", "1234", 1),
("2971932", "david25", "david@email.com", "1234", 1),
("1023948313", "dastisi2012", "dastisi@email.com", "1234", 1),
("2910342", "stiven09", "stiven@email.com", "1234", 1);

update user set username='miguel99' where document = '1000133451';

delete from user where document = '1023948313';

select * from auditoria_users;

Ejecución Frontend:

npm install

ng serve -o