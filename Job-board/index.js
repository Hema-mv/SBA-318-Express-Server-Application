const express = require("express");

const app = express();
const port = 3000;
const methodOverride = require('method-override');
//const bodyParser = require("body-parser");
const indexRoutes = require("./routes/index");
const error = require("./utilities/error");
const jobs = require("./routes/jobs");
const users = require("./routes/users");
const applications = require("./routes/applications");
// Override with the X-HTTP-Method-Override header in the request
 app.use(methodOverride('X-HTTP-Method-Override'));
  // Override with a query value in the request 
  app.use(methodOverride('_method'));


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// app.use(bodyParser.json());


app.use("/", indexRoutes);
app.use("/jobs", jobs);
app.use("/users", users);
app.use("/applications", applications);

app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
