var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("connected as id " + connection.threadId + "\n");
        loadProducts();
    }
});

//function to load the products table from the database. Print results to the console.

function loadProducts(){
  connection.query("SELECT * FROM products", function (error, response){
    if (err) throw (err);
    console.table(response);
    promptCustomerForItem(response);
  });
}

//prompt the customer for product ID

function promptCustomerForItem (inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "what is the I.D. of the item you would like to purchase?[quit with q]",
        validate: function(val){
          return ! isNaN || val.toLowerCase() === "q";
        }
      }
    ]) .then(function (val){
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);


      if (product) {
        promptCustomerForQuantity();
      }else {
        console.log("That item doesn't exist");
        loadProducts();
      }
    });
}

function promptCustomerForQuantity(product){
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would your like?[quit with q]",
        validate: function(val){
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ]) .then(function (val){
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);



      if (quantity > product.stock_quantity) {
        console.log("insufficient quantities");
      }else {
        makePurchase(product, quantity);
      }
    });
}

function makePurchase(product, quantity){
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function (error, response){
      console.log("successfully purchased" + quantity + " " + product.product_name);
      loadProducts();
    }
  );
}


function checkInventory(choiceId, inventory){
  for (var i =0; i<inventory.length; i++){
    if (inventory[i].item_id === choiceId){
      return inventory[i];
    }
  }
  return null;
}

function checkIfShouldExit(choice){
  if (choice.toLowerCase() === "q"){
    console.log("Goodbye");
    process.exit(0);
  }
}
