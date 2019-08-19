var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "@lmost12",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to localhost:3306 with id # " + connection.threadId + "\n");
    console.log("Welcome to Bamazon!!!!")
    
  });


  var displayProducts = function(){
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
        }
		console.log(displayTable.toString());
		buyItem();
	});
}

function buyItem(){
	inquirer.prompt([
	{
		name: "id",
		type: "input",
		message:"Please enter the ID of the item want to buy:",
		filter:Number
	},
	{
		name:"quantity",
		type:"input",
		message:"How many would you like to buy?",
		filter:Number
	},

 ]).then(function(answers){
 	var buyAmount = answers.quantity;
 	var buyID = answers.id;
 	purchaseOrder(buyID, buyAmount);
 })

};
function purchaseOrder(id, amount){
	connection.query('Select * FROM products WHERE id =' + id, function(err,res){
		if(err){console.log(err)};
		if(amount <= res[0].stock_quantity){
			var cartPrice = res[0].price * amount;
			console.log("Good news your order is in stock!");
			console.log("Your total cost for " + amount + " " +res[0].product_name + " is " + cartPrice + " Thank you!");

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amount + "WHERE id = " + id);
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
		};
		displayProducts();
	});
};
displayProducts();