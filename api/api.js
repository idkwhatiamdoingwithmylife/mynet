let list = [];
let listKey = 'HI_LIST';

exports.handler = async function(event, context) {
    if (process.env[listKey]) {
        list = JSON.parse(process.env[listKey]);
    }

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);

        if (body.action === 'add') {
            list.push('hi');
        }

        if (body.action === 'remove') {
            const index = list.lastIndexOf('hi');
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
