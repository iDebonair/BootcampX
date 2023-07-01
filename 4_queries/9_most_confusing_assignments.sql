SELECT assignments.id, assignments.name, assignments.day, chapter, COUNT(assistance_requests.assignment_id) AS total_requests
FROM assignments
JOIN assistance_requests ON assignments.id = assistance_requests.assignment_id
GROUP BY assignments.id, assignments.name, assignments.day, chapter
ORDER BY total_requests DESC;
