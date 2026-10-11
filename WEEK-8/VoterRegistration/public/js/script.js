// ========================================
// REGISTRATION
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const formData = new FormData(registerForm);

        const voterData =
            Object.fromEntries(formData.entries());

        try {

            const response = await fetch("/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(voterData)

            });


            const result = await response.json();

            const message =
                document.getElementById("registerMessage");


            if (response.ok) {

                message.textContent =
                    result.message;

                message.className =
                    "success";


                registerForm.reset();


                setTimeout(function () {

                    window.location.href =
                        "/login";

                }, 1500);

            } else {

                message.textContent =
                    result.message;

                message.className =
                    "error";

            }

        } catch (error) {

            console.error(error);

            document.getElementById(
                "registerMessage"
            ).textContent =
                "Server error. Please try again.";

        }

    });

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const username =
                document.getElementById(
                    "username"
                ).value;

            const password =
                document.getElementById(
                    "password"
                ).value;


            try {

                const response =
                    await fetch("/login", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            username: username,

                            password: password

                        })

                    });


                const result =
                    await response.json();


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                if (response.ok) {

                    localStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(result.user)
                    );


                    message.textContent =
                        result.message;

                    message.className =
                        "success";


                    setTimeout(function () {

                        window.location.href =
                            "/dashboard.html";

                    }, 800);


                } else {

                    message.textContent =
                        result.message;

                    message.className =
                        "error";

                }


            } catch (error) {

                console.error(error);

                document.getElementById(
                    "loginMessage"
                ).textContent =
                    "Server error. Please try again.";

            }

        }
    );

}


// ========================================
// DASHBOARD
// ========================================

if (
    window.location.pathname.includes(
        "dashboard.html"
    )
) {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem(
                "loggedInUser"
            )
        );


    // If user is not logged in
    if (!loggedInUser) {

        window.location.href =
            "/login";

    } else {

        // Welcome name
        document.getElementById(
            "welcomeName"
        ).textContent =
            loggedInUser.name;


        // Voter information
        document.getElementById(
            "name"
        ).textContent =
            loggedInUser.name;


        document.getElementById(
            "age"
        ).textContent =
            loggedInUser.age;


        document.getElementById(
            "dob"
        ).textContent =
            loggedInUser.dob;


        document.getElementById(
            "gender"
        ).textContent =
            loggedInUser.gender;


        document.getElementById(
            "email"
        ).textContent =
            loggedInUser.email;


        document.getElementById(
            "mobile"
        ).textContent =
            loggedInUser.mobile;


        document.getElementById(
            "voterId"
        ).textContent =
            loggedInUser.voterId;


        document.getElementById(
            "username"
        ).textContent =
            loggedInUser.username;


        document.getElementById(
            "state"
        ).textContent =
            loggedInUser.state;


        document.getElementById(
            "constituency"
        ).textContent =
            loggedInUser.constituency;


        document.getElementById(
            "address"
        ).textContent =
            loggedInUser.address;

    }

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "/login";

}


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logout
    );

}


const logoutButton2 =
    document.getElementById(
        "logoutButton2"
    );


if (logoutButton2) {

    logoutButton2.addEventListener(
        "click",
        logout
    );

}