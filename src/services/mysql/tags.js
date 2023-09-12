
const tags = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('SELECT * FROM tags', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to list tags', reject);
                        return false;
                    }
                    resolve({ tags: results });
                });
            });
        },
        findById: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('SELECT id, name FROM tags WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to find user by ID', reject);
                        return false;
                    }
                    resolve({ tags: results });
                });
            });
        },
        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('INSERT INTO tags (name) VALUES (?)', [name], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to save tags', reject);
                        return false;
                    }
                    resolve({ tags: { id: results.insertId, name } });
                });
            });
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('UPDATE tags SET name = ? WHERE id = ?', [name, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Failed to update tags', reject);
                        return false;
                    }
                    resolve({ tags: { msg: 'Success!' } });
                });
            });
        },
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('DELETE FROM tags WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to remove tags', reject);
                        return false;
                    }
                    resolve({ tags: { message: 'Success!' } });
                });
            });
        },

        saveTagsHasEvents: (event_id, tag_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query('INSERT INTO tags_has_events (events_id, tags_id) VALUES (?, ?)', [event_id, tag_id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed', reject);
                        return false;
                    }
                    resolve({ message: 'Success!' });
                });
            });
        },

        getTagsFromEvent: (event_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;

                connection.query(`
                    SELECT tags.*
                    FROM tags_has_events
                    INNER JOIN tags ON tags_has_events.tags_id = tags.id
                    WHERE tags_has_events.events_id = ?
            `, [event_id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed', reject);
                        return false;
                    }
                    resolve({ results });
                });
            });
        },
        delTagsFromEvent: (event_id, tag_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query(`
                DELETE FROM tags_has_events
                WHERE events_id = ?
                AND tags_id = ?;
            `, [event_id, tag_id], (error, results) => {
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

module.exports = tags;
