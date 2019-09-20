
# bAmazon
## ...bBest Buy?, bTarget?, bNorthernTool?, b_A_Retailer!</h2>

In this activity, I created a storefront with mySQL and node.js. The app takes in orders from customers and deplete stock from the store's inventory.



[![Watch the video](https://img.youtube.com/vi/6Xw9tv5nCpo/maxresdefault.jpg)](https://youtu.be/6Xw9tv5nCpo)


**This app is a CLI node app.**  

** Syntax for starting is "node bAmazon.js" **


The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

This database is populated with around 10 different products. 

 Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

The app will then prompt users with two messages.

   * The first, asks the user for the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, the application should checks if the store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity. Try again`, and then prevent the order from going through.

However, if the store _does_ have enough of the product, then the customers order is fulfilled.

   * The SQL database is updated to reflect the remaining quantity.
   * Once the update goes through then the customers total cost is displayed.


This was an app developed solely by SpeedHunterSam for the purpose of demonstrating setting up a mySQL server, using mySQL workbench and setting up a node server to connect to the localhost mySQL server for the purpose of feeding an manipulating database data.

