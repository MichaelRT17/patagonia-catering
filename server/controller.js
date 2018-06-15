module.exports = {

    getProducts: (req, res) => {
        const db = req.app.get('db');

        db.get_products()
            .then(products => res.status(200).send(products))
            .catch(() => res.status(500).send());
    },

    addToCart: (req, res) => {
        const db = req.app.get('db');
        const { product_id, amount, user_id } = req.body;

        db.add_to_cart([product_id, user_id, amount])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    getCartItems: (req, res) => {
        const db = req.app.get('db');
        console.log(req.user)
        db.get_cart_items([req.user.user_id])
            .then((items) => res.status(200).send(items))
            .catch(() => res.status(500).send())
    },

    getMains: (req, res) => {
        const db = req.app.get('db');

        db.get_mains()
            .then(products => res.status(200).send(products))
            .catch(() => res.status(500).send());
    },

    getSides: (req, res) => {
        const db = req.app.get('db');

        db.get_sides()
            .then(products => res.status(200).send(products))
            .catch(() => res.status(500).send());
    },

    getDesserts: (req, res) => {
        const db = req.app.get('db');

        db.get_desserts()
            .then(products => res.status(200).send(products))
            .catch(() => res.status(500).send());
    },

    updateAmount: (req, res) => {
        const db = req.app.get('db');
        const {user_id, product_id, amount} = req.body;

        db.update_amount()
    }

}