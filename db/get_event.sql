SELECT * FROM events
JOIN event_cart ON events.event_id = event_cart.event_id
JOIN products ON event_cart.product_id = products.product_id
WHERE events.event_id = $1;