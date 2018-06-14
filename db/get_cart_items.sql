SELECT * FROM cart_items
JOIN products ON cart_items.product_id = products.product_id
WHERE user_id = $1;