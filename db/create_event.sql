INSERT INTO events (user_id, address, city, state, zipcode, date, start_time, end_time, event_name, paid)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING event_id;