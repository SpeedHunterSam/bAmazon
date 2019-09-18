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
    showInventory();
});


//this function displays the entire inventory list to the console so that the user can make a selection from the screen

function showInventory() {

    const query = `SELECT * FROM products`;
    let outputString = "";

    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            //store table of items in a string
            outputString +=
                "\nItem ID: " +
                res[i].item_id +
                " || Name: " +
                res[i].product_name +
                " || Price: " +
                res[i].price +
                " || Quantity: " +
                res[i].stock_quantity;
        }

        //display table of items from stored string
        console.log(outputString);
        orderProduct();  //ask the user what they'd like to order

    });

}


// function that asks user what they would like to order;
function orderProduct() {
    console.log("\nStore items shown above. Please make a selection.\n");
    inquirer
        .prompt([

            {
                type: "input",
                message: "Please enter the Item ID for the item that you want to purchase: ",
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

            verifyAvailability(answer.itemID, answer.quantity);

        });

}

function verifyAvailability(itemID, quantity) {

    const query = `SELECT * FROM products WHERE item_id = '${itemID}'`;

    connection.query(query, function (err, res) {

        if (res[0].stock_quantity < quantity) {
            console.log("\n*********************************\nInsufficient Quantity. Try again.\n*********************************\n");
            showInventory(); //run show inventory function to let user try again.
        } else {
            purchaseItem(itemID, quantity);  //else continue with purchase.
        }

        //console.log(res);

    })

}

//this function changes reduces inventory based on user purchase quantity
function purchaseItem(itemID, quantity) {


    const query = `
    
    UPDATE products SET stock_quantity = stock_quantity - ${quantity}
    WHERE item_id = '${itemID}';
    
    `;


    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n*****************\nItem Purchased\n*****************\n");
        calcTotalPurchase(itemID, quantity);

    });

}

//function that calculates total amount spent
function calcTotalPurchase(itemID, quantity) {

    const query = `SELECT * FROM products`;

    connection.query(query, function (err, res) {

        const amountSpent = res[itemID - 1].price * quantity;

        console.log(res[itemID - 1].product_name + " | Quantity: " + quantity + " | Total Amount Spent: " + amountSpent + "\n\n");
        //console.log(res);

        ShopOrExit();

    })

}


//***** Make another purchase or quit app function *********

function ShopOrExit() {
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
        .then(function (answer) {
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