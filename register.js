async function registerUser() {

    const user = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        role: document.getElementById("role").value

    };

    // Validation
    if (
        user.name === "" ||
        user.email === "" ||
        user.password === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch("http://localhost:8080/api/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });

        if (response.ok) {

            alert("Registration Successful");

            window.location.href = "login.html";

        } else {

            const error = await response.text();

            alert("Registration Failed\n" + error);

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to Spring Boot Server.");

    }

}