const JoiRouter = require('koa-joi-router');
const { getProductsHandler } = require('../controllers/products');
const { loginHandler } = require('../controllers/user');

const Joi = JoiRouter.Joi.extend(joi => ({
    base: joi.array(),
    type: 'commaArray',
    coerce: (value) => ({
      value: value.split ? value.split(',') : value
    })
  }))

const router = new JoiRouter();

router.route({
    method: 'post',
    path: '/login',
    validate: {
        type: 'json',
        body: {
            email: Joi.string().email({ tlds: { allow: false } }),
            password: Joi.string()
        }
    },
    handler: loginHandler
})

router.route({
    method: 'get',
    path: '/products/:organization',
    validate: {
        params: {
            organization: Joi.string()
        },
        query: {
            tags: Joi.commaArray().items(Joi.string())
        }
    },
    handler: getProductsHandler

});

module.exports = router.router;
