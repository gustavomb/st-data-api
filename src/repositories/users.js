const source = 'fixtures/users.json';

const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

exports.findOneUser = function(email) {
    return new Promise((resolve, reject) => {

        const stream = StreamArray.withParser();
        const filestream = fs.createReadStream(source).pipe(stream.input);
        let user;
        stream.on('data', ({ value }) => {
            if (value.email === email) {
                user = value;
                filestream.destroy();
                resolve(user);
            }
        });

        stream.on('end', () => resolve(user));
        stream.on('error', (err) => reject(err));
    });

};