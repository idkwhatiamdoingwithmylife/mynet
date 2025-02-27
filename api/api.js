let computerData = { computerName: '', publicIp: '' };

export default async (req, res) => {
    if (req.method === 'POST') {
        const body = await req.json();
        computerData.computerName = body.computerName;
        computerData.publicIp = body.publicIp;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(computerData);
};
