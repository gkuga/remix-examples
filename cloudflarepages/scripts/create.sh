#!/bin/sh

file=$1
db_name=cloudflarepages

if [ -z $file ]; then
	echo "$0 <migration-file-name>" 1>&2
	exit 1
fi

npx wrangler d1 migrations create $db_name $file
