# BikersBy Backend

## API Documentation

### Steps to work with backend and do frontend job:

1. If you want to use backend and work with the frontend. Download postgresSQL locally or use ElephantSQL.
2. Create the below tables sequentially regardless of your first choice.

```sql
CREATE TABLE district (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);
```

```sql
CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    address_line1 VARCHAR(50) NOT NULL,
    address_line2 VARCHAR(50),
    city VARCHAR(50) NOT NULL,
    district_id INTEGER NOT NULL,
    FOREIGN KEY (district_id) REFERENCES district (id)
);
```

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(50) NOT NULL,
    phone numeric,
    pwd_hash VARCHAR(150) NOT NULL,
    default_address INTEGER ,
    FOREIGN KEY (default_address) REFERENCES address (id)
);

```

3. Create `.env` file with following variables in `backend` directory.

```js
PORT =
LOCAL_POSTGRES_USER =
LOCAL_POSTGRES_USER_PASSWORD =
LOCAL_DB =

SECRET =
```

4.  Hola, now you can sign up and log in to get `JSON WEB TOKEN`.

        *******Keep Working********Will be back soon***
        By Sunil****Happy Tihar Hem Sir******
