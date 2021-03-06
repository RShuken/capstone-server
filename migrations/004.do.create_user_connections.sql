

--drop tables to make sure the tables will be clean
drop table if exists user_connections cascade;

--declare the ENUM values for profession
create type connection_rating as ENUM ('1', '2', '3', '4', '5');

--declare the ENUM values for matching status
create type match_status as ENUM ('pending', 'accepted', 'denied');


--create the project table that is the most independent table
create table user_connections (
    id integer primary key generated by default as identity,
    match_status match_status default 'pending',
    connection_message text
);
