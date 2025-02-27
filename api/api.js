// api/api.js
export default async (req, res) => {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'Hi, computer connected!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
