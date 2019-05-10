//Then create a Node application called `bamazonCustomer.js`.
//Running this application will first display all of the items available for sale.
//Include the ids, names, and prices of products for sale.

var inquirer = require("inquirer");
var mysql = require('mysql');

//mysql Database connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});

//Validate Input
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Enter a value 0-300';
    }
}

//Display list of items with prices
function promptUserPurchase() {
    // Prompt the user with 2 messages:
    //1) should ask them the ID of the product they would like to buy.
    inquirer.prompt([

        {
            type: "input",
            name: "userInput",
            message: "Which ID of the product would you like to purchase?",
            validate: validateInput,
            filter: Number
        },
        // 2) ask how many units of the product they would like to buy.
        {
            type: "input",
            name: "userInput",
            message: "How many units of the product would you like to purchase?",
            validate: validateInput,
            filter: Number
        }

        // After prompt 1 & 2, store the user's response in a variable called location.
    ]).then(function (input) {

        var item = input.item_id;
        var quantity = input.quantity;

        // console.log(location.userInput);
        //console.log(JSON.stringify(data, null, 2));

        //Confirm the customer's chosen product exists in the quantity inputted
        var queryStr = 'SELECT * FROM products WHERE ?';
        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;
            //customer's wanted quantity is not in stock
            if (data.length === 0) {
                console.log("ERROR. Insuffient Quantity!");
                displayInventory();
            } else {
                var item_id = id[0];

                //customer's wanted quantity is in stock
                if (quantity <= item_id.stock_quantity) {
                    console.log('The product quantity is in stock. Order is being processed.');

                    //update SQL database with quantity (after customer's order)
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + 'WHERE item_id = ' + item;

                    //Update inventory balances
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        //Notify customer order was successfully processed and the total cost of their order
                        console.log('Your order has been successfully processed. Your total cost of purchase is $' + productData.price * stock_quantity);
                        console.log('Your order has been placed!');
                        console.log("\n---------------------------------------------------------------------\n");

                        //End database connection
                        connection.end();
                    })


                } else {
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }

            //Output current inventory stock values to console
            function displayInventory() {

                //Create database query string
                queryStr = 'SELECT * FROM products';

                //Make database query
                connection.query(queryStr, function (err, data) {
                    if (err) throw err;

                    console.log('Existing Inventory: ');
                    console.log('...................\n');

                    var inventory = '';
                    for (var i = 0; i < data.length; i++) {
                        inventory = '';
                        inventory += 'Product ID: ' + data[i].item_id + '  //  ';
                        inventory += 'Product Name: ' + data[i].product_name + '  //  ';
                        inventory += 'Department: ' + data[i].department_name + '  //  ';
                        inventory += 'Price: $' + data[i].price + '\n';

                        console.log(inventory);
                    }

                    //Quantity customer wants to purchase
                    promptUserPurchase();

                })
            }

            //Run main application of bamazon
            function runbamazon() {

                //Display Available Inventory
                displayInventory();
            }

            //Run application
            runbamazon();
        });