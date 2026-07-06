function loginUser() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {

        alert("Please register first.");

        window.location.href = "register.html";

        return;
    }

    if (
        email === storedUser.email &&
        password === storedUser.password
    ) {

        alert("Login Successful");

        window.location.href = "index.html";

    }
    else {

        alert("Invalid Email or Password");

    }
}
