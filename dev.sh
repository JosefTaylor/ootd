set -o errexit

source .env

npm run start:dev &

poetry run ./manage.py runserver