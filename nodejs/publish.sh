cd bempaggo-kit
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
