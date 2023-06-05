import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

// Utils
import formatNum from "../utils/formatNum";

// Components
import CommentCard from "../components/CommentCard";

export default function Video() {
  const [comments, setComments] = useState([]);
  const data = useLoaderData().data.items[0];
  const imgs = data.snippet.thumbnails;

  const getComments = async e => {
    const videoId = e.target.id;
    const res = await fetch(
      `/.netlify/functions/getComments?videoId=${videoId}`
    );
    const commentsData = await res.json();
    setComments(commentsData.data.items);

    e.target.setAttribute("disabled", true);
  };

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
            <Link to={"/channel/" + data.snippet.channelId}>
              <p className="channel-title">{data.snippet.channelTitle}</p>
            </Link>
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

        {data.snippet.tags && (
          <div className="video-description">
            <p className="video-tags">
              {data.snippet.tags
                .map(tag => "#" + tag.split(" ").join(""))
                .map((tag, index) => (
                  <small key={index}>{tag}</small>
                ))}
            </p>
          </div>
        )}
      </section>

      <section className="video-comments-container">
        <button className="comment-load-btn" id={data.id} onClick={getComments}>
          Comments
        </button>

        <div
          className="comments"
          style={{ display: comments.length > 0 ? "grid" : "none" }}
        >
          {comments.map(comment => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

// Video data loader
export async function videoInfoLoader({ params }) {
  const res = await fetch(
    `/.netlify/functions/getVideo?videoId=${params.videoId}`
  );
  return res.json();
}
