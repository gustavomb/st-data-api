const { getOrganizationNames } = require('../services/organizations');
const { getProducts } = require('../services/products');

exports.getProductsHandler = async (ctx) => {
    const { organization } = ctx.params;
    const { tags } = ctx.query;
    const { role } = ctx.state.user;

    const organizations = await getOrganizationNames(organization, role);
    if (organizations.length === 0) {
        // retornar 404 se nao existir?
        ctx.status = 403;
        return;
    }

    const products = await getProducts(organizations, tags);

    ctx.body = {
        total: products.length,
        products: products
    };
};
