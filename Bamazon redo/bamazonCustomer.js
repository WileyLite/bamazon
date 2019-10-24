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
  connection.end();
});
function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Welcome to Bamazon!");
    if (err) throw err;
    console.log(res);
    buyProducts();
  });
}
function buyProducts() {
  inquirer.prompt({
    name: "productsToBuy",
    type: "input",
    message: "What would you like?"
  }),
  //here I thought the code would prompt a second response of the quantity requested,
    then({
      name: "quantity",
      type: "input",
      message: "Aaaaaaand how many?"
    }),
    function (err, res) {
        if (err) throw err;
        connection.query("SELECT * FROM price")
    }
};
//i'll have to make another variable for whne the user wants to buy something that isn't an item and one where if the item is there and the quantity isn't to log a response of whichever problem is occuring
//then prompt a response giving the user choice to shop for more items or be done with transaction
//I'll need to show the stock of the item when the transaction is complete updating our table stock col


//     then(answers => {});
//   "SELECT * FROM products",
//     function(err, res) {
//       if (err) throw err;
//       console.log(res);
//     };

