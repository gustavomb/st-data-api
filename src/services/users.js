const { findOneUser } = require('../repositories/users');

exports.authUser = async (email, password) => {
    const user = await findOneUser(email);
    if (user && user.password === password) {
        return user;
    }
}
