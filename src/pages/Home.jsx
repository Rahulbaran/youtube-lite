import { useLoaderData, Link } from "react-router-dom";

/* Components */
import VideoCard from "../components/VideoCard";

export default function Home() {
  const data = useLoaderData();
  const videos = data.videos.items.filter(item => {
    const imgs = item.snippet.thumbnails;
    return imgs.default && imgs.high && imgs.standard && imgs.maxres;
  });

  const videoCards = videos.map(video => (
    <Link to={video.id.videoId} key={video.id.videoId}>
      <VideoCard video={video} />
    </Link>
  ));

  return <div className="home-wrapper">{videoCards}</div>;
}

// Videos Loader
export const videosLoader = async () => {
  const res = await fetch("/.netlify/functions/getAllVideos");
  return res.json();
};
