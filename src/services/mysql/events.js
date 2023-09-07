const sha1 = require('sha1');

const events = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('SELECT * FROM events', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to list events', reject);
                        return false;
                    }
                    resolve({ events: results });
                });
            });
        },
        findById: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
        
                connection.query('SELECT * FROM events WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to find event by ID', reject);
                        return false;
                    }
                    resolve({ events: results });
                });
            });
        },        
        save: (title, description, start_datetime, end_datetime, color, users_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('INSERT INTO events (title, description, start_datetime, end_datetime, color, users_id) VALUES (?, ?, ?, ?, ?, ?)', [title, description, start_datetime, end_datetime, color, users_id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to save events', reject);
                        return false;
                    }
                    resolve({ events: { id: results.insertId, title, description, start_datetime, end_datetime, color, users_id } });
                });
            });
        },
        update: (id, title, description, start_datetime, end_datetime, color, users_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query(
                    'UPDATE events SET title = ?, description = ?, start_datetime = ?, end_datetime = ?, color = ?, users_id = ? WHERE id = ?',
                    [title, description, start_datetime, end_datetime, color, users_id, id],
                    (error, results) => {
                        if (error || !results.affectedRows) {
                            errorHandler(error, 'Failed to update events', reject);
                            return false;
                        }
                        resolve({ events: { msg: 'Success!' } });
                    }
                );
            });
        },        
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('DELETE FROM events WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to remove events', reject);
                        return false;
                    }
                    resolve({ events: { message: 'Success!' } });
                });
            });
        },
    }
}

module.exports = events;
