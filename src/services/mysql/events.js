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

                connection.query('SELECT * FROM events WHERE users_id = ?', [id], (error, results) => {
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
        update: (id, title, description, start_datetime, end_datetime, color) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query(
                    'UPDATE events SET title = ?, description = ?, start_datetime = ?, end_datetime = ?, color = ? WHERE id = ?',
                    [title, description, start_datetime, end_datetime, color, id],
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
        saveEventsHasContacts: (event_id, contact_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('INSERT INTO events_has_contacts (events_id, contacts_id) VALUES (?, ?)', [event_id, contact_id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed', reject);
                        return false;
                    }
                    resolve({ message: 'Success!' });
                });
            });
        },
        getAllEventsWithContactsAndTags: (user_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
        
                connection.query(`
                SELECT 
                e.id AS id, 
                e.title AS name, 
                e.description AS description, 
                e.start_datetime AS start, 
                e.end_datetime AS end, 
                e.color AS color,  
                t.name AS tag_name, 
                c.name AS contato_name
            FROM 
                events AS e
            LEFT JOIN 
                tags_has_events AS te ON e.id = te.events_id
            LEFT JOIN 
                tags AS t ON te.tags_id = t.id
            LEFT JOIN 
                events_has_contacts AS ec ON e.id = ec.events_id
            LEFT JOIN 
                contacts AS c ON ec.contacts_id = c.id
            WHERE
                e.users_id = ?
                `, [user_id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed', reject);
                        return false;
                    }
                    resolve({ results });
                });
            });
        },        
    }
}

module.exports = events;
