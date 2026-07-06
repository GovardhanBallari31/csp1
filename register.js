function registerUser() {

    const user = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        role: document.getElementById("role").value
    };

    if (
        user.name === "" ||
        user.email === "" ||
        user.password === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Allow only this user
    if (
        user.name === "krishna" &&
        user.email === "krishna@gmail.com" &&
        user.password === "123456" &&
        user.role === "USER"
    ) {

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration Successful");

        window.location.href = "login.html";
    }
    else {

        alert("Use these credentials:\n\nName : krishna\nEmail : krishna@gmail.com\nPassword : 123456\nRole : USER");

    }
}
