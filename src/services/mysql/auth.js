const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

const auth = deps => {
    return {
        authenticate: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                const queryString = 'SELECT id, email, name  FROM users WHERE email = ? and password = ?';
                const queryData = [email, sha1(password)] 
                
                connection.query(queryString, queryData, (error, results) => {
                    if (error || !results.length) {
                        errorHandler(error, 'Failed to login', reject);
                        return false;
                    }
                    const { email: userEmail, id, name } = results[0];
                    const token = jwt.sign({ email: userEmail, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                    resolve({ token, user: { id, userEmail, name} });
                });
            });
        },
    };
};

module.exports = auth;