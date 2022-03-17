const { findProducts } = require('../repositories/products');

exports.getProducts = async (organizations, tags) => {
    return await findProducts(organizations, tags);
};
