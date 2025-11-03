const terminalBlock = document.getElementById("terminal-block");
const inputLine = document.getElementById("input-line");
const terminalInput = document.getElementById("terminal-input");

// ASCII Banner for CHIN
const asciiBanner = [
"   █████████  █████   █████ █████ ██████   █████",
"  ███░░░░░███░░███   ░░███ ░░███ ░░██████ ░░███ ",
" ███     ░░░  ░███    ░███  ░███  ░███░███ ░███ ",
"░███          ░███████████  ░███  ░███░░███░███ ",
"░███          ░███░░░░░███  ░███  ░███ ░░██████ ",
"░░███     ███ ░███    ░███  ░███  ░███  ░░█████ ",
" ░░█████████  █████   █████ █████ █████  ░░█████",
"  ░░░░░░░░░  ░░░░░   ░░░░░ ░░░░░ ░░░░░    ░░░░░ "
];

const welcomeMessage = "Welcome to Votrez Chin's terminal. Type 'help' to begin.";

// Function to type array of lines sequentially
function typeLines(lines, idx = 0, callback) {
  if (idx >= lines.length) {
    if (callback) callback();
    return;
  }
  let line = lines[idx];
  let charIndex = 0;
  function typeChar() {
    if (charIndex < line.length) {
      terminalBlock.innerText += line.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 20);
    } else {
      terminalBlock.innerText += "\n";
      typeLines(lines, idx + 1, callback);
    }
  }
  typeChar();
}

// Type the banner first, then welcome message
typeLines(asciiBanner, 0, () => {
  let charIndex = 0;
  function typeWelcome() {
    if (charIndex < welcomeMessage.length) {
      terminalBlock.innerText += welcomeMessage.charAt(charIndex);
      charIndex++;
      setTimeout(typeWelcome, 30);
    } else {
      terminalBlock.innerText += "\n";
      inputLine.style.display = "flex";
      terminalInput.focus();
    }
  }
  typeWelcome();
});

// Handle Enter key in terminal input
terminalInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const command = terminalInput.innerText.trim();
    terminalInput.innerText = ""; // clear input

    // Append command to terminal
    terminalBlock.innerText += `$guest@Votrez-chin.github.io: ${command}\n`;

    // Handle commands
    let response = "";
    switch (command.toLowerCase()) {
      case "help":
        response = "Available commands: help, projects, github";
        break;
      case "projects":
        response = "Mathematics | Photography | Others";
        break;
      case "github":
        response = "https://github.com/Votrez-Chin";
        break;
      default:
        response = `Command not found: ${command}`;
    }

    terminalBlock.innerText += response + "\n";
    terminalBlock.scrollTop = terminalBlock.scrollHeight;
  }
});

// Focus input on terminal click
document.querySelector('.terminal').addEventListener('click', () => {
  terminalInput.focus();
});
