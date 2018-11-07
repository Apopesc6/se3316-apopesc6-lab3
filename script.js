function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i]} || ''}`);
    return DomPurify.sanitize(dirty);
}


function createItem() {
    
    var addedName = document.getElementById('addName').value;
    var addedPrice = document.getElementById('addPrice').value;
    var addedTax = document.getElementById('addTax').value;
    var addedQuantity= document.getElementById('addQuantity').value;
    
    if( addedName != "" &&  addedPrice != "" && addedQuantity !="")
    {
        
        var HTTPreq = new XMLHttpRequest();
        // /items/create - accesses function in items.js - change this
        HTTPreq.open("POST", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/create", true);
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        HTTPreq.send(`itemName=${addedName}&itemPrice=${addedPrice}&itemPriceTax=${addedTax}&itemQuantity=${addedQuantity}`);
         
        HTTPreq.onreadystatechange = function() {//Call a function when the state changes.
            if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
                alert("Added "+addedName+" successfully to the database!");
                document.getElementById('addName').value = "";
                document.getElementById('addPrice').value = "";
                document.getElementById('addTax').value = "";
                document.getElementById('addQuantity').value = "";
            }
        };
        
        
        
    }else{
        alert("Please enter values for name, price, and quantity");
    }
    
}


function quantityItemUpdate(){
    
    var quantityName = document.getElementById('updateItemName').value;
    var quantityofItem = document.getElementById('updateQuantity').value;
    
    if(quantityName != "" && quantityofItem !="")
    {
        var HTTPreq = new XMLHttpRequest();
        HTTPreq.open("POST", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/updateQuantity",true);
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        HTTPreq.send(`itemName=${quantityName}&itemQuantity=${quantityofItem}`);
        
        HTTPreq.onreadystatechange = function() {//Call a function when the state changes.
          if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
              alert("Updated the quantity of "+quantityName+ " successfully in the database!");
              document.getElementById('updateItemName').value = "";
              document.getElementById('updateQuantity').value = "";
          }
        };
        
    }else{
        alert("Please enter values for name and quantity");
    }
    
}


function taxItemUpdate(){
    
    var taxName = document.getElementById('taxItemName').value;
    var taxofItem = document.getElementById('updateTax').value;
    
    if( taxName != "" && taxofItem !="")
    {
        var HTTPreq = new XMLHttpRequest();
        HTTPreq.open("POST", "https://se3316-apopesc6-lab3-apoopesc6.c9users.io/api/items/updateTaxrate",true);
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        HTTPreq.send(`itemName=${taxName}&itemPriceTax=${taxofItem}`);
        
        HTTPreq.onreadystatechange = function() {//Call a function when the state changes.
          if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
              alert("Updated the tax of "+taxName+ " successfully in the database!");
              document.getElementById('taxItemName').value = "";
              document.getElementById('updateTax').value = "";
          }
        };
        
        
    }else{
        alert("Please enter values for name and tax");
    }
    
}


function deleteItem(){
    
    var deleteItemName = document.getElementById('deleteItemName').value;

    if( deleteItemName != "")
    {
        var HTTPreq = new XMLHttpRequest();
        HTTPreq.open("DELETE", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/delete",true);
        HTTPreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        HTTPreq.send(`itemName=${deleteItemName}`);
        
        HTTPreq.onreadystatechange = function() {//Call a function when the state changes.
            if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
                alert("Deleted "+deleteItemName+ " successfully from the database!");
                document.getElementById('deleteItemName').value = "";
            }
        };
        
    }else{
        alert("Please enter a value for name");
    }
}


function getAllData(){
    setInterval(function(){
        
    var writingSpace = document.getElementById('writingSpace'); 
    
    var Name;
    var Price;
    var Quantity;

    var HTTPreq = new XMLHttpRequest();
    
    HTTPreq.open('GET', 'https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/all', true);
    HTTPreq.send();
    
    HTTPreq.onload = function () {
        
        // Begin accessing JSON data here
        var database = JSON.parse(this.response);
        console.log(database);
        
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
    
    document.getElementById("writingSpace").innerHTML = "";
    }, 2000);
   
}


function getOneData(){
    
    var writingSpace = document.getElementById('getOneWritingSpace');
    document.getElementById('getOneWritingSpace').innerHTML = "";
    
    var Name;
    var Price;
    var Tax;
    
    const searchName = document.getElementById('searchItem').value;

    if( searchName != "")
    {
        var HTTPreq = new XMLHttpRequest();
        HTTPreq.open('GET', `https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/${searchName}`, true);
        HTTPreq.send();
        HTTPreq.onload = function () {
            
            if(HTTPreq.readyState == 4 && HTTPreq.status == 200) {
                alert("Retrieved "+searchName+" from the database!");
                document.getElementById('searchItem').value = "";
            }
            
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
        
            Name = data.itemName;
            Price = data.itemPrice;
            Tax = data.itemPriceTax;
        
            var para = document.createElement("p");
            var node = document.createTextNode("item name: " + Name + "; item price $" + Price + "; item tax rate: " + Tax + "%");
            para.appendChild(node);
            
            writingSpace.appendChild(para);    
        };
        
    }else{
        alert("Please enter a value for name");
    }
    
    
}
