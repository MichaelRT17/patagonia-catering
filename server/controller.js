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
        const { user_id, product_id, amount } = req.body;

        db.update_amount([product_id, user_id, amount])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    removeProduct: (req, res) => {
        const db = req.app.get('db');

        db.remove_product([req.params.product_id, req.user.user_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    removeFromCart: (req, res) => {
        const db = req.app.get('db')

        db.remove_from_cart([req.user.user_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    createEvent: (req, res) => {
        const db = req.app.get('db')
        const { address, city, state, zipcode, date, startTime, endTime, eventName, paid } = req.body;

        db.create_event([req.user.user_id, address, city, state, zipcode, date, startTime, endTime, eventName, paid])
            .then((event_id) => res.status(200).send(event_id))
            .catch(() => res.status(500).send())
    },

    addToEventCart: (req, res) => {
        const db = req.app.get('db');

        db.add_to_event_cart([req.user.user_id])
            .then((event_cart_entry_id) => res.status(200).send(event_cart_entry_id))
            .catch(() => res.status(500).send());
    },

    linkToEvent: (req, res) => {
        const db = req.app.get('db');

        db.link_to_event([req.params.id, req.body.event_id[0].event_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    getUserEvents: (req, res) => {
        const db = req.app.get('db');

        db.get_user_events([req.params.user_id])
            .then((events) => res.status(200).send(events))
            .catch(() => res.status(500).send());
    },

    getEvent: (req, res) => {
        const db = req.app.get('db');

        db.get_event([req.params.event_id])
            .then((event) => res.status(200).send(event))
            .catch(() => res.status(500).send());
    },

    updatePaid: (req, res) => {
        const db = req.app.get('db');

        db.update_paid([req.params.event_id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    },

    deleteEvent: (req, res) => {
        const db = req.app.get('db');

        db.delete_event([+req.params.event_id])
            .then(() => res.status(200).send())
            .catch((err) => {
                console.log(err)
                res.status(500).send()});
    },

    updateEvent: (req, res) => {
        const db = req.app.get('db');

        
    }

}