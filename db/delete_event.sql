DELETE FROM event_cart
WHERE event_id = $1;

DELETE FROM events 
WHERE event_id = $1;
