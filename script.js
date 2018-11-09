function sanitize(strings, ...values) { //sanitizing strings entered by user.
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i]} || ''}`);
    return DomPurify.sanitize(dirty);
}

//When the Create Item button is clicked
function createItem() {
    //Gets the user input from the text boxes and assigns it to variables
    var addedName = document.getElementById('addName').value;
    var addedPrice = document.getElementById('addPrice').value;
    var addedTax = document.getElementById('addTax').value;
    var addedQuantity= document.getElementById('addQuantity').value;

    //If the user has entered values for name, price, and quantity, then the code executes
    if( addedName != "" &&  addedPrice != "" && addedQuantity !="")
    {
        //creates a new XMLHttp Request
        var HTTPreq = new XMLHttpRequest();
        //Post request that references the createItem function in the ItemDatabase API
        HTTPreq.open("POST", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/ItemDatabase/createItem", true);
        //Sets the request header
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //Sends the required information for the creation of an item
        HTTPreq.send(`itemName=${addedName}&itemQuantity=${addedQuantity}&itemPrice=${addedPrice}&itemTax=${addedTax}`);
        //When the state changes, a function is called 
        HTTPreq.onreadystatechange = function() {
            if(HTTPreq.readyState == 4 && HTTPreq.status == 200) { //This state indicates that the data was entered successfully into the database
                alert("Added "+addedName+" successfully to the database!");
                //Clears values in the text boxes, so the user can type in more items to add
                document.getElementById('addName').value = "";
                document.getElementById('addPrice').value = "";
                document.getElementById('addTax').value = "";
                document.getElementById('addQuantity').value = "";

            }
        };
        
    }else{//If the user leaves one of the required text boxes blank
        alert("Please enter values for name, price, and quantity");
    }
    
}

//When the Delete Item button is clicked
function deleteItem(){
    
    //Gets the value in the "delete" textbox
    var deleteItemName = document.getElementById('deleteItemName').value;
    
    //if the textbox is not blank when the button is clicked
    if( deleteItemName != "")
    {
        //new XMLHttpRequest
        var HTTPreq = new XMLHttpRequest();
        //DELETE command that references /deleteitem in the ItemDatabase api
        HTTPreq.open("DELETE", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/ItemDatabase/deleteItem",true);
        //Sets request header
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //Sends the request
        HTTPreq.send(`itemName=${deleteItemName}`);
        
        //When the state changes
        HTTPreq.onreadystatechange = function() {
            //If it was deleted successfully from the database, send alert, and clear the textbox
            if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
                alert("Deleted "+deleteItemName+ " successfully from the database!");
                document.getElementById('deleteItemName').value = "";
            }
        };
       
    //If the textbox is blank, ask the user to enter a value
    }else{
        alert("Please enter a value for name");
    }
}

//When the update Tax button is clicked
function taxItemUpdate(){
    
    //Gets the name of the item and the new tax value to be inputted
    var taxName = document.getElementById('taxItemName').value;
    var taxofItem = document.getElementById('updateTax').value;
    
    //If the name isn't blank, and the new tax value isn't blank
    if( taxName != "" && taxofItem !="")
    {
        //New XMLHttp request
        var HTTPreq = new XMLHttpRequest();
        //POST request that references /updateItemTax in the ItemDatabase api
        HTTPreq.open("POST", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/ItemDatabase/updateItemTax",true);
        //Sets request header
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //Sends request with the required information
        HTTPreq.send(`itemName=${taxName}&itemTax=${taxofItem}`);
        //When the state changes
        HTTPreq.onreadystatechange = function() {
        //If it gets updated successfully in the database
          if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
              //Output alert, and clear the values in the textboxes.
              alert("Updated the tax of "+taxName+ " successfully in the database!");
              document.getElementById('taxItemName').value = "";
              document.getElementById('updateTax').value = "";
          }
        };
        
        //If one of the text boxes is empty, ask the user to enter values
    }else{
        alert("Please enter values for name and tax");
    }
    
}

//When the update quantity button is clicked
function quantityItemUpdate(){
    //gets the name and the new quantity from the textboxes.
    var quantityName = document.getElementById('updateItemName').value;
    var quantityofItem = document.getElementById('updateQuantity').value;
    
    //If the text boxes are not empty
    if(quantityName != "" && quantityofItem !="")
    {
        //New XMLHttp Request
        var HTTPreq = new XMLHttpRequest();
        //POST request that references /updateItemQuantity
        HTTPreq.open("POST", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/ItemDatabase/updateItemQuantity",true);
        //Set request header
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //Send the request with the name and new quantity
        HTTPreq.send(`itemName=${quantityName}&itemQuantity=${quantityofItem}`);
        //When the state changes
        HTTPreq.onreadystatechange = function() {
        //if it is successfully updated in the database, output an alert, and clear the textboxes
          if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
              alert("Updated the quantity of "+quantityName+ " successfully in the database!");
              document.getElementById('updateItemName').value = "";
              document.getElementById('updateQuantity').value = "";
          }
        };
    //If one or more of the textboxes is empty, ask the user to enter values
    }else{
        alert("Please enter values for name and quantity");
    }
    
    
}



//Get one Item button is clicked
function getOneData(){
    //Get the writing space in which the retrieved item will be written
    var writingSpace = document.getElementById('getOneWritingSpace');
    //Set it to blank so that if the user wants to use it more than once, it overrwrites the previous entry
    document.getElementById('getOneWritingSpace').innerHTML = "";
    //Required variables
    var Name;
    var Price;
    var Quantity;
    var Tax;
    //Gets the name of the item that is to be retrieved 
    var searchName = document.getElementById('searchItem').value;
    //If the textbox is not empty,
    if( searchName != "")
    {
        //Create and send XMLHttp request
        var HTTPreq = new XMLHttpRequest();
        HTTPreq.open('GET', `https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/ItemDatabase/${searchName}`, true);
        HTTPreq.send();
        //When the state changes
        HTTPreq.onload = function () {
            //If it is successfully retrieved, alert the user, and clear the textbox
            if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
                alert("Retrieved "+searchName+" from the database!");
                document.getElementById('searchItem').value = "";
            }
            
            // Begin accessing JSON data here
            var database = JSON.parse(this.response);
            //Get the name, price quantity and tax from the database.
            Name = database.itemName;
            Price = database.itemPrice;
            Quantity = database.itemQuantity;
            Tax = database.itemTax;
        
            //Create a textnode that has a string with all the required information
            var textNode = ("Name: " + Name + ", Price $" + Price + ", Quantity: " + Quantity +", Tax: "+ Tax + "%");
            //Create an HTML element (paragraph in this case), and add the textnode to it
            var listElement = document.createElement('p');
            listElement.appendChild(document.createTextNode(textNode));
            //Append the HTML element to the writing space so it appears on screen.
            writingSpace.appendChild(listElement);    
        };
        
     //If the textbox for searching the items is empty, prompt the user to enter a value.   
    }else{
        alert("Please enter a value for name");
    }
    
    
}

//Get data for all the items in the database
function getAllData(){
    //setInterval allows for repetition over how many seconds you want (in our case 2 seconds)
    setInterval(function(){
    //Get the writing space where the retreived data will go.    
    var writingSpace = document.getElementById('writingSpace'); 
    //Required variables
    var Name;
    var Price;
    var Quantity;
    //New XMLHttp request
    var HTTPreq = new XMLHttpRequest();
    HTTPreq.open('GET', 'https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/ItemDatabase/allItems', true);
    HTTPreq.send();
    //When the request changes state
    HTTPreq.onload = function () {
        
        // Begin accessing JSON data here
        var database = JSON.parse(this.response);
        console.log(database);
        
        //for each item in the database, get its name, price and quantity, add it to a string containing all the information, create a new HTML element with the textNode,
        //and add it to the ordered list.
        database.forEach(iteminDatabase => {
            Name = iteminDatabase.itemName;
            Price = iteminDatabase.itemPrice;
            Quantity = iteminDatabase.itemQuantity;
        
            var textNode = ("Name: " + Name + ", Price $" + Price + ", Quantity: " + Quantity);
            var listElement = document.createElement('li');
            listElement.appendChild(document.createTextNode(textNode));
            
            writingSpace.appendChild(listElement);
        });
        
    };
    
    document.getElementById("writingSpace").innerHTML = ""; //Clears the writing space after eac iteration so that it doesn't keep writing more infinitely
    }, 2000);//every 2s.
   
}