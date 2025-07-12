const serverUrl = "http://localhost:3000";
let userTurn = false;

async function startGame() {
  const userChoice = prompt("Heads or Tails?").toLowerCase();
  const coin = Math.random() < 0.5 ? "heads" : "tails";
  alert(`Coin landed on: ${coin}`);

  if (userChoice === coin) {
    userTurn = true;
  } else {
    userTurn = false;
  }
  // note : USE SHORTHAND BELOW INSTEAD OF THE IF_ELSE

  userTurn = userChoice === coin;
  document.getElementById("status").innerText = userTurn ? "You go first! Enter 1" : "Server goes first...";

  if (!userTurn) {
    const res = await fetch(`${serverUrl}/hob/move`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}, // need some explaination on this
      body: JSON.stringify({move: "START"}), // dummy data for server
    });
    const data = await res.json();
    if (data.serverMove) {
      document.getElementById("status").innerText = `Server says: ${data.serverMove}`;
    }
    userTurn = true;
  }
}

try {
  async function sendMove() {
    if (!userTurn) {
      alert("Wait! It's not your turn.");
      return;
    }

    const move = document.getElementById("userInput").value.trim();
    if (!move) return;

    const res = await fetch(`${serverUrl}/hob/move`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}, // need some explaination on this
      body: JSON.stringify({move}),
    });

    const data = await res.json();
    document.getElementById("status").innerText = data.message;

    if (data.message.includes("lost")) {
      alert("Game over!");
      return;
    }

    if (data.serverMove) {
      setTimeout(() => {
        document.getElementById("status").innerText = `Server says: ${data.serverMove}`;
      }, 800);
    }

    document.getElementById("userInput").value = "";
    userTurn = true;
  }
} catch (error) {
  console.log(error);
}

window.onload = startGame;
