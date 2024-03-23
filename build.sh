#!/bin/bash
git submodule init
git submodule update
rm -rf ./dist
mkdir dist
rsync -av --progress ./ ./dist --exclude node_modules
rm -f ./dist/*.crx
rm -f ./dist/*.pem
rm -f ./dist.crx
rm -f ./dist.zip
rm -rf ./dist/.git
rm -f ./dist/*.sh
rm -f ./dist/dist.zip
rm -rf ./dist/dist
zip -r dist.zip dist
npx crx pack dist -o "$(pwd)/dist.crx"
stat dist.crx
echo "crx file ready at $(pwd)/dist.crx"