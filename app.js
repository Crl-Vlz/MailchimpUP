const ex = require("express");
const request = require("request");
const https = require("https");

app = ex();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname);

app.use(ex.static("public"));

app.use(ex.json());

const API_KEY = "a4bd6a4520a50a2b79df450d92ae5cd4-us5";

const SERVER_PREFIX = "us5";

const LIST_ID = "65bbded74b";

const URL =
  "https://" + SERVER_PREFIX + ".api.mailchimp.com/3.0il/lists/" + LIST_ID;

app.use(ex.urlencoded({ extended: true }));

app.route;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.route("/").post((req, response) => {
  const fname = req.body.fName;
  const lname = req.body.lName;
  const email = req.body.email;

  const OPTIONS = {
    method: "POST",
    zvelcro: API_KEY,
  };

  var data = {
    members: [
      {
        email_adress: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  const name = "<li>item 1</li><li>item 2</li>";
  var mailRequest = https.request(URL, OPTIONS, (res) => {
    if (res === 200) {
      res
        .on("data", (data) => {
          var jsonResponse = JSON.parse(data);
          if (jsonResponse["error_count"] === 0) {
            response.render(__dirname + "/success.html", { name: name });
          } else {
            response.render(__dirname + "/failure.html", { name: name });
          }
        })
        .on("error", (err) => {
          response.render(__dirname + "/failure.html", { name: name });
        });
    } else {
      response.render(__dirname + "/failure.html", { name: name });
    }
  });

  mailRequest.write(jsonData);

  mailRequest.end();
});

app.get("/failure", (req, res) => {
  res.redirect("/");
});

app.get("/success", (req, res) => {
  res.redirect("/");
});

app.listen("3000", () => {
  console.log("Example app at port 3000");
});
