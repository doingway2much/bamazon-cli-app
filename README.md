# bamazon-cli-app

The Bamazon CLI App uses NodeJS and Javascript to create reade and update and delete data (C.R.U.D) via a CLI App.  THere are two apps one for the customer's and one for management that do two diffrent things.  

# Usage

1.  To use this app you  will first mneed to clone the repo:

```

2.  Install NPM packeges needed to run the app:

```
$ git clone https://github.com/doingway2much/bamazon-cli-app.git
Cloning into 'bamazon-cli-app'...
remote: Enumerating objects: 26, done.
remote: Counting objects: 100% (26/26), done.
remote: Compressing objects: 100% (18/18), done.
remote: Total 26 (delta 9), reused 19 (delta 5), pack-reused 0
Unpacking objects: 100% (26/26), done.
```
2. Run "npm install" to install the Node pagckages:

```
$ npm install
added 48 packages from 46 contributors and audited 53 packages in 9.757s
found 0 vulnerabilities
```

3.  Use the "bamazon.sql" file to see the data in your MySQL DB:

```
***See file for all data***
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT (4) NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(20) NOT NULL,
  PRIMARY KEY (id)
);
```


4. Edit the connection details on both *.js files:

```
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password,
    database: "bamazon"
});
```



# bamazonCustomer.js




# bamazonManager.js
