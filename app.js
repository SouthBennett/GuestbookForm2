// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a port number where our server will listen
const PORT = 3011;

const contacts = [];

// Allow the app to parse form data
app.use(express.urlencoded({extended: true }));

// Enable static file serving
app.use(express.static('public'));

// Define a default route - display resume (home page)
app.get('/', (req, res) => {
  // res.sendFile(`${import.meta.dirname}/views/home.html`);
  res.render('resume');
});

app.get("/contact", (req, res) => {
  res.render('home');
});

//Confirmation route
app.get("/confirmation", (req, res) => {
  // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
  res.render('confirmation');
});

//admin route
app.get("/admin", (req, res) => {
  res.render("admin", { contacts });
});

// Handle POST requests sent to the "/submit" route
app.post("/submit", (req, res) => {
  // Create a new object called "contact" to store the form data
  const contact = {
    fname: req.body.fname,
    lname: req.body.lname,
    jtitle: req.body.jtitle,
    company: req.body.company,
    linkedin: req.body["linkedin-url"],
    email: req.body.email,
    connection: req.body.connection,
    other: req.body.other,
    message: req.body.message,
    timestamp: new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}),
  };

  // Push contact into the array
  contacts.push(contact);
  console.log("New contact:", contact);

  // Redirect to confirmation page
  //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
  res.render('confirmation', { contact });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});