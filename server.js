const express = require("express");
const app = express();
const summs = require("./routes/api/summs");

// Use Routes
app.use("/api/summs", summs);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
