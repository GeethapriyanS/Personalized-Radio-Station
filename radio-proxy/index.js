const express = require("express");
const cors = require("cors");
const { RadioBrowserApi } = require("radio-browser-api"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/stations", async (req, res) => {
  try {
    const { language = "english", tag = "all", limit = 15 } = req.query;

    const api = new RadioBrowserApi(fetch.bind(global), "My Radio App", true);
    api.getBaseUrl = "https://all.api.radio-browser.info";

    const stations = await api.searchStations({
      language,
      tag: tag === "all" ? "" : tag, 
      limit: parseInt(limit, 10),
    });

    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error.message);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
