UPDATE event_cart
SET event_id = $2
WHERE event_cart_entry_id = $1;