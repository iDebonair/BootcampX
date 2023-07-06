const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const values = `%${cohortName}%`;

pool.query(
`SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohorts.id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`,
[values])
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${cohortName}:`, teacher.teacher);
  });
})
.catch(err => {
  console.error('query error', err.stack);
});