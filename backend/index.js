import express from "express"

const app = express();

app.get("/words/random", async (req, res) => {
  try {
    const response = await fetch("https://darkermango.github.io/5-Letter-words/words.json");
    if (!response.ok) {
      return res.sendStatus(response.status);
    }
    const result = await response.json();
    const rand = Math.floor(Math.random() * result.words.length);
    return res.status(200).send({ word: result.words[rand] });
  }
  catch (error) {
    return res.status(500).send({ error });
  }
})

app.listen(3000, () => {
  console.log("Connected to backend");
})