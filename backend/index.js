import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"

const app = express();
dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production"
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_BASE,
  credentials: true
}))

const fetchWords = async () => {
  try {
    const response = await fetch("https://darkermango.github.io/5-Letter-words/words.json");
    if (!response.ok) {
      return res.sendStatus(response.status);
    }
    const result = await response.json();
    return result.words
  }
  catch (error) {
    return res.status(500).send({ error });
  }
}

app.get("/words/random", async (req, res) => {
  const words = await fetchWords();
  const rand = Math.floor(Math.random() * words.length);
  res.cookie("word", words[rand]);
  return res.status(200).send({ word: words[rand] });
})

app.post("/words/check", async (req, res) => {
  const target = req.cookies.word;
  if (!target) { return res.status(400).send({ error: "You don't have a target word!" }); }

  const { guess } = req.body;
  const words = await fetchWords();
  if (!words.includes(guess)) { return res.status(400).send({ error: "Not in word list" }) };

  const count = {};
  for (const letter of target) {
    count[letter] = (count[letter] || 0) + 1;
  }

  const result = new Array(5);
  for (let i = 0; i < 5; i++) { //check if the letters are in the correct position first
    if (guess[i] === target[i]) {
      result[i] = "green";
      count[guess[i]]--;
    }
  }
  for (let i = 0; i < 5; i++) { // then check if the leftover letters are still in the target word
    if (!result[i]) {
      result[i] = count[guess[i]] > 0 ? "yellow" : "gray";
      count[guess[i]]--;
    }
  }

  return res.send({ colors: result });
})

app.listen(3000, () => {
  console.log("Connected to backend");
})