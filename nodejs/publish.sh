export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm use v18.10.0
cd bempaggo-kit
npm i
npm ci
npm run build
./publish-web.sh
cd ..
cd bempaggo-kit-express
npm i
npm ci
npm run build
./publish-web.sh
cd ..
cd bempaggo-kit-layers
npm i
npm ci
npm run build
./publish-web.sh
cd ..
