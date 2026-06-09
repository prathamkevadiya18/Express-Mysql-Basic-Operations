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

function cdatabse() {
  const databse = "CREATE DATABASE IF NOT EXISTS DATA"
  con.query(databse, function (err) {
    if (err) throw err;
    console.log("databse created");
  })
}

function ctable() {
  const table = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(table, function (err) {
    if (err) throw err;
    console.log("Table created");
  });
}

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

function cinsert() {
  const insert = "INSERT INTO customers VALUES ('a', 'b'), ('c', 'd')";
  con.query(insert, function (err) {
    if (err) throw err;
    console.log("inserted");
  });

}

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

function cselect() {
  const select = " SELECT * FROM customers";
  con.query(select, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}
function cupdate() {
  let up = "UPDATE customers SET address = 'xyz' WHERE address = 'b'";
  con.query(up, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}

function cjoin() {
  let join = "SELECT user.name AS user, pro.name AS favorite FROM user JOIN pro ON user.favorite = pro.id";
  con.query(join, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}

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
