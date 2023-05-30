import { useLoaderData } from "react-router-dom";
// import dayjs from "dayjs";

// Utils
import formatNum from "../utils/formatNum";

export default function Channel() {
  const data = useLoaderData();
  const imgs = data.items[0].snippet.thumbnails;
  const channel = data.items[0];

  return (
    <div className="channel-wrapper">
      <main>
        <section className="channel-home-section">
          <div className="channel-logo">
            <img
              src={imgs.default.url}
              alt={channel.snippet.localized.title}
              srcSet={`${imgs.default.url} 88w, ${imgs.medium.url} 240w, ${imgs.high.url} 800w`}
              width="250"
              height="250"
            />
          </div>
          <div className="channel-label">
            <h1>{channel.snippet.localized.title}</h1>
            <div>
              <div className="channel-url">
                <small>{channel.snippet.customUrl}</small>
                <small>
                  {formatNum(channel.statistics.subscriberCount)} subscribers
                </small>
                <small>{formatNum(channel.statistics.videoCount)} videos</small>
              </div>
            </div>
          </div>
        </section>

        <section className="channel-about-section">
          {channel.snippet.description.length > 0 && (
            <div className="channel-description">
              <h3>Description</h3>
              <small>{channel.snippet.description}</small>
            </div>
          )}

          {channel.snippet.country && (
            <div className="channel-details">
              <h3>Details</h3>
              <small>Location - {channel.snippet.country}</small>
            </div>
          )}

          <div className="channel-stats">
            <h3>Stats</h3>
            <small>
              Joined on -{" "}
              {new Date(channel.snippet.publishedAt).toLocaleDateString()}
            </small>
            <small>{channel.statistics.viewCount} views</small>
          </div>
        </section>
      </main>
    </div>
  );
}

// loader function
export const channelLoader = async ({ params }) => {
  const channelId = params.channelId;

  const data = await fetch(
    `/.netlify/functions/getChannel?channelId=${channelId}`
  );
  return data.json();
};
