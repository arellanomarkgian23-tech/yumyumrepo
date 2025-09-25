import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.SPOONACULAR_API_KEY;

app.get("/api/recipes/search/", async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...req.query,
      apiKey,
    });

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
