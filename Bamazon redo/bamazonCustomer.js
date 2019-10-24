var mysql = require("mysql");
var inquirer = require("inquirer"); //npm package that lets you use user friendly prompts

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bamazon_db",
    port: 3306
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
    connection.end()
  });
  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      buyProducts();
  })};
  function buyProducts() {
      console.log("Welcome to Bamazon! What would you like?");
          "SELECT * FROM products", function(err, res) {
              if (err) throw err;
              console.log(res);
          }
      
  };