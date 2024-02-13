/* Function to handle sign up form submission */
const signUp = e => {
    /* Get input values form the form */
    let fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;

    /*Retrieve existing form data from localStorage or initialize an empty array */
    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    /* Check if there is already an entry with the same email */
    let exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data =>
            data.email.toLowerCase() == email.toLowerCase()

        );
    /* If no duplicate email is found, add the new user to the form data */
    if(!exist){
        formData.push({ fname, lname, email, pwd });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('fname').focus();
        alert("Account Created.\n\nPlease Log In using the link below.");
    }
    /* Else alert message */
    else{
        alert("Ooopppssss... Duplicate found!!!\nYou have already signed up");
    }
    /*  Prevent the default form submission behavior */
    e.preventDefault();
}
/* Function for signin */
function signIn(e) {
    /* getting input values from the form */
    let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
    /*Retrieve existing form data from localStorage or initialize an empty array */
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    /* Check if there is a user with matching email and password */
    let exist = formData.length && 
    JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
    /* If no matching user is found, show an error message */
    if(!exist){
        alert("Incorrect login credentials");
    }
    /* If a matching user is found, redirect to the home page */
    else{
        location.href = "./index.html";
    }
    /* Prevent the default form submission behavior */
    e.preventDefault();
}