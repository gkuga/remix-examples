#!/bin/sh

file=$1

if [ -z $file ]; then
	echo "$0 <migration-file-name>" 1>&2
	exit 1
fi

# Init command
# npx prisma migrate diff \
#   --from-empty \
#   --to-schema-datamodel ./prisma/schema.prisma \
#   --script \
#   --output migrations/0001_init.sql

npx prisma migrate diff \
  --from-local-d1 \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output migrations/$1
