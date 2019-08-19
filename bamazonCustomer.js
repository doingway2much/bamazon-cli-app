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
			head: ["ID", "Product Name", "Department", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
        }
		console.log(displayTable.toString());
		buyPrompt();
	});
}

function buyPrompt(){
	inquirer.prompt([
	{
		name: "ID",
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
 	var buyID = answers.ID;
 	purchasProducts(buyID, buyAmount);
 })

};
function purchasProducts(ID, prodAmount){
	connection.query('Select * FROM products WHERE id =' + ID, function(err,res){
		if(err){console.log(err)};
		if(prodAmount <= res[0].stock_quantity){
			var cartPrice = res[0].price * prodAmount;
			console.log("Awsome looks like we have more than" + prodAmount + " in stock!!!!");
			console.log("Your total price for " + prodAmount + " " +res[0].product_name + "'s" + " is " + "$" + cartPrice + ".00" + " Thank you!");
			connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + prodAmount + ' WHERE id =' + ID);
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
		};
		displayProducts();
	});
};
displayProducts();