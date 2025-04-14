// Initialize memory (chat history array)
let chatHistory = [];

document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const userText = input.value.trim();
  if (userText === "") return;

  // Add user message to history and display it
  addMessage(userText, "user-message");
  chatHistory.push({ user: userText });

  // Try to calculate
  try {
    let result = solve(userText);
    addMessage("Jerry: " + result, "bot-message");
    chatHistory.push({ bot: result });
  } catch (error) {
    addMessage("Jerry: I couldn't understand that. Try something like 2 + 2 or x^2 + 5x + 6 = 0", "bot-message");
  }

  input.value = "";
  document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
});

// Add message to the chat
function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerText = text;
  document.getElementById("chat-box").appendChild(msg);
}

// Solve calculation or equation
function solve(input) {
  input = input.replace(/\s+/g, '');

  // Equation solving (very basic)
  if (input.includes("=")) {
    let [lhs, rhs] = input.split("=");
    if (lhs.includes("x^2")) {
      // Solve quadratic like x^2+5x+6=0
      const match = lhs.match(/([-+]?\d*)x\^2([-+]?\d*)x([-+]?\d*)/);
      if (match) {
        const a = parseFloat(match[1] || 1);
        const b = parseFloat(match[2] || 1);
        const c = parseFloat(match[3] || 0);
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) return "No real roots.";
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return `The solutions are x = ${root1} and x = ${root2}`;
      }
    }
    return "I can only solve simple quadratics like x^2+5x+6=0";
  }

  // Simple calculations
  return eval(input);
}
