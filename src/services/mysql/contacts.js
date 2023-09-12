
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
        getContactsFromEvent: (event_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query(`
                SELECT contacts.*
                FROM events_has_contacts
                INNER JOIN contacts ON events_has_contacts.contacts_id = contacts.id
                WHERE events_has_contacts.events_id = ?
            `, [event_id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Failed', reject);
                        return false;
                    }
                    resolve({ results });
                });
            });
        },
        delContactsFromEvent: (evento_id, contact_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                
                connection.query(`
                DELETE FROM events_has_contacts
                WHERE events_id = ?
                AND contacts_id = ?;
            `, [evento_id, contact_id], (error, results) => {
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

module.exports = contacts;
