
const contacts = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('SELECT * FROM contacts', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to list contacts', reject);
                        return false;
                    }
                    resolve({ contacts: results });
                });
            });
        },
        findById: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
        
                connection.query('SELECT id, name, email, phone FROM contacts WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to find user by ID', reject);
                        return false;
                    }
                    resolve({ contacts: results });
                });
            });
        },  
        save: (name, email, phone, user_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('INSERT INTO contacts (name, email, phone, users_id) VALUES (?, ?, ?, ?)', [name, email, phone, user_id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to save contacts', reject);
                        return false;
                    }
                    resolve({ contacts: { id: results.insertId, name, email, phone } });
                });
            });
        },
        update: (id, name, email, phone) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, 'Failed to update contacts', reject);
                        return false;
                    }
                    resolve({ contacts: { msg: 'Success!' } });
                });
            });
        },        
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query('DELETE FROM contacts WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed to remove contacts', reject);
                        return false;
                    }
                    resolve({ contacts: { message: 'Success!' } });
                });
            });
        },
    }
}

module.exports = contacts;
