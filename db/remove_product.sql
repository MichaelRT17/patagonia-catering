DELETE FROM cart_items
WHERE product_id = $1 AND user_id = $2;