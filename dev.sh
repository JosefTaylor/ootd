#!/bin/bash
# shellcheck source=.env

set -o errexit

source .env

# check port 8000 and 8080; stop if already in use.

if lsof -i :8000 || lsof -i :8080; then
  echo "port already in use, giving up."

else

  npm run start:dev &
  NPM="$!"

  poetry run ./manage.py runserver &
  DJANGO="$!"

  trap "kill $NPM; kill $DJANGO" INT QUIT TERM EXIT

  wait

fi
