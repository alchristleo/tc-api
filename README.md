This is the server side/back-end code of Tokocrypto created using nodejs with Express framework, MongoDB for database. For the client side/front-end code you can find it [here](https://github.com/alchristleo/tokocrypto)

## How to run
1. You need to download & install first [MongoDB](https://www.mongodb.com/). Then you need to run mongodb! (Run mongod & mongo)
2. Create new .env file for mailer setup, I'm using [Mailtrap](https://mailtrap.io/). Also dont forget to configure your mailer setup
```
git clone https://github.com/alchristleo/tc-api.git
cd tc-api
yarn install
yarn start
In browser, open http://localhost:6969
```
If error occured (url malformed), try to change your .env MONGODB_URl with 127.0.0.1 instead of localhost

## Eslint setup
eslint
eslint-config-airbnb
eslint-config-prettier
eslint-plugin-import
eslint-plugin-jsx-a11y
eslint-plugin-prettier
eslint-plugin-react
prettier

