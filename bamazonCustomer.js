var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

// make sure it's connected to MySQL
// call first function to start the app
connection.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected")
    displayAllItems();
});


// access the MySQL database and display the items
function displayAllItems() {
    connection.query("SELECT * FROM bamazon.products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("**********")
            console.log("Product ID: " + results[i].item_id);
            console.log("Product Description: " + results[i].product_name);
            console.log("Product Cost: " + results[i].price + " each.");
            console.log("We currently have: " + results[i].stock_quantity + " items in stock.")
        }

    })
    // once all items are displayed, prompt the user through questions in inquirer
    userPrompt();

}

// use inquirer to ask the user what they want to buy (ID) and how many of each item
function userPrompt() {

    console.log("---------- Welcome to Bamazon ----------");
    
    inquirer
        .prompt([{
           
            name: "chosenID",
            type: "input",
            message: "What is the item ID of the product you would like to buy?",

            // user needs to pick an ID between 1 - 10 or it will advise them to choose again
            validate: function (value) {
                if (value > 0 && value <= 10) {
                    return true;
                }
                return "Please choose a product ID between 1 - 10";
            }
        }, {
            name: "howMany",
            type: "input",
            message: "How many units of the product you would like to buy?",

            //user needs to select at least one item to purchase - cannot buy zero - only addressing this, not too many items
            validate: function (value) {
                if (value > 0) {
                    return true;
                }
                return "You must purchase at least one (1) item.";
            }
        }])
        .then(function (answer) {
            // display what the user chose if both options are successful, and then run checkRequest
            console.log("Purchase " + answer.howMany + " units of product ID " + answer.chosenID);
            checkRequest(parseInt(answer.howMany), parseInt(answer.chosenID));
        });

}

// update the table in MYSQL
function checkRequest(unit, id) {
    // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
    connection.query("SELECT stock_quantity, price FROM products WHERE ?", {
        item_id: id
    }, function (err, result) {

        if (result[0].stock_quantity >= unit) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{
                        stock_quantity: result[0].stock_quantity - unit
                    },
                    {
                        item_id: id
                    }
                ],
                function (error) {
                    if (error) throw error;
                    // they successfully purchased the items
                    console.log("Item(s) purchased successfully!");
                },
            );
        } else {
            // they selected more items than are in stock and receive this message:
            console.log("We do not have that many items in stock. Choose a lower quantity...");
        }
    })
    // ask the user if they want to buy anything else
    anythingElse();
}


function anythingElse() {
    inquirer
        .prompt([{
           // give the user the option to answer YES or NO
            name: "again",
            type: "list",
            message: "Would you like to buy anything else?",
            choices: ["Yes", "No"]
        }])
        .then(function (answer) {
            // if yes, ask the user what they want to buy / start process over
            if (answer.again === "Yes") {
                userPrompt();
            } else {
            // if no, provide goodbye notice and end the connection to database
                console.log("Thank you for shopping at Bamazon")
                connection.end()
            }
        });

}