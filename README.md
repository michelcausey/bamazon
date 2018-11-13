# Welcome to Bamazon

* Shoppers at Bamazon will be able to view: 
     * all items in stock
     * the Item ID
     * cost
     * number available to purchase

* Shoppers will be prompted to indicate the Product ID
    * Shoppers must choose a valid Product ID between 1 - 10

* Shoppers will be asked how many items they want to purchase:
    * Shoppers must select at least one (1) item 
    * Shoppers cannot purchase more items than are available in stock

* Shoppers will be able to continue shopping until they indicate that they do not want to purchase any additional items.

## Link to video walk through of app: 
https://drive.google.com/file/d/1ehPvAolAKu07E1VdL83aGS5rXiX6gHiR/view

* IN VISUAL STUDIO / NODE TERMINAL
    * Showing that when user selects product outside of 1 - 10, they are advised to enter a valid ID
   
   * Showing that when user indicates they wish to purchase more items than are in stock, they are advised to enter a lower quantity
   
    * Showing that user is told "Item Successfully Purchased" when they select a valid ID & quantity
   
    * Showing that the user is prompted to buy something else
   
    * Showing that the program ends if they user indicates they do not want to purchase anything else

* IN MY SQL:
    * Showing the original table (specifically: stock_quantity column) before items were purchased
    
    * Refreshing the server to show the items were subtracted (row 1 and row 10 affected by the purchases in node)


