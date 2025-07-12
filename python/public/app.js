document.getElementById("sendBtn").addEventListener("click", async () => {
  const move = document.getElementById("userInput").value.trim();

  const res = await fetch("http://localhost:8000/hob/move", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({move}),
  });

  const data = await res.json();
  document.getElementById("status").innerText = data.message;
});
