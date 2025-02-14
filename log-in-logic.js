document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Fixed username and password
    const correctUsername = "Leivi";
    const correctPassword = "212324";
    const guestUsername = "guest";
    const guestPassword = "guest";

    if (username === correctUsername && password === correctPassword) {
        // Redirect to the next page
        window.location.href = "./card/card.html";
    } else if (username == guestUsername && password == guestPassword) {
        window.location.href = "./guest/guest.html";
    } else {
        message.textContent = "Invalid username or password. Please try again.";
        message.style.color = "red";
    }
});