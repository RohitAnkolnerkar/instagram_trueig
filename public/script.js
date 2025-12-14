const backendUrl = "http://localhost:3000";

// this function is used to register a new user
function signup() {
    alert("signup clicked");

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    fetch(backendUrl + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert("Server response: " + data.message);
    });
}


// this function checks login and redirects to feed page
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch(backendUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert("Server response: " + data.message);
        if (data.success) {
            window.location.href = "feed.html";
        }
    });
}

function createPost() {
    const text = document.getElementById("postText").value;

    fetch(backendUrl + "/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => alert("Server response: " + data.message));

}

if (document.getElementById("posts")) {
    fetch(backendUrl + "/posts")
        .then(res => res.json())
        .then(posts => {
            const div = document.getElementById("posts");
            div.innerHTML = "";
            posts.forEach(p => {
                const el = document.createElement("p");
                el.innerText = p.text;
                div.appendChild(el);
            });
        });
}
