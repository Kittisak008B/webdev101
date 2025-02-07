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
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT NOW()
);

SET time_zone = '+07:00';  -- this applies only to the current session. It does not affect other users or connections.
SELECT NOW(), UTC_TIMESTAMP();

INSERT INTO users (id, name, email, age) 
VALUES 
(1, 'Sam Bankman', 'sam@example.com', 25),
(2, 'Nancy Pelosi', 'nancy@example.com', 30),
(3, 'Jim cramer', 'jim@example.com', 28);

DELETE FROM users WHERE id = 3;

SELECT * FROM users;

```