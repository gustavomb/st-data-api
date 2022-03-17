const jwt = require('jsonwebtoken');
const { authUser } = require('../services/users');

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

exports.loginHandler = async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await authUser(email, password);

    if (!user) {
        ctx.status = 401;
        ctx.message = 'invalid user/password';
    } else {
        ctx.body = {
            token: jwt.sign({
                email: user.email,
                role: user.roles[0]
            }, jwtSecret, {
                expiresIn
            })
        };
    }
};
