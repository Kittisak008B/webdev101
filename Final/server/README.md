```rust
node --version

//initialize a new nodejs project by creating a package.json file
npm init  

//create the index.js file

//install the express framework
npm install express

//install body-parser Middleware to parse incoming request bodies (e.g., JSON) and make it accessible through req.body
npm install body-parser

//installs nodemon as a dev dependency
npm install nodemon  --save-dev

//installs mysql2 package to connect with a MySQL database
npm install mysql2

//The cors package in Node.js enables Cross-Origin Resource Sharing (CORS), allowing your server to accept requests from different origins.
//This is essential when your frontend (React, Angular, etc.) and backend (Express.js) are on different domains
npm install cors

//runs index.js with auto-restart on file changes
npx nodemon index.js 

//use Postman to test the API
```

```rust
//MySQL in Docker
docker pull mysql
docker images
docker run --name test_container -p 3307:3306 -e MYSQL_ROOT_PASSWORD=12345 -d mysql
docker ps -a
docker exec -it test_container bash
mysql -u root -p
show databases;
create database test_database;
//First, use MySQL Workbench to connect to MySQL in Docker, then switch to DBeaver.
```

```sql
-- DBeaver script
show databases;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT UNSIGNED,  -- age is non-negative
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    interest TEXT,
    description TEXT
);

INSERT INTO users (firstname, lastname, age, gender, interest, description) 
VALUES ('Sam', 'Bank', 30, 'Male', 'Video Games, Books, Investing', 'hihihihihi');

DELETE FROM users WHERE id = 1;

SELECT * FROM users;

```