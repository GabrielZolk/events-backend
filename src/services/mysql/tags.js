
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
    }
}

module.exports = tags;
