const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");

const summs = require("./routes/api/summs");
const matches = require("./routes/api/matches");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use Routes
app.use("/api/summs", summs);
app.use("/api/matches", matches);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const serverStartTime = new Date();

app.listen(port, () =>
  console.log(`Server running on port ${port} at ${serverStartTime}`)
);
