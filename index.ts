import axios from 'axios';
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

async function urlShortener(longUrl){
    const token = process.env.BITLY_URL_SHORTENER_ACCESS_TOKEN; // Replace with your Bitly access token
  try {
    const response = await axios.post(
      'https://api-ssl.bitly.com/v4/shorten',
      { long_url: longUrl }, // Request body
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // Extract and return the short link
    return response.data.link;
  } catch (error:any) {
    console.error('Error creating short link:', error.response?.data || error.message);
    throw error;
  }
  }

// Example usage
urlShortener('https://lehoa.app/experiences/home?pid=66f457925c2ecb5575e60204')
  .then(shortLink => {
    console.log('Short Link:', shortLink);
  })
  .catch(error => {
    console.error('Failed to create short link:', error.message);
  });

app.get('/health', (req, res)=>{
    res.status(200).json({status:'Up'})
})


app.use((_req, res)=>{
    res.status(404).json({message:'Not found'})
})
app.use((err,_req, res, _next)=>{
    console.error(err.stack)
    res.status(500).json({message:'Internal server error'})
})

const port = process.env.PORT || 4040

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})