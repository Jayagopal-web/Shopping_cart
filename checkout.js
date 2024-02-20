

const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const address = document.querySelector('#address');
const Mobile = document.querySelector('#Mobile');
const state = document.querySelector('#state');
const nameoncard = document.querySelector('#nameoncard');
const expmonth = document.querySelector('#expmonth');
const expyear = document.querySelector('#expyear');
const credit = document.querySelector('#credit');
const CVV = document.querySelector('#CVV');
const zip = document.querySelector('#zip');
const sessionId = sessionStorage.getItem('ID');
const submit_btn=document.getElementById("submit-btn")
let success= true

let total=document.getElementById("total");

form.addEventListener('submit',(e)=>{

if(!validateInput()){
e.preventDefault();
}else{
    console.log("hii")
    alert("YOUR ORDER IS SUCCESSFULLY PLACED")
    const cartKey = 'acc-cart-' + sessionId; // Assuming you have this variable defined somewhere
    setCartLocalStorageValuesToNull(cartKey);
    
    setTotalLocalStorageValuesToNull("Total");
   

    
    


}


})


//  function to make the localstorage values to null
function setCartLocalStorageValuesToNull(cartKey) {
localStorage.setItem(cartKey, "");
// // Get the URL of the previous page
// const previousPageUrl = document.referrer;
// // Redirect to the previous page
// window.location.href = previousPageUrl;

}
function setTotalLocalStorageValuesToNull(Total) {
localStorage.setItem(Total, "0");
}




function validateInput(){

const usernameVal = username.value.trim();
const emailVal = email.value.trim();
const addressVal = address.value.trim();
const MobileVal = Mobile.value.trim();
const stateVal = state.value.trim();
const nameoncardVal = nameoncard.value.trim();
const expmonthVal = expmonth.value.trim();
const expyearVal = expyear.value.trim();
const creditVal = credit.value.trim();
const CVVVal = CVV.value.trim();
const zipVal = zip.value.trim();




// validating username 
if(usernameVal===''){
success= false;
setError(username, 'username is required')
}else{
setSuccess(username)
}


// validating email
if(emailVal===''){
success= false;
setError(email, 'email is required')
}else if(!emailValidation(emailVal)){
success= false;
setError(email, 'enter a valid email')

}else{
setSuccess(email)
}

// validating adddress
if(addressVal===''){
success= false;
setError(address, 'address is required')
}else{
setSuccess(address)
}

// validating Mobile
if(MobileVal===''){
success= false;
setError(Mobile, 'Mobile number is required')
}else if(MobileVal.length!=10){
success= false;
setError(Mobile, 'Mobile  number is not proper')

}else{
setSuccess(Mobile)

}
// validating state 
if(stateVal===''){
success= false;
setError(state, 'state is required')
}else{
setSuccess(state)
}


// validating Zip-code
if(zipVal===''){
success= false;
setError(zip, 'Zip-code is required')
}else if(zipVal.length!=6){
success= false;
setError(zip, 'Zip-code  number is not proper')

}else{
setSuccess(zip)

}
// validating nameoncard 
if(nameoncardVal===''){
success= false;
setError(nameoncard, 'nameoncard is required')
}else{
setSuccess(nameoncard)
}

// validating expmonth 
if(expmonthVal===''){
success= false;
setError(expmonth, 'expmonth is required')
}else{
setSuccess(expmonth)
}

// validating expyear 
if(expyearVal===''){
success= false;
setError(expyear, 'expyear is required')
}else{
setSuccess(expyear)
}

// validating credit 
if(creditVal===''){
success= false;
setError(credit, 'credit is required')
}else{
setSuccess(credit)
}

// validating CVV 
if(CVVVal===''){
success= false;
setError(CVV, 'CVV is required')
}else{
setSuccess(CVV)
}


return success;

}


// creating function for error
function setError(element, message){
const inputGroup = element.parentElement;
const errorElement = inputGroup.querySelector('.error');

errorElement.innerText = message;
inputGroup.classList.add('error');
inputGroup.classList.remove('success');




}


// creating function for success
function setSuccess(element){
const inputGroup = element.parentElement;
const errorElement = inputGroup.querySelector('.error');

errorElement.innerText = '';
inputGroup.classList.add('success');
inputGroup.classList.remove('error');

}

// email validation function

function emailValidation(email) {
return String(email)
.toLowerCase()
.match(
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
}


if(localStorage.getItem('Total')){

cart = JSON.parse(localStorage.getItem('Total'));
total.innerText= cart
console.log(cart)
console.log(sessionStorage.getItem('ID'))

}
// function for back btn to go back

document.getElementById('back').addEventListener('click', ()=>{
    window.history.back();

})









