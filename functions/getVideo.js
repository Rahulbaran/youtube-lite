import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const VIDEO_URL = process.env.VIDEO_URL;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

export const handler = async event => {
  const vId = event.queryStringParameters.videoId;

  const options = {
    method: "GET",
    url: VIDEO_URL,
    params: {
      part: "contentDetails,snippet,statistics",
      id: vId
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
