API Setup

Node v.10 or above
PostgreSQL 10.9

1. Create a database named 'mozilor'. (or create a fresh DB with any name and update the DB name in .env file)
2. Install sequalize cli globally by running 'npm install -g sequelize-cli'
3. Navigate to /mozilor-api directory through git bash or command prompt
4. Do a 'npm install'
5. Then run the following commands
	5.1  export DATABASE_URL="postgres://postgres:admin@127.0.0.1:5432/mozilor"
	5.2  sequelize db:migrate (if this gives any error try 'npx sequelize db:migrate')
6. Check the DB and confirm that the Tables are created and initial data are seeded to the table.
7. Run 'npm start'



Angular Setup
Version: 9.1
1. Navigate to /mozilor-web directory
2. Do a 'npm install'
3. Run the project using 'ng serve'