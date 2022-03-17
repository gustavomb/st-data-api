const roleLevels = {
    senior: [0, 1, 2],
    middle: [1, 2],
    junior: [2],
    intern: [0, 1, 2]
};

const roleOrganization = {
    intern: 'STUFF A'
}

exports.findRoleLevels = (role) => roleLevels[role];

exports.findRoleOrganization = (role) => roleOrganization[role];
