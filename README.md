# express-mysql-basic-operations

This repository demonstrates Node.js, Express.js, and MySQL integration using MVC architecture. The expresswithsql project includes routing, controllers, database configurations, and basic operations like table creation, CRUD, and SQL JOINs. It serves as a perfect starter kit for beginners to learn database management and build scalable APIs.

---

## Prerequisites

Before running any of the applications in this repository, ensure you have the following installed:

1. **Node.js** (v12 or higher recommended)
2. **MySQL Server** (e.g., via XAMPP, WAMP, Docker, or local installation)

---

## Part 1: Standalone Database Script (`only-sql-with-nodejs/`)

This is a standalone single-file script demonstrating basic SQL operations in sequential order, placed within its own folder.

### Setup & Run
1. Make sure your local MySQL server is running.
2. The script connects using default credentials:
   - **Host:** `localhost`
   - **User:** `root`
   - **Password:** *(empty)*
   - **Database:** `data` (The script automatically attempts to create and use a database named `DATA`).
3. Change directory to the standalone project folder:
   ```bash
   cd only-sql-with-nodejs
   ```
4. Install dependencies inside this folder:
   ```bash
   npm install
   ```
5. Run the standalone script:
   ```bash
   npm start
   # or
   node index.js
   ```

### Code Breakdown & Function Explanations

Here is the step-by-step breakdown of the `index.js` file:

#### 1. Database Connection Configuration
```javascript
let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "data"
});

con.connect(function (err) {
  if (err) {
    console.error(" Error connecting:", err);
    return;
  }
  console.log(" database Connected ");
});
```
* **Description:** Imports the `mysql` library, sets up the connection credentials, and opens a connection to the local MySQL server.
* **Console Output Example:**
  ```text
  database Connected
  ```

#### 2. Database Creation (`cdatabse`)
```javascript
function cdatabse() {
  const databse = "CREATE DATABASE IF NOT EXISTS DATA"
  con.query(databse, function (err) {
    if (err) throw err;
    console.log("databse created");
  })
}
```
* **Description:** Runs a SQL query to create the database named `DATA` if it doesn't already exist.
* **Console Output Example:**
  ```text
  databse created
  ```

#### 3. Creating a Simple Table (`ctable`)
```javascript
function ctable() {
  const table = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(table, function (err) {
    if (err) throw err;
    console.log("Table created");
  });
}
```
* **Description:** Creates a table named `customers` with columns `name` and `address`.
* **Console Output Example:**
  ```text
  Table created
  ```

#### 4. Creating Relational Tables (`userprot`)
```javascript
function userprot() {
  const table = "CREATE TABLE user (id int, name VARCHAR(255), favorite VARCHAR(255))";
  con.query(table, function (err) {
    if (err) throw err;
    console.log("Table created");
  });
  const table2 = "CREATE TABLE pro (id int, name VARCHAR(255))";
  con.query(table2, function (err) {
    if (err) throw err;
    console.log("Table created");
  });
}
```
* **Description:** Creates the `user` table (holding user details and their favorite product ID) and the `pro` table (holding product details). These tables will be used to demonstrate SQL JOINs.
* **Console Output Example:**
  ```text
  Table created
  Table created
  ```

#### 5. Inserting Data into Customers (`cinsert`)
```javascript
function cinsert() {
  const insert = "INSERT INTO customers VALUES ('a', 'b'), ('c', 'd')";
  con.query(insert, function (err) {
    if (err) throw err;
    console.log("inserted");
  });
}
```
* **Description:** Inserts two initial rows into the `customers` table.
* **Console Output Example:**
  ```text
  inserted
  ```

#### 6. Inserting Relational Data (`upinsert`)
```javascript
function upinsert() {
  const insert1 = "INSERT INTO user  VALUES (1, 'John', 154), (2, 'Peter', 154), (3, 'Amy', 155), (4, 'Hannah', 155), (5, 'Michael', 155)";
  const insert2 = "INSERT INTO pro VALUES (154, 'Chocolate Heaven'), (155, 'Tasty Lemons'), (156, 'Vanilla Dreams')";
  con.query(insert1, function (err) {
    if (err) throw err;
    console.log("inserted1");
  });
  con.query(insert2, function (err) {
    if (err) throw err;
    console.log("inserted2");
  });
}
```
* **Description:** Inserts seed records into the `user` and `pro` tables. This populates them for the SQL JOIN demonstration.
* **Console Output Example:**
  ```text
  inserted1
  inserted2
  ```

#### 7. Selecting Records (`cselect`)
```javascript
function cselect() {
  const select = " SELECT * FROM customers";
  con.query(select, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}
```
* **Description:** Runs a `SELECT` query to retrieve and print all records from the `customers` table.
* **Console Output Example:**
  ```json
  [
    { "name": "a", "address": "b" },
    { "name": "c", "address": "d" }
  ]
  ```

#### 8. Updating Records (`cupdate`)
```javascript
function cupdate() {
  let up = "UPDATE customers SET address = 'xyz' WHERE address = 'b'";
  con.query(up, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}
```
* **Description:** Updates the address of any customer whose current address is `'b'` to `'xyz'`.
* **Console Output Example:**
  ```json
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 0)",
    "protocol41": true,
    "changedRows": 1
  }
  ```

#### 9. Relational JOIN Query (`cjoin`)
```javascript
function cjoin() {
  let join = "SELECT user.name AS user, pro.name AS favorite FROM user JOIN pro ON user.favorite = pro.id";
  con.query(join, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}
```
* **Description:** Combines rows from `user` and `pro` using an `INNER JOIN` where the user's `favorite` value matches a product `id`. It outputs user names along with their favorite products.
* **Console Output Example:**
  ```json
  [
    { "user": "John", "favorite": "Chocolate Heaven" },
    { "user": "Peter", "favorite": "Chocolate Heaven" },
    { "user": "Amy", "favorite": "Tasty Lemons" },
    { "user": "Hannah", "favorite": "Tasty Lemons" },
    { "user": "Michael", "favorite": "Tasty Lemons" }
  ]
  ```

#### 10. Execution Orchestrator (`display`)
```javascript
function display() {
   cdatabse();
   ctable();
   cinsert();
   cselect();
   cupdate();
   cselect();
   userprot();
   upinsert();
   cjoin();
}
display();
```
* **Description:** Executes all the individual database functions in sequence.

---

## Part 2: Express.js MVC API Server (`expresswithsql/`)

This is a web server application implementing the same database connection structure but organized professionally using the Model-View-Controller (MVC) architecture.

### Folder Structure
```text
expresswithsql/
├── config/
│   └── db.js            # Database connection configuration (MySQL setup)
├── controllers/
│   └── userController.js# Logic & query execution (Req & Res handler)
├── models/
│   └── userModel.js     # SQL query definitions
├── routes/
│   └── userRoutes.js    # Express routes/endpoints definitions
├── index.js             # Main server initialization entry point
└── package.json         # Sub-project dependencies configuration
```

### File Contents & Code Examples

#### `config/db.js`
```javascript
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "data"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database 'data' successfully!");
});

module.exports = db;
```

#### `models/userModel.js`
```javascript
const db = require('../config/db');

const User = {
  getAllUsers: (callback) => {
    const query = "SELECT * FROM user";
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },

  createUser: (userData, callback) => {
    const query = "INSERT INTO user (id, name, favorite) VALUES (?, ?, ?)";
    db.query(query, [userData.id, userData.name, userData.favorite], (err, results) => {
      callback(err, results);
    });
  }
};

module.exports = User;
```

#### `controllers/userController.js`
```javascript
const User = require('../models/userModel');

exports.getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
};

exports.addUser = (req, res) => {
  const { id, name, favorite } = req.body;
  if (!id || !name || !favorite) {
    return res.status(400).json({ error: "Please provide id, name, and favorite fields." });
  }

  User.createUser({ id, name, favorite }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create user" });
    }
    res.status(201).json({ message: "User created successfully", userId: id });
  });
};
```

#### `routes/userRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

module.exports = router;
```

#### `index.js`
```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Express + MySQL API server! Go to /api/users to fetch users.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
```

### Setup & Run
1. Change directory to the `expresswithsql` folder:
   ```bash
   cd expresswithsql
   ```
2. Install sub-project dependencies:
   ```bash
   npm install
   ```
3. Run the Express server:
   ```bash
   npm start
   ```
   *The server will start running on http://localhost:3000*

### API Endpoints
* **`GET /api/users`** - Fetches all users from the database.
* **`POST /api/users`** - Adds a new user to the database (requires JSON body containing `id`, `name`, and `favorite` product ID).
  * Example request body:
    ```json
    {
      "id": 6,
      "name": "David",
      "favorite": 156
    }
    ```
