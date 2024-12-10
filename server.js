const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

app.get("/vacancies", (req, res) => {
  // const page = parseInt(req.query.page) || 0;
  // const perPage = parseInt(req.query.perPage) || 10;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData.vacancies);
  });
});

app.get("/test/:vacancyId", (req, res) => {
  const vacancyId = req.params.vacancyId;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const vacancies = jsonData.vacancies || [];

    const filteredVacancies = vacancies.filter(
      (vacancy) => vacancy.id === vacancyId
    );

    if (filteredVacancies.length === 0) {
      res.status(404).send("Vacancy not found");
      return;
    }

    res.status(200).json(filteredVacancies[0].questions);
  });
});

app.get("/vacancy/:vacancyId", (req, res) => {
  const vacancyId = req.params.vacancyId;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const vacancies = jsonData.vacancies || [];

    const filteredVacancies = vacancies.filter(
      (vacancy) => vacancy.id === vacancyId
    );

    if (filteredVacancies.length === 0) {
      res.status(404).send("Vacancy not found");
      return;
    }

    res.status(200).json(filteredVacancies[0]);
  });
});

app.post("/upload", (req, res) => {
  // Simulate a 2-second delay
  setTimeout(() => {
    res.status(200).send({
      message: "File uploaded successfully (mocked)!",
      status: "success",
    });
  }, 2000); // 2 seconds delay
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
