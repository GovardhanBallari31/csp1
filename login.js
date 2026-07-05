async function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/api/users/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    });

    if(response.ok){

        const user = await response.json();

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("loggedIn","true");

        // Open Career Guidance Portal
        window.location.href="index.html";

    }else{

        alert("Invalid Email or Password");

    }

}