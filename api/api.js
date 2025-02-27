export default function handler(req, res) {
  const computerName = req.body.computerName || 'Unknown';
  res.status(200).json({ message: `Connected to ${computerName}` });
}
