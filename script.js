// Dark/Light Mode Toggle
const modeToggle = document.getElementById("mode-toggle");

// Set default mode to dark (for first-time visitors)
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
  document.body.classList.remove('light-mode');
} else {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    modeToggle.innerHTML = "🌙";  // Dark Mode icon
  } else {
    document.body.classList.remove('light-mode');
    modeToggle.innerHTML = "☀️";  // Light Mode icon
  }
}

modeToggle.addEventListener("click", function() {
  // Toggle the "light-mode" class on the body element
  document.body.classList.toggle("light-mode");

  // Update the local storage based on the current mode
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem('theme', 'light');
    modeToggle.innerHTML = "🌙";  // Dark Mode icon
  } else {
    localStorage.setItem('theme', 'dark');
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

// Example bot reply function with basic NLP
function generateBotReply(userMessage) {
  // Lowercase message for simplicity
  const message = userMessage.toLowerCase();
  
  if (message.includes("hello")) {
    return "Hello! How can I assist you today?";
  } else if (message.includes("how are you")) {
    return "I'm doing great, thanks for asking! How about you?";
  } else if (message.includes("bye")) {
    return "Goodbye! Have a nice day!";
  } else if (message.includes("tell me a joke")) {
    return "Why don't skeletons fight each other? They don't have the guts!";
  } else {
    return "I'm not sure what you mean. Could you try again?";
  }
}

// Export chat history as a .txt file
const exportButton = document.getElementById("export-chat");

exportButton.addEventListener("click", function() {
  const messages = document.querySelectorAll(".user-message, .bot-message");
  let chatHistory = "";

  messages.forEach((message) => {
    chatHistory += `${message.classList.contains('user-message') ? "User: " : "Bot: "} ${message.textContent}\n`;
  });

  // Create a Blob from the chat history and download it as a .txt file
  const blob = new Blob([chatHistory], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chat_history.txt";
  link.click();
});
