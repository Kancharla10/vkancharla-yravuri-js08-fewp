"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-03

      Project to build a pizza using object oriented programming
      Author: 
      Date:   

      Filename: project08-03.js
*/

/*---------------- Object Code ----------------------*/




function pizza(a,b,c){
   this.size=a;
   this.crust=b;
   this.topp=c;

}






/*----------------------------- Interface Code -------------------------*/

let pizzaPreviewBox = document.getElementById("previewBox");         // pizza image 
let pizzaSizeBox = document.getElementById("pizzaSize");             // pizza size selection
let pizzaCrustBox = document.getElementById("pizzaCrust");           // pizza crust selection 
let toppingOptions = document.querySelectorAll("input.topping");     // pizza topping option buttons
let addToCart = document.getElementById("addToCart");                // Add to Cart button
let cartBox = document.getElementById("cart");                       // Shopping cart box


// Add event handlers for the pizza toppings   
for (let i = 0; i < toppingOptions.length; i++) {
   toppingOptions[i].onclick = drawPizza;
} 

// Event Handler for the addToCart button
addToCart.onclick = updateCart;


// Clear the pizza image
function clearPizzaImage() {
   while (pizzaPreviewBox.firstChild) {
      pizzaPreviewBox.removeChild(pizzaPreviewBox.firstChild);
   }
}

// Unselect all toppings
function clearToppings() {
   let noTopping = document.querySelectorAll("input.topping[value='none']");
   for (let i = 0; i < noTopping.length; i++) {
      noTopping[i].checked = true;
   }
}

/* Function to draw the pizza image  */
function drawPizza() {
   // Erase current pizza image
   clearPizzaImage();
   // Determine which toppings have been checked
   let checkedToppings = document.querySelectorAll("input.topping:checked");  

   // Draw the individual toppings
   for (let i = 0; i < checkedToppings.length; i++) {
      if (checkedToppings[i].value !== "none") {
         let toppingImage = document.createElement("img");
         toppingImage.src = checkedToppings[i].name + ".png";
         toppingImage.className = checkedToppings[i].value;
         pizzaPreviewBox.appendChild(toppingImage);                                  
      }
   }      
}



// Function to build the pizza
function buildPizza() {
   let checkedToppings = document.querySelectorAll("input.topping:checked"); 
   let psize=pizzaSizeBox.options[pizzaSizeBox.selectedIndex].value;
   let pcrust=pizzaCrustBox.options[pizzaCrustBox.selectedIndex].value;
   let c=new Array();
   for(let i=0;i<checkedToppings.length;i++){
      if(checkedToppings[i].value!="none"){
      c.push(checkedToppings[i].parentElement.firstElementChild.textContent);
      c.push(checkedToppings[i].value);
      }
   }
   return (new pizza(psize,pcrust,c));

}    

// Function to add the built pizza to the shopping cart
function updateCart() {
   let cart=document.getElementById("cart");
   let newPara=document.createElement("p");
   let newpizza=buildPizza();
   let c="";
   for(let i=0;i<newpizza.topp.length;i=i+2){
      c+=newpizza.topp[i]+" ("+newpizza.topp[i+1]+") ";
   }
   newPara.textContent="Pizza: "+newpizza.size+" "+newpizza.crust+" "+c;
   cart.appendChild(newPara);
   clearPizzaImage();
   clearToppings();

};  
