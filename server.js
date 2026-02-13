const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword", // replace with your MySQL password
  database: "quizdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.use(express.json());
app.use(express.static("public")); // serve frontend files

// API endpoint to fetch questions
app.get("/api/questions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM questions LIMIT 1 OFFSET ?", [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const q = result[0];
      res.json({
        question: q.question_text,
        options: [q.option1, q.option2, q.option3, q.option4],
        correctIndex: q.correct_index
      });
    } else {
      res.json({ question: "Quiz finished!", options: [], correctIndex: -1 });
    }
  });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
