

--drop tables to make sure the tables will be clean
drop table if exists user_profile cascade;

--declare the ENUM values for profession
create type profession as ENUM ('UI UX', 'Frontend Development','Backend Development', 'Fullstack Development');

--create the project table that is the most independent table
create table user_profile (
    id integer primary key generated by default as identity,
    profession profession not null,
    phone text,
    discord_id text,
    location text,
    job_title text,
    job_company text,
    job_description text
);
