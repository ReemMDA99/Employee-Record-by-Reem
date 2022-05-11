const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const PORT = process.env.PORT || 3002;

// Not Found response for unmatched routes
app.use((req, res) => {
    res.status(404).end();
  });
  
  // Start server after DB connection
  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });