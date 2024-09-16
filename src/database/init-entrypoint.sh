#!/bin/bash

echo "ANOTHER RUN" >> temp.txt
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/init.sql
