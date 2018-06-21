INSERT INTO event_cart (product_id, user_id, amount)
SELECT product_id, user_id, amount FROM cart_items
WHERE user_id = $1
RETURNING event_cart_entry_id;