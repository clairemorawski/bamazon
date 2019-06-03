//Then create a Node application called `bamazonCustomer.js`.
//Running this application will first display all of the items available for sale.
//Include the ids, names, and prices of products for sale.

var inquirer = require("inquirer");
var mysql = require("mysql");

//mysql Database connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'root',
    database: 'bamazon_db'
});

//show products from product table
connection.connect(function (err) {
    if (err) throw err;
    printProducts();
});

//function to show products from database
function printProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        //for loop to print each product
        for (var i = 0; i < res.length; i++) {
            console.log('-------------------');
            console.log('Item ID: ' + res[i].item_id);
            console.log('Product Name: ' + res[i].product_name);
            console.log('Department: ' + res[i].department_name);
            console.log('Price: ' + res[i].price);
            console.log('Units Available: ' + res[i].stock_quantity);
        }
        console.log('\n');
        promptUserPurchase();
    });
}

//Prompt User of their options of products to purchase
function promptUserPurchase() {
    inquirer.prompt([
        //1) should ask them the ID of the product they would like to buy.
        {
            type: 'list',
            message: 'Which ID of the product would you like to purchase?',
            choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            name: 'choice',
            filter: Number
        },
        //2) ask how many units of the product they would like to buy.
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units of the product would you like to purchase?',
            filter: Number
        },
        {
            type: 'confirm',
            message: 'Are you sure?',
            name: 'confirmChoice',
            default: true
        }
    ])
        .then(function (response) {
            var choice = response.choice;
            var quantity = response.quantity;
            var confirm = response.confirmChoice;

            //Sell product if user confirms purchase
            if (confirm) {
                processingPurchase(choice, quantity);
            } else {
                promptUserPurchase();
            }
        });
}

//Function to purchase with selection
function processingPurchase(choice, quantity) {
    connection.query('SELECT * FROM products WHERE item_id=?', [choice], function (err, res) {
        if (err) throw err;
        var price;
        var stock_quantity;

        //Statement to calculate the stock and price
        if (quantity <= parseInt(res[0].stock_quantity)) {
            stock_quantity = parseInt(res[0].stock_quantity) - quantity;

            //Update function to show purchases
            updateProduct(stock_quantity, choice);

            //Math to calculate price and show final purchase price
            price = parseInt(res[0].price);
            cost = parseInt(res[0].stock_quantity) * price;
            console.log(stock_quantity)
            console.log('\n Your total cost is: ' + cost + '\n');

            //Does the user want to purchase another product?
            getNewInput();
        } else {
            //If there is not enough product quantity, ask user to reselect
            console.log('Insufficient quantity!');
            promptUserPurchase();
        }
    });
}

// //Function to update product inventory
function updateProduct(stock_quantity, choice) {
    connection.query(
        'UPDATE products SET stock_quantity=? WHERE item_id=?',
        [stock_quantity, choice],
        function (err, res) { }
    );
}

// //Does the user want to purchase another product?
function getNewInput() {
    inquirer.prompt({
        type: 'list',
        message: 'Would you like to purchase another product?',
        choices: ['Yes', 'No'],
        name: 'choice'
    })
        .then(function (response) {
            var choice = response.choice;

            //Result is yes, log stock to user:
            if (choice === 'Yes') {
                printProducts();
            } else {
                //Display next message:
                console.log('\n Thank you for your purchase! \n');

                //Close connection
                connection.end();
            }
        });
};
