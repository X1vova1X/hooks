const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

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

app.get('/connor/send', async (req, res) => {
  let { content, name } = req.query;
  content = `Name: \`${name}\`. Content: \`${name}\``
  if (name == null) {
    name = "No name";
  }
  try {
    const response = await axios.get("https://raw.githubusercontent.com/X1vova1X/easygame/refs/heads/main/games/wbhk");
    const url = response.data;
    await axios.post(url, { content });
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
