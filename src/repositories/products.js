const fs = require('fs');
const { parser: jsonlParser } = require('stream-json/jsonl/Parser');

const source = 'fixtures/products.txt';

// filtrando por pelo menos uma das tags
// caso seja necessario filtrar por todas trocar tags.some por tags.every
function hasTags(productTags, tags) {
    if (!tags || tags.length === 0)
        return true;

    productTags = productTags.map(t => t.toLowerCase());
    return tags.some((t) => productTags.includes(t));
}

exports.findProducts = function(organizations, tags) {
    return new Promise((resolve, reject) => {
        tags = tags ? tags.map((t) => t.toLowerCase()) : tags;
        const products = [];
        const orgs = new Set(organizations);
        const stream = fs.createReadStream(source).pipe(jsonlParser());
        stream.on('data', ({ value }) => {
            if (orgs.has(value.department) && hasTags(value.tags, tags)) {
                products.push(value);
            }
        });

        stream.on('end', () => resolve(products));
        stream.on('error', (err) => reject(err));
    });
}
