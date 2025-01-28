const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const port = 3000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/frontend/dist")));

app.get("/", (req, res) => {
  console.log("GET /");
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/score", async (req, res) => {
  const { name, score } = req.body;

  const highScores = await prisma.score.findMany({
    orderBy: {
      score: "desc",
    },
    take: 10, // Use take to limit the number of results
  });

  console.log(highScores);

  if (score > highScores[highScores.length - 1]?.score) {
    highScores.pop();

    const newScore = await prisma.score.create({
      data: {
        name,
        score,
      },
    });

    console.log(newScore);

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
  }

  res.json(highScores);
});

app.get("/scores", async (req, res) => {
  const highScores = await prisma.score.findMany({
    orderBy: {
      score: "desc",
    },
    take: 10,
  });

  res.json(highScores);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
