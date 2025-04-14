// Dark/Light Mode Toggle
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", function() {
  // Toggle the "light-mode" class on the body element
  document.body.classList.toggle("light-mode");

  // Change button icon based on mode
  if (document.body.classList.contains("light-mode")) {
    modeToggle.innerHTML = "🌙";  // Dark Mode icon
  } else {
    modeToggle.innerHTML = "☀️";  // Light Mode icon
  }
});

// Chatbot logic
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const chatForm = document.getElementById("chat-form");

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const userMessage = userInput.value.trim();
  if (userMessage !== "") {
    // Add user message to chat box
    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("user-message");
    userMessageElement.textContent = userMessage;
    chatBox.appendChild(userMessageElement);
    
    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    userInput.value = "";

    // Bot reply (simple example)
    setTimeout(() => {
      const botMessageElement = document.createElement("div");
      botMessageElement.classList.add("bot-message");
      botMessageElement.textContent = "Jerry says: " + generateBotReply(userMessage);
      chatBox.appendChild(botMessageElement);
      
      // Scroll to the latest message
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
});

// Example bot reply function
function generateBotReply(userMessage) {
  // Simple response logic (can be enhanced)
  if (userMessage.toLowerCase().includes("hello")) {
    return "Hello! How can I assist you today?";
  } else if (userMessage.toLowerCase().includes("bye")) {
    return "Goodbye! Have a nice day!";
  } else {
    return "I didn't quite understand that. Can you try again?";
  }
}
