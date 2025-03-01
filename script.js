function sendMessage() {
    let userMessage = document.getElementById("user-input").value.trim();
    let chatBox = document.getElementById("chat-box");

    if (userMessage === "") return; // Prevent empty messages

    // Append user message to chat
    chatBox.innerHTML += `<div class="user-message">You: ${userMessage}</div>`;

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to the server
    fetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        // Append bot's response
        chatBox.innerHTML += `<div class="bot-message">Aahir: ${data.reply}</div>`;

        // Auto-scroll to latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => console.error("Error:", error));

    // Clear input field
    document.getElementById("user-input").value = "";
}
