#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install

echo "help im trapped in a box"

python manage.py collectstatic --no-input
python manage.py migrate