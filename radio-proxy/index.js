const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

const BASE_URL = "https://de1.api.radio-browser.info"; 

app.get("/api/stations", async (req, res) => {
  try {
    const { language = "english", tag = "all", limit = 15 } = req.query;

    const response = await axios.get(`${BASE_URL}/json/stations/search`, {
      params: { language, tag, limit },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
