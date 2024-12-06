const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.get('/post', async (req, res) => {
  const { content, webhookUrl } = req.query;

  if (!content || !webhookUrl) {
    return res.status(400).json({ error: 'Content and webhook URL are required' });
  }

  try {
    await axios.post(webhookUrl, { content });
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
