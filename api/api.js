exports.handler = async (event) => {
    if (event.httpMethod === 'DELETE') {
        global.items = [];
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
    return { statusCode: 405, body: "Method Not Allowed" };
};
