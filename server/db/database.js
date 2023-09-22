const mysql2 = require('mysql2/promise');

async function createTable() {
  // get a connection
  const connection = await mysql2.createConnection({
    user: "school_database",
    password: "school_database",
    port: 3306,
    database: 'school_database'
  });

  try {
    // connect
    await connection.connect();

    const results1 = await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        className VARCHAR(255) NOT NULL,
        stream VARCHAR(255),
        address VARCHAR(255),
        city VARCHAR(255)
      );
    `);
    console.log(results1);

    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // close the connection
    await connection.end();
  }
}

// Call the createTable function
createTable();
