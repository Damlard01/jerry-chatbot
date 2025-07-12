const expressionInput = document.getElementById("expression");
const chatBox = document.getElementById("chat-box");
const toggleModeBtn = document.getElementById("toggle-mode");
const toggleSciBtn = document.getElementById("toggle-scientific");
const sciPanel = document.getElementById("scientific-panel");

let variables = {};

function appendToExpression(value) {
  expressionInput.value += value;
}

function clearExpression() {
  expressionInput.value = "";
  expressionInput.classList.remove("error");
}

function handleInput() {
  const input = expressionInput.value.trim();
  if (!input) return;

  const { mathExpression, explanation } = convertToMath(input);

  try {
    const result = eval(mathExpression);
    addChatMessage(`You: ${input}`);
    addChatMessage(`Jerry: ${result}`);
    if (explanation) {
      addChatMessage(`🤖 Explanation: ${explanation}`);
    }
    expressionInput.value = "";
    expressionInput.classList.remove("error");
  } catch (e) {
    addChatMessage(`Jerry: I couldn't understand or evaluate that.`);
    expressionInput.classList.add("error");
  }
}

function convertToMath(input) {
  let explanation = "";
  let s = input.toLowerCase().trim();

  // Variable assignment
  if (/([a-z])\s*=\s*([0-9.]+)/.test(s)) {
    const [, varName, value] = s.match(/([a-z])\s*=\s*([0-9.]+)/);
    variables[varName] = parseFloat(value);
    explanation = `Stored variable ${varName} = ${value}`;
    return { mathExpression: "0", explanation };
  }

  for (const v in variables) {
    s = s.replaceAll(new RegExp(`\\b${v}\\b`, 'g'), variables[v]);
  }

  s = s.replace(/plus/g, "+")
       .replace(/minus/g, "-")
       .replace(/times|multiplied by/g, "*")
       .replace(/divided by|over/g, "/")
       .replace(/mod/g, "%")
       .replace(/rand\(\)/g, "Math.random()")
       .replace(/([0-9]+)!/g, (_, n) => `factorial(${n})`)
       .replace(/([0-9.]+)\^2/g, (_, n) => `Math.pow(${n},2)`)
       .replace(/([0-9.]+)\^3/g, (_, n) => `Math.pow(${n},3)`)
       .replace(/\|([^)]+)\|/g, (_, n) => `Math.abs(${n})`)
       .replace(/square root of ([0-9.]+)/g, (_, n) => `Math.sqrt(${n})`)
       .replace(/sqrt\(([^)]+)\)/g, (_, n) => `Math.sqrt(${n})`)
       .replace(/log\(([^)]+)\)/g, (_, x) => `Math.log10(${x})`)
       .replace(/ln\(([^)]+)\)/g, (_, x) => `Math.log(${x})`)
       .replace(/e\^([^)]+)/g, (_, x) => `Math.exp(${x})`)
       .replace(/10\^([^)]+)/g, (_, x) => `Math.pow(10,${x})`)
       .replace(/what is|calculate|find|answer to/g, "")
       .replace(/[^\d+\-*/().%|! a-zA-Z]/g, "")
       .replace(/\s+/g, "");

  if (s.includes("Math.pow(")) explanation = "Using power/exponentiation";
  else if (s.includes("Math.sqrt(")) explanation = "Finding the square root";
  else if (s.includes("factorial")) explanation = "Calculating factorial";
  else if (s.includes("Math.random()")) explanation = "Generating random number";
  else if (s.includes("Math.abs(")) explanation = "Getting absolute value";
  else if (Object.keys(variables).length > 0) explanation = "Used stored variables";

  return { mathExpression: s, explanation };
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function addChatMessage(message) {
  const msg = document.createElement("div");
  msg.className = "chat-message";
  msg.textContent = message;
  chatBox.appendChild(msg);
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

toggleSciBtn.addEventListener("click", () => {
  sciPanel.classList.toggle("hidden");
});
