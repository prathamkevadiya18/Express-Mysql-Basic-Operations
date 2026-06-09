# express-mysql-basic-operations

This repository demonstrates Node.js, Express.js, and MySQL integration using MVC architecture. The expresswithsql project includes routing, controllers, database configurations, and basic operations like table creation, CRUD, and SQL JOINs. It serves as a perfect starter kit for beginners to learn database management and build scalable APIs.

---

## Prerequisites

Before running any of the applications in this repository, ensure you have the following installed:

1. **Node.js** (v12 or higher recommended)
2. **MySQL Server** (e.g., via XAMPP, WAMP, Docker, or local installation)

---

## Part 1: Standalone Database Script (`index.js`)

This is a single-file script demonstrating basic SQL operations in sequential order.

### Setup & Run
1. Make sure your local MySQL server is running.
2. The script connects using default credentials:
   - **Host:** `localhost`
   - **User:** `root`
   - **Password:** *(empty)*
   - **Database:** `data` (The script automatically attempts to create and use a database named `DATA`).
3. Install dependencies in the root directory:
   ```bash
   npm install
   ```
4. Run the standalone script:
   ```bash
   node index.js
   ```

### Demonstrated Features
* **Database & Table Creation:** Automatically creates database `DATA` and tables `customers`, `user`, and `pro` if they do not exist.
* **CRUD Operations:** Performs sample record insertion, selection, and update on the `customers` table.
* **Table JOIN:** Links the `user` and `pro` tables using an `INNER JOIN` on favorite product IDs to demonstrate relational queries.

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
