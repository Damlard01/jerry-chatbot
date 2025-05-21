const expressionInput = document.getElementById("expression");
const chatBox = document.getElementById("chat-box");
const toggleModeBtn = document.getElementById("toggle-mode");
const toggleSciBtn = document.getElementById("toggle-scientific");
const sciPanel = document.getElementById("scientific-panel");

function appendToExpression(v) { expressionInput.value += v; }
function clearExpression() { expressionInput.value = ""; }
function clearChat() { chatBox.innerHTML = ""; }
function addChatMessage(m) {
  const d = document.createElement("div");
  d.className = "chat-message"; d.textContent = m;
  chatBox.appendChild(d); chatBox.scrollTop = chatBox.scrollHeight;
}
function downloadChat() {
  const b = new Blob([chatBox.textContent], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(b); a.download = "jerry_chat_history.txt"; a.click();
}
function convertToMath(s) {
  const toRad = d => d * Math.PI / 180;
  return s.toLowerCase()
    .replace(/plus/g, "+").replace(/minus/g, "-").replace(/times|multiplied by/g, "*")
    .replace(/divided by|over/g, "/")
    .replace(/sine of ([0-9.]+)/g, (_, n) => `Math.sin(${toRad(n)})`)
    .replace(/cosine of ([0-9.]+)/g, (_, n) => `Math.cos(${toRad(n)})`)
    .replace(/cos of ([0-9.]+)/g, (_, n) => `Math.cos(${toRad(n)})`)
    .replace(/tan of ([0-9.]+)/g, (_, n) => `Math.tan(${toRad(n)})`)
    .replace(/square root of ([0-9.]+)/g, (_, n) => `Math.sqrt(${n})`)
    .replace(/sqrt\\(([0-9.]+)\\)/g, (_, n) => `Math.sqrt(${n})`)
    .replace(/([0-9.]+)\\^([0-9.]+)/g, (_, b, e) => `Math.pow(${b},${e})`)
    .replace(/([0-9.]+)²/g, (_, n) => `Math.pow(${n},2)`)
    .replace(/log\\(([^)]+)\\)/g, (_, x) => `Math.log10(${x})`)
    .replace(/ln\\(([^)]+)\\)/g, (_, x) => `Math.log(${x})`)
    .replace(/e\\^([^)]+)/g, (_, x) => `Math.exp(${x})`)
    .replace(/10\\^([^)]+)/g, (_, x) => `Math.pow(10,${x})`)
    .replace(/what is|calculate|find|answer to/g, "")
    .replace(/[^0-9+\\-*/(). MathsqrtpowlogexpEPIsinco tan]/g, "");
}
function handleInput() {
  const input = expressionInput.value.trim();
  if (!input) return;
  const expr = convertToMath(input);
  try {
    const result = eval(expr);
    addChatMessage(`You: ${input}`);
    addChatMessage(`Jerry: ${result}`);
    expressionInput.value = "";
  } catch {
    addChatMessage("Jerry: I didn't quite understand that. Try again.");
  }
}
toggleModeBtn.onclick = () => document.body.classList.toggle("dark-mode");
toggleSciBtn.onclick = () => sciPanel.classList.toggle("hidden");
