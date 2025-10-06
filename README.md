# URL-Shortening-Service

**The project assignment for roadmap.sh**

URL of the assignment in roadmap.sh:  
https://roadmap.sh/projects/url-shortening-service

This API creates and manages short URLs using a Postgres database (ORM:
[Drizzle](https://orm.drizzle.team/)).  
Each short URL consists of a short code and a key to authenticate the creator.  
Using the key, creators can edit or delete their short URLs and can also see
their stats.  
The API has rate limiting to prevent abuse.

Read the docs
[here](https://github.com/ilia-abbasi/URL-Shortening-Service/blob/main/misc/Documentation.md).

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ilia-abbasi/URL-Shortening-Service.git
   cd URL-Shortening-Service
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create the `.env` file inside the `/misc` directory and set the variables:

   ```env
   PORT=your_port
   DATABASE_URL=your_database_connection_string
   DATABASE_URL_TEST=your_test_database_connection_string
   ```

   You can ignore `DATABASE_URL_TEST` if you don't want to run tests.

4. Create the required tables in your database:

   ```sh
   npm run generate # Generate migration files
   npm run migrate
   ```

5. If you want to run tests too, create the required tables in your test
   database:

   ```sh
   npm run migrate:test
   ```

## Usage

1. Build the project:

   ```sh
   npm run build
   ```

2. Run the server with:

   ```sh
   npm run start
   ```

3. Send requests using [Postman](https://www.postman.com/). Testing short URLs
   is better done with a browser.

## Testing

Testing is done with [jest](https://jestjs.io/).

- Run all the tests with:

  ```sh
  npm run test
  ```

- Run unit tests with:

  ```sh
  npm run test:units
  ```

- Run e2e tests with:

  ```sh
  npm run test:e2e
  ```

## Dependencies

- dotenv
- drizzle-orm
- express
- express-rate-limit
- express-validator
- morgan
- pg

### Dev dependencies

- @types/dotenv
- @types/express
- @types/express-rate-limit
- @types/express-validator
- @types/jest
- @types/morgan
- @types/node
- @types/pg
- @types/supertest
- drizzle-kit
- jest
- nodemon
- supertest
- ts-jest
- tsx
- typescript

The source code is formatted with [Prettier](https://prettier.io/).

---

URL-Shortening-Service is licensed under the
[GPL-3.0 license](https://github.com/ilia-abbasi/URL-Shortening-Service/blob/main/LICENSE).
