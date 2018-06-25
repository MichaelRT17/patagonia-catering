UPDATE events
SET address = $1, city = $2, state = $3, zipcode = $4, date = $5, start_time = $6, end_time = $7, event_name = $8
WHERE event_id = $9;