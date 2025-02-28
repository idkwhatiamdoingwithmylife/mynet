let list = [];

exports.handler = async function(event, context) {
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
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ list: list })
    };
};
