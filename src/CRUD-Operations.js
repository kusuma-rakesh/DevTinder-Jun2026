const express = require("express");
const app = express();
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const mConnStr = "mongodb://localhost:27017/";
const database = "AICS";
const db_collection = "clients_new";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res) => {
//   res.send("App is listening");
// });
app.get("/getClients", (req, res) => {
  mongoClient.connect(mConnStr).then((obj) => {
    const db = obj.db(database);
    db.collection(db_collection)
      .find({})
      .toArray()
      .then((result) => {
        res.send(result);
      });
  });
});

app.get("/queryClient", (req, res) => {
  mongoClient.connect(mConnStr).then((obj) => {
    const clName = req.query.name;
    const clCountry = req.query.country;
    console.log(`clName: ${clName} & clCountry: ${clCountry}`);

    const db = obj.db(database);
    if (clName) {
      db.collection(db_collection)
        .findOne({ name: clName })
        // .toArray()
        .then((result) => {
          res.send(result);
        });
    } else if (clCountry) {
      db.collection(db_collection)
        .find({ Country: clCountry })
        .toArray()
        .then((result) => {
          res.send(result);
        });
    }
  });
});

app.post("/addClient", (req, res) => {
  const newClient = {
    name: "Japanese",
    Country: "Japan",
    Size: "Large",
    "ELP Products": ["CrewRules", "CrewPoral"],
    Performance: "good",
    rating: 4.5,
  };
  mongoClient.connect(mConnStr).then((obj) => {
    const db = obj.db(database);
    db.collection(db_collection)
      .insertOne(newClient)
      // .toArray()
      .then((result) => {
        res.redirect("/getClients");
      });
  });
});

app.patch("/updateClient", (req, res) => {
  const clName = req.query.name;
  const clRating = req.query.rating;
  console.log(clName + "--" + clRating);

  const clsize = req.query.size;
  const clPerformance = req.query.Performance;
  if (clRating) {
    var rating = { rating: clRating };
  }
  if (clName) {
    mongoClient.connect(mConnStr).then((obj) => {
      const db = obj.db(database);
      db.collection(db_collection)
        .updateOne({ name: clName }, { $set: rating })
        // .toArray()
        .then((result) => {
          res.redirect("/getClients");
        });
    });
  }
});

app.delete("/deleteClient", (req, res) => {
  const clName = req.query.name;

  if (clName) {
    mongoClient.connect(mConnStr).then((obj) => {
      const db = obj.db(database);
      db.collection(db_collection)
        .deleteOne({ name: clName })
        // .toArray()
        .then((result) => {
          res.redirect("/getClients");
        });
    });
  }
});

app.get("/getSpecColumns", (req, res) => {
  const clName = req.query.name;
  const fieldsList = req.query.fields?.split(",");

  const projection = {};
  fieldsList.forEach((x) => {
    projection[x] = 1;
  });

  const clColumnList = req.query.columns;
  mongoClient.connect(mConnStr).then((obj) => {
    const db = obj.db(database);
    if (clName) {
      //&& clColumnList) {
      db.collection(db_collection)
        .findOne({ name: clName }, { projection })
        // .toArray()
        .then((result) => {
          res.send(result);
        });
    }
  });
});
app.listen(7777, () => {
  console.log("application is running on port 7777");
});
