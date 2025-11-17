// Import the express module
import express from 'express';

// Import mysql2
import mysql2 from 'mysql2';

// Import dotenv
import dotenv from 'dotenv';
dotenv.config();

// Create an instance of an Express application
const app = express();

// Creating a mysql connection pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a port number where our server will listen
const PORT = 3011;

//const contacts = [];

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
app.get("/admin", async (req, res) => {
  try {
    const [contacts] = await pool.query("SELECT * FROM contacts ORDER BY timestamp DESC");
    res.render("admin", { contacts });
  } catch (err) {
    console.error("DB READ ERROR:", err);
    res.status(500).send("Cannot load contacts");
  }  
});

app.get('/db-test', async (req, res)=> {
  try {
    const [rows] = await pool.query("SELECT * FROM contacts");
    res.json(rows);
  } catch (err) {
    res.statusCode(500).end("DB ERROR: " + err.message);
  }
})

// Handle POST requests sent to the "/submit" route
app.post("/submit", async (req, res) => {
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
    timestamp: new Date()
  };

  try {
    await pool.query(
      `INSERT INTO contacts
      (fname, lname, jtitle, company, linkedin, email, connection, other, message, timestamp)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        contact.fname,
        contact.lname,
        contact.jtitle,
        contact.company,
        contact.linkedin,
        contact.email,
        contact.connection,
        contact.other,
        contact.message,
        contact.timestamp
      ]
    );

    // Push contact into the array
    //contacts.push(contact);
    console.log("New contact:", contact);

    // Redirect to confirmation page
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    res.render('confirmation', { contact });
  } catch (err) {
    console.error("DB INSERT ERROR:", err);
    res.status(500).send("Database insert failed");
  }  
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});