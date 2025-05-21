// Jerry Calculation Chabot script.js

const expressionInput = document.getElementById("expression");
const chatBox = document.getElementById("chat-box");
const toggleModeBtn = document.getElementById("toggle-mode");

// Append button value to the input box
function appendToExpression(value) {
  expressionInput.value += value;
}

// Clear the input box
function clearExpression() {
  expressionInput.value = "";
}

// Handle user input when "=" button is clicked
function handleInput() {
  const input = expressionInput.value.trim();
  if (input === "") return;

  const mathExpression = convertToMath(input);

  try {
    const result = eval(mathExpression);
    addChatMessage(`You: ${input}`);
    addChatMessage(`Jerry: ${result}`);
    expressionInput.value = "";
  } catch {
    addChatMessage(`Jerry: I didn't quite understand that. Try again.`);
  }
}

// Convert word problems to math expressions
function convertToMath(sentence) {
  return sentence
    .toLowerCase()
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .replace(/times|multiplied by/g, "*")
    .replace(/divided by|over/g, "/")
    .replace(/what is|calculate|find|answer to/g, "")
    .replace(/[^0-9+\-*/.() ]/g, "");
}

// Add message to the chat display
function addChatMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "chat-message";
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Clear all chat messages
function clearChat() {
  chatBox.innerHTML = "";
}

// Download chat history as a .txt file
function downloadChat() {
  const content = chatBox.textContent;
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Jerry_chat_history.txt";
  link.click();
}

// Toggle light/dark mode
toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
