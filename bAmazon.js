const mysql = require("mysql");  //require NPM package to set up mySQL Database
const inquirer = require("inquirer"); // require NPM package to set up inquire terminal prompts

const connection = mysql.createConnection({
    host: "localhost",  //using local machine mySQL database

    // Your port; if not 3306
    port: 3306,

    // mySQL username
    user: "brian",

    // mySQL password
    password: "brian",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    startApp();
});

//***** Temp Code to easily navigate different functions*********

function startApp() {
    console.log("App is running");
      inquirer
        .prompt({
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "Show Inventory",
            "Place Order",
            "exit"
          ]
        })
        .then(function(answer) {
          switch (answer.action) {
          case "Show Inventory":
            showInventory();
            break;
    
          case "Place Order":
            orderProduct();
            break;
    
          case "exit":
            connection.end();
            break;
          }
        });
    
 }

//*******************************************




//this function displays the entire inventory list to the console so that the user can make a selection from the screen

function showInventory() {

    const query = `SELECT * FROM products`;


    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(
                "\nItem ID: " +
                res[i].item_id +
                " || Name: " +
                res[i].product_name +
                " || Price: " +
                res[i].price +
                " || Quantity: " +
                res[i].stock_quantity
            );

        }
    });
    connection.end();
}


// function that asks user what they would like to order;
function orderProduct() {
    console.log("App is running");
    inquirer
        .prompt([

            {
                type: "input",
                message: "What is the item ID?",
                name: "itemID"
            },
            {
                type: "input",
                message: "How many would you like?",
                name: "quantity"
            }

        ])
        .then(function (answer) {

            console.log("Getting item ID #" + answer.itemID + " | Quantity: " + answer.quantity);

            purchaseItem(answer.itemID, answer.quantity);

        });


}


function purchaseItem(itemID, quantity) {


    const query = `
    
    UPDATE products SET stock_quantity = stock_quantity - ${quantity}
    WHERE item_id = '${itemID}';
    
    `;


    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Item Purchased");

    });

}
