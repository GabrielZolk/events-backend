const sha1 = require('sha1');

const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('SELECT id, email FROM users', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to list users', reject);
                        return false;
                    }
                    resolve({ users: results });
                });
            });
        },
        findById: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
        
                connection.query('SELECT id, name, email, profile_picture FROM users WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to find user by ID', reject);
                        return false;
                    }
                    resolve({ users: results });
                });
            });
        },        
        save: (name, email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, sha1(password)], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to save users', reject);
                        return false;
                    }
                    resolve({ users: { id: results.insertId, name, email } });
                });
            });
        },
        update: (id, name, email, profile_picture) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('UPDATE users SET name = ?, email = ?, profile_picture = ? WHERE id = ?', [name, email, profile_picture, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Failed to update users', reject);
                        return false;
                    }
                    resolve({ users: { msg: 'Success!' } });
                });
            });
        },
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to remove users', reject);
                        return false;
                    }
                    resolve({ users: { message: 'Success!' } });
                });
            });
        },
        getEventsByUser: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                const query = 'SELECT * FROM events WHERE users_id = ?';

                connection.query(query, [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to fetch events from user', reject);
                        return false;
                    }
                    resolve({ events: results });
                });
            });
        },
        getContactsByUser: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                const query = 'SELECT * FROM contacts WHERE users_id = ?';

                connection.query(query, [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to find contacts by user ID', reject);
                        return false;
                    }
                    resolve({ contacts: results });
                });
            });
        },
        changePassword: (id, currentPassword, newPassword) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('UPDATE users SET password = ? WHERE id = ? AND password = ?', [sha1(newPassword), id, sha1(currentPassword)], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Failed to update password', reject);
                        return false;
                    }
                    resolve({ users: { msg: 'Success!' } });
                });
            });
        },
    }
}

module.exports = users;
