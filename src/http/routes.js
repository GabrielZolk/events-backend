const db = require('../services/mysql/index');

const routes = (server) => {
    server.get('/', (req, res, next) => {
        res.send('Hello World');
        next();
    });

    server.get('/users', async (req, res) => {
        try {
            const users = await db.users().all();
            res.send(users);
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
        const { id, password } = req.body;
        try {
            res.send(await db.users().update(id, password));
        } catch (error) {
            res.send(error);
        }
    })

    server.del('/users', async (req, res) => {
        const { id } = req.body;
        try {
            res.send(await db.users().delete(id));
        } catch (error) {
            res.send(error);
        }
    })
};

module.exports = routes;