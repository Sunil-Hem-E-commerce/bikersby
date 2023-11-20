@echo off
REM This is comment on bat file.
@echo executing dev_create-table.sql file to create tables
PAUSE
psql -h localhost -U postgres -d bikers -f %cd%\dev_create-table.sql
@echo Tables created!!
PAUSE
