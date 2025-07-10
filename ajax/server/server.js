const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "hob-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Serve frontend from /public
app.use(express.static(path.join(__dirname, "../public")));

// Game state logic
app.use((req, res, next) => {
  if (!req.session.counter) req.session.counter = 1;
  next();
});

app.post("/hob/move", (req, res) => {
  const userMove = req.body.move;
  const expected = req.session.counter % 5 === 0 ? "HOB" : String(req.session.counter);

  if (userMove !== expected && userMove !== "START") {
    return res.json({message: `Wrong! Expected "${expected}". You lost.`, serverMove: null});
  }

  if (userMove !== "START") req.session.counter++;

  const serverMove = req.session.counter % 5 === 0 ? "HOB" : String(req.session.counter);
  req.session.counter++;

  return res.json({message: `You said: ${userMove}`, serverMove});
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
