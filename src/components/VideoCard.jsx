import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function VideoCard({ video }) {
  const imgs = video.snippet.thumbnails;
  const videoTitle =
    video.snippet.title.length > 45
      ? video.snippet.title.slice(0, 45) + "..."
      : video.snippet.title.slice(0, 45);

  return (
    <div className="card video-card" id={video.id.videoId}>
      <div className="card-header">
        <img
          className="card-thumbnail"
          src={imgs.default.url}
          srcSet={`${imgs.default.url} 120w, ${imgs.high.url} 480w, ${imgs.standard.url} 640w, ${imgs.maxres.url} 1280w`}
          width="400"
          height="300"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="card-body">
        <h4>{videoTitle}</h4>

        <div className="video-info">
          <p>{video.snippet.channelTitle}</p>
          <p>{dayjs(video.snippet.publishedAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
