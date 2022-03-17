const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const source = 'fixtures/organization.json';

exports.findOrganizations = function(organization, levels) {
    return new Promise((resolve, reject) => {
        levels = new Set(levels);
        const names = new Set([organization.toLowerCase()]);
        const organizations = [];

        const stream = StreamArray.withParser();
        fs.createReadStream(source).pipe(stream.input);

        stream.on('data', ({ value }) => {
            const name = value.name.toLowerCase();
            const parent = value.parent ? value.parent.toLowerCase() : value.parent;

            if ((names.has(name) && levels.has(value.level)) || names.has(parent)) {
                names.add(name);
                organizations.push(value);
            }
        });

        stream.on('end', () => resolve(organizations));
        stream.on('error', err => reject(err));
    });
}
