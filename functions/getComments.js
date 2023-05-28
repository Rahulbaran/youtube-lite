import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const RAPID_API_KEY = process.env.RAPID_API_KEY;

export const handler = async event => {
  const vId = event.queryStringParameters.videoId;

  const options = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/commentThreads",
    params: {
      part: "snippet",
      videoId: vId,
      maxResults: "100"
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
    }
  };

  try {
    const res = await axios.request(options);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: res.data })
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
