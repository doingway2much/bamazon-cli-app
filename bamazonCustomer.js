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

});


var displayProducts = function () {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var productTable = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [5, 30, 15, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            productTable.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(productTable.toString());
        buyPrompt();
    });
}

function buyPrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please enter the ID of the product want to buy:",
            filter: Number
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            filter: Number
        },

    ]).then(function (answers) {
        var buyAmount = answers.quantity;
        var buyID = answers.ID;
        purchas(buyID, buyAmount);
    })

};

function purchas(ID, prodAmount) {
    connection.query('SELECT * FROM products WHERE id =' + ID, function (err, response) {
        if (err) { 
            console.log(err) 
        };
        if (prodAmount <= response[0].stock_quantity) {
            var cartPrice = response[0].price * prodAmount;
            console.log("================================================================================================")
            console.log("| Awsome looks like we have more than " + prodAmount + " in stock!!!!");
            console.log("================================================================================================")
            console.log("| Your total price for " + prodAmount + " " + response[0].product_name + "'s" + " is " + "$" + cartPrice + ".00" + " Thank you!");
            console.log("================================================================================================")
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + prodAmount + ' WHERE id =' + ID);
        } else {
            console.log("================================================================================================")

            console.log("| Sorry looks like we are running low on " + response[0].product_name + "'s but we do have " + response[0].stock_quantity + " left!!!");
            console.log("================================================================================================")
        };
        displayProducts();
    });
};
displayProducts();