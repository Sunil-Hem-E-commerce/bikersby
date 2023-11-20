@echo off
REM This is comment on bat file.
@echo executing dev_insert_into_tables.sql file to create tables
PAUSE
psql -h localhost -U postgres -d bikers -f %cd%\dev_insert_into_tables.sql
@echo Data inserted!!
PAUSE
