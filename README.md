# Friendly Goggles journal 👓

Friendly Goggles journal is a (obviously)journal application written in NodeJS.


To use it locally:

- Fork the repo
- Clone it locally
- `npm i`
- `npm run dev`
- Now open a browser and go to http://localhost:3000

Note that the above process only uses the development mode settings. To use the application in production mode:

- Start a postgres server and set the DATABASE_URL env variable to point to the postgres url.
- `npm i`
- `npm run build`
- `npm start`
- Done!
