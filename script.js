const expressionInput = document.getElementById("expression");
const chatBox = document.getElementById("chat-box");
const toggleModeBtn = document.getElementById("toggle-mode");

function appendToExpression(value) {
  expressionInput.value += value;
}

function clearExpression() {
  expressionInput.value = "";
}

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

function convertToMath(sentence) {
  const toRadians = (deg) => deg * Math.PI / 180;
  let s = sentence.toLowerCase();

  s = s.replace(/plus/g, "+")
       .replace(/minus/g, "-")
       .replace(/times|multiplied by/g, "*")
       .replace(/divided by|over/g, "/")
       .replace(/sine of ([0-9.]+)/g, (_, n) => `Math.sin(${toRadians(Number(n))})`)
       .replace(/cosine of ([0-9.]+)/g, (_, n) => `Math.cos(${toRadians(Number(n))})`)
       .replace(/cos of ([0-9.]+)/g, (_, n) => `Math.cos(${toRadians(Number(n))})`)
       .replace(/tan of ([0-9.]+)/g, (_, n) => `Math.tan(${toRadians(Number(n))})`)
       .replace(/square root of ([0-9.]+)/g, (_, n) => `Math.sqrt(${n})`)
       .replace(/sqrt\\(([0-9.]+)\\)/g, (_, n) => `Math.sqrt(${n})`)
       .replace(/([0-9.]+)\\^([0-9.]+)/g, (_, base, exp) => `Math.pow(${base},${exp})`)
       .replace(/([0-9.]+)²/g, (_, n) => `Math.pow(${n},2)`)
       .replace(/what is|calculate|find|answer to/g, "")
       .replace(/[^0-9+\\-*/(). Mathsqrtpowsinco tan]/g, "");

  return s;
}

function addChatMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "chat-message";
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
  chatBox.innerHTML = "";
}

function downloadChat() {
  const content = chatBox.textContent;
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "jerry_chat_history.txt";
  link.click();
}

toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
