function generateBotReply(userMessage) {
  // Remove spaces to simplify parsing
  const message = userMessage.replace(/\s+/g, '');

  // Match simple calculations like 5+3, 10-2.5, etc.
  const calcMatch = message.match(/^(-?\d+(\.\d+)?)([\+\-\*\/])(-?\d+(\.\d+)?)$/);

  if (calcMatch) {
    const num1 = parseFloat(calcMatch[1]);
    const operator = calcMatch[3];
    const num2 = parseFloat(calcMatch[4]);
    let result;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) return "Error: Division by zero is not allowed.";
        result = num1 / num2;
        break;
      default:
        return "Hmm... I couldn't calculate that.";
    }

    return `The result is: ${result}`;
  }

  // NLP fallback responses
  const lower = userMessage.toLowerCase();
  if (lower.includes("hello")) return "Hello! How can I assist you today?";
  if (lower.includes("how are you")) return "I'm doing great, thanks for asking!";
  if (lower.includes("bye")) return "Goodbye! Have a nice day!";
  if (lower.includes("joke")) return "Why did the math book look sad? Because it had too many problems.";

  // Default fallback
  return "I didn't quite understand that. Can you try again?";
}
