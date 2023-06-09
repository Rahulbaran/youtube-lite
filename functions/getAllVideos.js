import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const RAPID_API_KEY = process.env.RAPID_API_KEY;

export const handler = async () => {
  const options = {
    method: "GET",
    url: "https://youtube-v31.p.rapidapi.com/search",
    params: {
      relatedToVideoId: "7ghhRHRP6t4",
      part: "id,snippet",
      type: "video",
      maxResults: "50"
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);

    return {
      statusCode: 200,
      body: JSON.stringify({ videos: response.data })
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
