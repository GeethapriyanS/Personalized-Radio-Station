const express = require("express");
const RadioBrowser = require("radio-browser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/api/stations", async (req, res) => {
  try {
    const { by = "tag", searchterm = "jazz", limit = 10 } = req.query;

    const filter = {
      by,         
      searchterm,  
      limit: parseInt(limit, 10), 
    };

    const stations = await RadioBrowser.getStations(filter);
    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error.message);
    res.status(500).json({ error: "Failed to fetch stations" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
