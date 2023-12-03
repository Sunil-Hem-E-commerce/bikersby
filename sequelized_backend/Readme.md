# Bikersby Backend

## Quick Start:

Create `.env` file and run the below `npm` script:

```
npm i
npm run migrate:local
npm run seed:local
npm run dev:local
```

NOTE: replace `local` with `remote` if you are using remote database.

## Get Started:

1. Install all required pacakgaes by using command: `npm i`
2. Create `.env` file:

   ```
       SERVER_PORT = ${port you want to run backend}
       DB_URL = ${Connection string from render if you to use remote database}

       DB_USERNAME = ${username of local database if you want to use local database}
       DB_PASSWORD =  ${password of local database if you want to use local database}
       DB_DEV_NAME =  ${database-name of local database if you want to use local database}
       DB_HOST = 127.0.0.1
       DB_PORT = 5432
       DB_SEQUELIZE_META = migrations

       SECRET = ${create any string to make it secret key for JWT}
   ```

3. Run the backend using npm script as required.

## NPM script and their operation:

| Script                                                | Operation                                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------------ |
| -> Local Database                                     |
| `npm run start:local`                                 | Start the project without nodemon, uses local database                   |
| `npm run dev:local`                                   | Start the project with nodemon, uses local database                      |
| `npm run migrate:local`                               | Create required tables in local database                                 |
| `npm run migrate-undo:local` `{migration-file-name}`  | Undo the migration in local database upto the given migration file name  |
| `npm run seed:local`                                  | Create the dummy data in local database                                  |
| `npm run seed-undo:local`                             | Undo the dummy data from local database                                  |
| -> Remote database                                    |
| `npm run start:remote`                                | Start the project without nodemon, uses remote database                  |
| `npm run dev:remote`                                  | Start the project with nodemon, uses remote database                     |
| `npm run migrate:remote`                              | Create required tables in remote database                                |
| `npm run migrate-undo:remote` `{migration-file-name}` | Undo the migration in remote database upto the given migration file name |
| `npm run seed:remote`                                 | Create the dummy data in remote database                                 |
| `npm run seed-undo:remote`                            | Undo the dummy data from remote database                                 |
