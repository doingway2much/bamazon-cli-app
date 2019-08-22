var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "@lmost12",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to localhost:3306 with id # " + connection.threadId + "\n");
    console.log("Welcome to Bamazon!!!!")
    managerPrompt();

});

function managerPrompt() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Mannager View:",
            choices: [ "View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product" ]
        },

    ]).then(function (answers) {
        var choice = answers.options;
        if(choice === "View Products for Sale") {
          managerPrompt();
          console.log("\n");
          showProducts();          
        }
        if (choice === "View Low Inventory") {
            console.log("VIEW LOW INVENTORY");
            managerPrompt();
            console.log("\n");
            lowInventory();
        }
        if (choice === "Add to Inventory") {
            console.log("ADD TO INVENTORY");         
            console.log("\n");
            updateQuantity();
            
        }
        if (choice === "Add New Product") {
            console.log("ADD NEW PRODUCT");
            addProduct();
    }
        
      
    })

};

var showProducts = function () {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var productTable = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
            head: ["ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [5, 30, 15, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            productTable.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(productTable.toString());
    });
}

var lowInventory = function () {
    var query = "Select * FROM products WHERE stock_quantity <5;";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var productTable = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
            head: ["ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [5, 30, 15, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            productTable.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(productTable.toString());
    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the name of the product you want to add to inventory:",
            filter: String
        },
        {
            name: "department",
            type: "input",
            message: "Please enter the name department name associated with this product:",
            filter: String
        },
        {
            name: "price",
            type: "input",
            message: "Please enter the price of the product:",
            filter: Number
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter the quantity of items you are adding to inventory:",
            filter: Number
        },

    ]).then(function (answers) {
        connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: answers.name,
              department_name: answers.department,
              price: answers.price,
              stock_quantity: answers.quantity
            },
            function(err) {
              if (err) throw err;
              console.log("Added new product to the database!!!!");
              managerPrompt();
            }
          );
        });
      }

      function updateQuantity() {
        inquirer.prompt([
            {
                name: "update",
                type: "input",
                message: "Please enter the id of the product you want to add to inventory:",
                filter: Number
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter the quantity of items you are adding to inventory:",
                filter: Number
            },
    
        ]).then(function (answers) {
            connection.query(
                'UPDATE products SET stock_quantity = stock_quantity + ' + answers.quantity + ' WHERE id =' + answers.update,
                function(err) {
                  if (err) throw err;
                  console.log("Added new product to the database!!!!");
                  managerPrompt();
                }
              );
            });
          }
    
  



// function addProduct(id, product, department, price, quantity) {
//     connection.query('SELECT * FROM products WHERE id =' + ID, function (err, response) {
//         if (err) { 
//             console.log(err) 
//         };
//         if (prodAmount <= response[0].stock_quantity) {
//             var cartPrice = response[0].price * prodAmount;
//             console.log("================================================================================================")
//             console.log("| Awsome looks like we have more than " + prodAmount + " in stock!!!!");
//             console.log("================================================================================================")
//             console.log("| Your total price for " + prodAmount + " " + response[0].product_name + "'s" + " is " + "$" + cartPrice + ".00" + " Thank you!");
//             console.log("================================================================================================")
//             connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + prodAmount + ' WHERE id =' + ID);
//         } else {
//             console.log("================================================================================================")

//             console.log("| Sorry looks like we are running low on " + response[0].product_name + "'s but we do have " + response[0].stock_quantity + " left!!!");
//             console.log("================================================================================================")
//         };
//         showProducts();
//     });
// };
