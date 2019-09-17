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


  connection.connect(function(err) {
    if (err) throw err;
    orderProduct();
  });



  function orderProduct() {
  console.log("App is running");
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Choice1",
          "Choice2",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Choice1":
          //createFunctionHere();
          break;
  
        case "Choice2":
          //createFunctionHere();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  }


  
  