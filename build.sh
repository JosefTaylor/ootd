#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install

#install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

#Install Node and NPM
nvm install 19
nvm install-latest-npm

#install Node dependencies
npm install
npm run build

python manage.py collectstatic --no-input
python manage.py migrate