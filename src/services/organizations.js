const { findOrganizations } = require('../repositories/organization');
const { findRoleLevels, findRoleOrganization } = require('../repositories/roles');

exports.getOrganizationNames = async (organization, role) => {
    const roleLevels = findRoleLevels(role);
    const roleOrganization = findRoleOrganization(role);

    if (!roleOrganization) {
        const organizations = await findOrganizations(organization, roleLevels);
        return organizations.map((o) => o.name);
    }

    // caso o usuario esteja restrito apenas a uma organizacao,
    // busca todas as organizacoes que o usuario possui acesso
    // e depois filtra apenas a pesquisada
    const names = new Set([organization.toLowerCase()]);
    const organizations = await findOrganizations(roleOrganization, roleLevels);
    return organizations
        .filter((o) => o.parent && (names.has(o.parent.toLowerCase())) && names.add(o.name.toLowerCase()))
        .map((o) => o.name);
}
