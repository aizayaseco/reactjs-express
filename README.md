# reactjs-express
This app will run locally using ports:
localhost:3000 and localhost:8000

NPM version (8.5.5)
Node version (16.5.0)

First Things first

create .env file and put 
AUTH_ID_PEXEL=<value>

run npm install && npm run install-client && npm run dev

To access the page locally, go to browser
localhost:3000

Deployed:
https://tz-pexel.onrender.com

For API connections:
https://tz-pexel.onrender.com/api

Post data must be x-www-form-urlencoded

Products Endpoints:
GET https://tz-pexel.onrender.com/api/v1/products
GET https://tz-pexel.onrender.com/api/v1/products/:id
POST https://tz-pexel.onrender.com/api/v1/products

required body params: name, stock, price 

PUT https://tz-pexel.onrender.com/api/v1/products/:id

required body params: name, stock, price 

DELETE https://tz-pexel.onrender.com/api/v1/products/:id

to get token for products endpoint:
POST https://tz-pexel.onrender.com/api/v1/products/auth/token

required body params: email, password
copy token and add in headers Authorization 'Bearer AUTH_TOKEN' 