const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running!!");
});

app.post("/university-finder", (req, res) => {
  const query = req.body.query;
  fetch(`http://universities.hipolabs.com/search?country=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("An error occured!!!");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      return res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        status: "error",
        data: data,
      });
    });
});

app.listen(5000, () => {
  console.log("Server is running!!");
});
