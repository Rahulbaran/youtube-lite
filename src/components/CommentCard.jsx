import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function CommentCard({ comment }) {
  const commentData = comment.snippet.topLevelComment;
  console.log(commentData);

  return (
    <div className="comment" id={comment.id}>
      <div className="author-info">
        <small>{commentData.snippet.authorDisplayName}</small>
        <small>{dayjs(commentData.snippet.publishedAt).fromNow()}</small>
      </div>
      <p class="comment-label">{commentData.snippet.textDisplay}</p>
    </div>
  );
}
