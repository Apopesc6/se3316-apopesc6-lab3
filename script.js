function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i]} || ''}`);
    return DomPurify.sanitize(dirty);
}

itemSubmit = () => {
    var validInputs = true;
    
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const tax = document.getElementById('tax').value;
    const quantity= document.getElementById('quantity').value;
    if( name == "" ||  price == "" || quantity =="")
    {
        alert("Please enter valid values");
        validInputs = false;
    }
    
    if(validInputs === true)
    {
        var xhttp = new XMLHttpRequest();
         xhttp.open("POST", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/create", true);
         xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         
         xhttp.onreadystatechange = function() {//Call a function when the state changes.
          if(xhttp.readyState == 4 && xhttp.status == 200) {
              alert(xhttp.responseText);
          }
        };
        xhttp.send(`itemName=${name}&itemPrice=${price}&itemPriceTax=${tax}&itemQuantity=${quantity}`);
    }
};

quantityUpdate = () => {
    var validInputs = true;
    const name = document.getElementById('updateName').value;
    const quantity = document.getElementById('updateQuantity').value;
    
    if( name == "" || quantity =="")
    {
        alert("Please enter valid values");
        validInputs = false;
    }
    
    if(validInputs === true)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/updateQuantity",true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function() {//Call a function when the state changes.
          if(xhttp.readyState == 4 && xhttp.status == 200) {
              alert(xhttp.responseText);
          }
        };
        xhttp.send(`itemName=${name}&itemQuantity=${quantity}`);
    }
};

taxUpdate = () => {
    var validInputs = true;
    const name = document.getElementById('taxName').value;
    const tax = document.getElementById('updateTax').value;
    
    if( name == "" || tax =="")
    {
        alert("Please enter valid values");
        validInputs = false;
    }
    if(validInputs === true)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://se3316-apopesc6-lab3-apoopesc6.c9users.io/api/items/updateTaxrate",true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function() {//Call a function when the state changes.
          if(xhttp.readyState == 4 && xhttp.status == 200) {
              alert(xhttp.responseText);
          }
        };
        xhttp.send(`itemName=${name}&itemPriceTax=${tax}`);
    }  
    
};

deleteUpdate = () => {
    var validInputs = true;
    const name = document.getElementById('deleteName').value;

    if( name == "")
    {
        alert("Please enter valid values");
        validInputs = false;
    }    
    if(validInputs == true)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/delete",true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function() {//Call a function when the state changes.
        if(xhttp.readyState == 4 && xhttp.status == 200) {
              alert(xhttp.responseText);
          }
        };
        xhttp.send(`itemName=${name}`);
    }
};

getAll = () => {
    setInterval(function(){
    var itemName;
    var itemPrice;
    var itemQuantity;

    var element = document.getElementById("getAllDiv");
    
    document.getElementById("getAllDiv").innerHTML = "";
    
    var request = new XMLHttpRequest();
    request.open('GET', 'https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/all', true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(item => {
            itemName = item.itemName;
            itemPrice = item.itemPrice;
            itemQuantity = item.itemQuantity;
            
            var para = document.createElement("p");
            var node = document.createTextNode("item name: " + itemName + "; item price $" + itemPrice + "; item quantity: " + itemQuantity);
            para.appendChild(node);
            
            element.appendChild(para);
        });
        } else {
            console.log('error');
        }
    };
    request.send();
    }, 2000);
   
};

getOne = () => {
    var validInputs = true;
    var itemName;
    var itemPrice;
    var itemPriceTax;

    var element = document.getElementById('getOneDiv');
    
    document.getElementById('getOneDiv').innerHTML = "";
    
    const name = document.getElementById('getOne').value;

    if( name == "")
    {
        alert("Please enter valid values");
        validInputs = false;
    }    
    if(validInputs === true)
    {
        var request = new XMLHttpRequest();
        request.open('GET', `https://se3316-apopesc6-lab3-apopesc6.c9users.io/api/items/${name}`, true);
        request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        
        itemName = data.itemName;
        itemPrice = data.itemPrice;
        itemPriceTax = data.itemPriceTax;
        
        var para = document.createElement("p");
        var node = document.createTextNode("item name: " + itemName + "; item price $" + itemPrice + "; item tax rate: " + itemPriceTax + "%");
        para.appendChild(node);
            
        element.appendChild(para);    
        
        };
        request.send();
    }
};
