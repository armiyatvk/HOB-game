const socket = io();

let userTurn = true;

socket.on("connected", (msg) => {
  console.log("it did work", msg);
});

const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");
const input = document.getElementById("input");
const input2 = document.getElementById("input2");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const msg = input.value;

  if (!msg) return;

  if (userTurn) {
    socket.emit("userNum", msg);
    input2.value = "";
    userTurn = false;
  }
});

socket.on("serverNum", (msg) => {
  input2.value = msg;
  userTurn = true;
});

socket.on("gameOver", (msg) => {
  input2.value = msg;
});

resetBtn.addEventListener("click", () => {
  socket.emit("restart");
  location.reload();
});
