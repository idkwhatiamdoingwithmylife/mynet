let list = [];
let listKey = 'MESSAGE_LIST';

exports.handler = async function(event, context) {
    if (process.env[listKey]) {
        list = JSON.parse(process.env[listKey]);
    }

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);

        if (body.action === 'add' && body.message) {
            list.push(body.message);
        }

        if (body.action === 'remove' && body.message) {
            const index = list.lastIndexOf(body.message);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }

        process.env[listKey] = JSON.stringify(list);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ list: list })
    };
};
