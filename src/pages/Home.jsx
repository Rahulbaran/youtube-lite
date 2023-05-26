import { useLoaderData } from "react-router-dom";

export default function Home() {
  const data = useLoaderData();
  console.log(data.videos.items);

  return <div className="home-wrapper"></div>;
}

// Videos Loader
export const videosLoader = async () => {
  const res = await fetch("/.netlify/functions/getAllVideos");
  return res.json();
};
