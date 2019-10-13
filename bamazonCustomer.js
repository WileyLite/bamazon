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
          //   console.log("inquire success");
          //handles quant if we don't have enough
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many of these bad bois do you want?"
            })
            .then(function(answer2) {
              var quantity = answer2.quantity;
              if (quantity > res[0].stock_quantity) {
                console.log(
                  "My bad brosiv but we only got " +
                    res[0].stock_quantity +
                    " items of that boi"
                );
                shopping();
              } else {
                console.log("");
                console.log(res[0].products_name + " purchased");
                console.log(quantity + " qty @ $" + res[0].price);

                var newQuantity = res[0].stock_quantity - quantity;
                connection.query(
                  "UPDATE products SET stock_quantity = " +
                    newQuantity +
                    " WHERE id = " +
                    res[0].id,
                  function(err, resUpdate) {
                    if (err) throw err;
                    console.log("");
                    console.log("Your order about to go out real soon my guy");
                    console.log("Big bless for pulling through...!");
                    console.log("");
                    connection.end();
                  }
                );
              }
            });
        }
      });
    });
};

display();
