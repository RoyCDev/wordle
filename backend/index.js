import express from "express"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/words/random", async (req, res) => {
  try {
    const response = await fetch("https://darkermango.github.io/5-Letter-words/words.json");
    if (!response.ok) {
      return res.sendStatus(response.status);
    }
    const result = await response.json();

    const rand = Math.floor(Math.random() * result.words.length);
    res.cookie("word", result.words[rand]);
    return res.status(200).send({ word: result.words[rand] });
  }
  catch (error) {
    return res.status(500).send({ error });
  }
})

app.post("/words/check", async (req, res) => {
  const target = req.cookies.word;
  const { guess } = req.body;

  const count = {};
  for (const letter of target) {
    count[letter] = (count[letter] || 0) + 1;
  }

  const result = new Array(5);
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      result[i] = "green"
    }
    else if (count[guess[i]] > 0) {
      result[i] = "yellow"
    }
    else {
      result[i] = "gray"
    }

    count[guess[i]]--;
  }

  return res.send({ result });
})

app.listen(3000, () => {
  console.log("Connected to backend");
})