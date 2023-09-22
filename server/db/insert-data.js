const mysql2 = require('mysql2/promise');

async function createStudent() {
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
    INSERT INTO students (name, className, stream, address, city)
    VALUES
      ('Student 1', 'Class 1A', 'Stream A', 'Address 1', 'City 1'),
      ('Student 2', 'Class 1B', 'Stream B', 'Address 2', 'City 2'),
      ('Student 3', 'Class 2A', 'Stream A', 'Address 3', 'City 3'),
      ('Student 4', 'Class 2B', 'Stream B', 'Address 4', 'City 4'),
      ('Student 5', 'Class 3A', 'Stream A', 'Address 5', 'City 5'),
      ('Student 6', 'Class 3B', 'Stream B', 'Address 6', 'City 6'),
      ('Student 7', 'Class 4A', 'Stream A', 'Address 7', 'City 7'),
      ('Student 8', 'Class 4B', 'Stream B', 'Address 8', 'City 8'),
      ('Student 9', 'Class 5A', 'Stream A', 'Address 9', 'City 9'),
      ('Student 10', 'Class 5B', 'Stream B', 'Address 10', 'City 10'),
      ('Student 11', 'Class 6A', 'Stream A', 'Address 11', 'City 11'),
      ('Student 12', 'Class 6B', 'Stream B', 'Address 12', 'City 12'),
      ('Student 13', 'Class 7A', 'Stream A', 'Address 13', 'City 13'),
      ('Student 14', 'Class 7B', 'Stream B', 'Address 14', 'City 14'),
      ('Student 15', 'Class 8A', 'Stream A', 'Address 15', 'City 15'),
      ('Student 16', 'Class 8B', 'Stream B', 'Address 16', 'City 16'),
      ('Student 17', 'Class 9A', 'Stream A', 'Address 17', 'City 17'),
      ('Student 18', 'Class 9B', 'Stream B', 'Address 18', 'City 18'),
      ('Student 19', 'Class 10A', 'Stream A', 'Address 19', 'City 19'),
      ('Student 20', 'Class 10B', 'Stream B', 'Address 20', 'City 20'),
      ('Student 21', 'Class 11A', 'Stream A', 'Address 21', 'City 21'),
      ('Student 22', 'Class 11B', 'Stream B', 'Address 22', 'City 22'),
      ('Student 23', 'Class 12A', 'Stream A', 'Address 23', 'City 23'),
      ('Student 24', 'Class 12B', 'Stream B', 'Address 24', 'City 24'),
      ('Student 25', 'Class 13A', 'Stream A', 'Address 25', 'City 25'),
      ('Student 26', 'Class 13B', 'Stream B', 'Address 26', 'City 26'),
      ('Student 27', 'Class 14A', 'Stream A', 'Address 27', 'City 27'),
      ('Student 28', 'Class 14B', 'Stream B', 'Address 28', 'City 28'),
      ('Student 29', 'Class 15A', 'Stream A', 'Address 29', 'City 29'),
      ('Student 30', 'Class 15B', 'Stream B', 'Address 30', 'City 30'),
      ('Student 31', 'Class 16A', 'Stream A', 'Address 31', 'City 31'),
      ('Student 32', 'Class 16B', 'Stream B', 'Address 32', 'City 32'),
      ('Student 33', 'Class 17A', 'Stream A', 'Address 33', 'City 33'),
      ('Student 34', 'Class 17B', 'Stream B', 'Address 34', 'City 34'),
      ('Student 35', 'Class 18A', 'Stream A', 'Address 35', 'City 35'),
      ('Student 36', 'Class 18B', 'Stream B', 'Address 36', 'City 36'),
      ('Student 37', 'Class 19A', 'Stream A', 'Address 37', 'City 37'),
      ('Student 38', 'Class 19B', 'Stream B', 'Address 38', 'City 38'),
      ('Student 39', 'Class 20A', 'Stream A', 'Address 39', 'City 39'),
      ('Student 40', 'Class 20B', 'Stream B', 'Address 40', 'City 40');    
    `);
    console.log(results1);

    console.log('Student created successfully');
  } catch (error) {
    console.error('Error creating student:', error);
  } finally {
    // close the connection
    await connection.end();
  }
}

// Call the createStudent function
createStudent();
