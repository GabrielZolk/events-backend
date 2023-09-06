const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('SELECT * FROM users', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to list users', reject);
                        return false;
                    }
                    resolve({ users: results });
                });
            });
        },
        save: (name, email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to save users', reject);
                        return false;
                    }
                    resolve({ users: { id: results.insertId, name, email, password } });
                });
            });
        },
        update: (id, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('UPDATE users SET password = ? WHERE id = ?', [password, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Failed to update users', reject);
                        return false;
                    }
                    resolve({ users: { id, newPassword: password } });
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
    }
}

module.exports = users;
