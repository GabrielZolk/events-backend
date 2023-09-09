const db = require('../services/mysql/index');

const routes = (server) => {
    server.get('/', (req, res, next) => {
        res.send('Hello World');
        next();
    });


    // Login

    server.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const users = await db.auth().authenticate(email, password);
            res.send(users);
        } catch (error) {
            res.send(error);
        }
    });


    // Users

    server.get('/users', async (req, res) => {
        try {
            const users = await db.users().all();
            res.send(users);
        } catch (error) {
            res.send(error);
        }
    });

    server.get('/users/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const user = await db.users().findById(id);
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } catch (error) {
            res.send(error);
        }
    });    
    
    server.post('/users', async (req, res) => {
        const { name, email, password } = req.body;
        try {
            res.send(await db.users().save(name, email, password));
        } catch (error) {
            res.send(error);
        }
    });
    
    server.put('/users', async (req, res) => {
        const { id, name, email, profile_picture } = req.body;
        try {
            res.send(await db.users().update(id, name, email, profile_picture));
        } catch (error) {
            res.send(error);
        }
    })

    server.del('/users/:id', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.users().delete(id));
        } catch (error) {
            res.send(error);
        }
    })


    // Contacts

    server.get('/contacts', async (req, res) => {
        try {
            const contacts = await db.contacts().all();
            res.send(contacts);
        } catch (error) {
            res.send(error);
        }
    })

    server.get('/contacts/:id', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.contacts().findById(id));
        } catch (error) {
            res.send(error);
        }
    });

    server.post('/contacts', async (req, res) => {
        const { name, email, phone, user_id } = req.body;
        try {
            res.send(await db.contacts().save(name, email, phone, user_id));
        } catch (error) {
            res.send(error);
        }
    });

    server.put('/contacts', async (req, res) => {
        const { id, name, email, phone } = req.body;
        try {
            res.send(await db.contacts().update(id, name, email, phone));
        } catch (error) {
            res.send(error);
        }
    })

    server.del('/contacts/:id', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.contacts().delete(id));
        } catch (error) {
            res.send(error);
        }
    })


    // Tags

    server.get('/tags', async (req, res) => {
        try {
            const tags = await db.tags().all();
            res.send(tags);
        } catch (error) {
            res.send(error);
        }
    })

    server.get('/tags/:id', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.tags().findById(id));
        } catch (error) {
            res.send(error);
        }
    });

    server.post('/tags', async (req, res) => {
        const { name } = req.body;
        try {
            res.send(await db.tags().save(name));
        } catch (error) {
            res.send(error);
        }
    });

    server.put('/tags', async (req, res) => {
        const { id, name } = req.body;
        try {
            res.send(await db.tags().update(id, name));
        } catch (error) {
            res.send(error);
        }
    })

    server.del('/tags/:id', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.tags().delete(id));
        } catch (error) {
            res.send(error);
        }
    })


    // Events

    server.get('/events', async (req, res) => {
        try {
            const events = await db.events().all();
            res.send(events);
        } catch (error) {
            res.send(error);
        }
    })

    server.get('/events/:id', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.events().findById(id));
        } catch (error) {
            res.send(error);
        }
    });

    server.post('/events', async (req, res) => {
        const { title, description, start_datetime, end_datetime, color, users_id } = req.body;
        try {
            res.send(await db.events().save(title, description, start_datetime, end_datetime, color, users_id));
        } catch (error) {
            res.send(error);
        }
    });

    server.put('/events', async (req, res) => {
        const { id, title, description, start_datetime, end_datetime, color } = req.body;
        try {
            res.send(await db.events().update(id, title, description, start_datetime, end_datetime, color));
        } catch (error) {
            res.send(error);
        }
    })

    server.del('/events/:id', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.events().delete(id));
        } catch (error) {
            res.send(error);
        }
    });


    // Others

    server.get('/users/:id/events', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.users().getEventsByUser(id));
        } catch (error) {
            res.send(error);
        }
    });
    
    server.get('/users/:id/contacts', async (req, res) => {
        const { id } = req.params;
        try {
            res.send(await db.users().getContactsByUser(id));
        } catch (error) {
            res.send(error);
        }
    });

    server.put('/users/password', async (req, res) => {
        const { id, currentPassword, newPassword } = req.body;
        try {
            res.send(await db.users().changePassword(id, currentPassword, newPassword));
        } catch (error) {
            res.send(error);
        }
    });
};


module.exports = routes;