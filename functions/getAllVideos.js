import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const handler = async () => {
  const YT_URL = process.env.YT_URL;
  const RAPID_API_KEY = process.env.RAPID_API_KEY;
  console.log(YT_URL, RAPID_API_KEY);

  const options = {
    method: "GET",
    url: YT_URL,
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
