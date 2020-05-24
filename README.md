# Nodepop

## Api Ads buy and sell

### Install dependencies

    npm install

### Initialize the data base

    npm run install-db

## Start

### Aplication

    npm start

### Development

    npm run dev

## Api Reference

    https://localhost:3000/   (Readme)
    https://localhost:3000/api (Documentacion)
    https://localhost:3000/api/anuncios (Lista de anuncios json)
    https://localhost:3000/web (Demo de lista de anuncios)

## Authentication

    POST /api/anuncios/loginJWT
    {
      email: string,
      password: string
    }

    returns: { token: string }

### List of auncios

GET /api/anuncios
Header: Authorization: token

## List "Anuncios"

    GET: 
     return json with list for "Anuncios"./api/anuncios
     return json with list for "Anuncios".

### Filter

    GET filters:
      /api/anuncios?=name="name"?sale="true"?price="000"?tags="tags"?limit="10"?skip="1"

     . limit: number limited in list, pagination.
     . skip: skip in result
     . name: { type: String },
     . price: { type: Number },
     . sale: { type: Boolean },
     . tags: {type: [String]}

### GET ID

      /api/anuncios/id
      return "Anuncio" for ID.

### GET: /api/anuncios/tags

     Returns a list in tags json .

     {
         "tags": [
        "lifestyle",
         "work",
        "motor",
        "mobile"
    ]
     } 

## json Example

     [
     {
        "tags": [
                    "lifestyle",
                    "mobile",
                    "electronic"
     ],
        "_id": "5e9ad2cfc2011f86d0ac5cae",
        "name": "Macbook",
        "sale": true,
        "price": 8000,
        "__v": 0
     }
     ]
