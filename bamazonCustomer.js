var mysql = require("mysql");
var inquirer = require("inquirer"); //npm package that lets you use user friendly prompts
var Table = require("cli-table2"); // package helps create easy to use tables from npm packages site

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon_db",
  port: 3306
});
// connects customer js to my sql
connection.connect();

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("----------------------------");
    console.log("      Welcom to Bamazon     ");
    console.log("----------------------------");
    console.log("");
    console.log("Find Your Product Below");
    console.log("");

    var table = new Table({
      head: ["Product Id", "Product Description", "Cost"],
      colWidths: [12, 50, 8],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["aqua"],
        compact: true
      }
    });
    //loops through table
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].products_name, res[i].price]);
    }
    console.log(table.toString());
    console.log("");
    shopping();
  });
};
//use inq to ask cust for which product and how many to purchase

var shopping = function() {
  inquirer
    .prompt({
      name: "productToBuy",
      type: "input",
      message: "Enter the product Id of the item you want my guy.!"
    })
    .then(function(answer1) {
      var selection = answer1.productToBuy;
      // use connection.query to connect q to database
      connection.query("SELECT * FROM products WHERE Id=?", selection, function(
        err,
        res
      ) {
        //handles error if item selected doesn't exist
        if (err) throw err;
        if (res.length === 0) {
          console.log("My guy we don't sell that here, check the list");

          shopping();
        } else {
          console.log("all is ok");
        }
      });
    });
};

display();
