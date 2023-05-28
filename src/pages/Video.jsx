import { useLoaderData } from "react-router-dom";

// Utils
import formatNum from "../utils/formatNum";

export default function Video() {
  const data = useLoaderData().data.items[0];
  const imgs = data.snippet.thumbnails;

  return (
    <main className="video-wrapper">
      <section className="video-container">
        <div className="video-thumbnail">
          <img
            src={imgs.high.url}
            alt={data.snippet.title}
            srcSet={`${imgs.high.url} 480w, ${imgs.standard.url} 640w, ${imgs.maxres.url} 1280w`}
            width="500"
            loading="eager"
          />
        </div>
        <div className="video-title">
          <h3>{data.snippet.title}</h3>
        </div>

        <div className="video-channel-info">
          <div className="channel">
            <p className="channel-title">{data.snippet.channelTitle}</p>
            <small className="channel-subscribers">20k subscribers</small>
          </div>

          <div className="video-likes">
            <p>{data.statistics.likeCount === 1 ? "Like" : "Likes"}</p>
            <span>-</span>
            <p className="likes-count">
              {formatNum(data.statistics.likeCount)}
            </p>
          </div>

          <div className="video-views">
            <p>{data.statistics.viewCount === 1 ? "View" : "Views"}</p>
            <span>-</span>
            <p className="views-count">
              {formatNum(data.statistics.viewCount)}
            </p>
          </div>
        </div>

        <div className="video-description">
          <p className="video-tags">
            {data.snippet.tags
              .map(tag => "#" + tag.split(" ").join(""))
              .map(tag => (
                <small>{tag}</small>
              ))}
          </p>
        </div>
      </section>

      <section className="video-comments-container">
        <button className="comment-load-btn" id={data.id}>
          Comments
        </button>
      </section>
    </main>
  );
}

export async function videoInfoLoader({ params }) {
  const res = await fetch(
    `/.netlify/functions/getVideo?videoId=${params.videoId}`
  );
  return res.json();
}
