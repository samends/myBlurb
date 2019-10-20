# Myblurbs Database Setup

The setup uses typeorm, for more information about typeorm go to https://github.com/typeorm/typeorm

- Install your database software of choice, the original project uses `postgres` and create a database and a user that has access.

- Add a `ormconfig.json` file and copy the contents on ormconfig-example.json into it. Next add your database configuration information. If you are using `postgres` the only thing that will need to be updated is the database username, password, and database name for both the seed and migration configurations. If you are using another database update the type and port as well.

- Install dependencies with `npm install`

- Run both migrations and seeders with:

`npm run setup`


# Additional Commands

### To create a new migration run this command with the desired name

`typeorm migration:create -n desiredName -c migration`

### To create a new seeder run this command with the desired name

`typeorm migration:create -n desiredName -c seeds`

### To run migrations or seeders individually run the following respectively:

`npm run migrations`

`npm run seeder`

### To revert database migrations and seeders run:

`npm run migration:revert`

You can also revert migrations and seeders individually with `npm run migrations:revert` and `npm run seeder:revert`
