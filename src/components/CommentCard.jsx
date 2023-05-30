import parser from "html-react-parser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function CommentCard({ comment }) {
  const commentData = comment.snippet.topLevelComment;

  return (
    <div className="comment" id={comment.id}>
      <div className="author-info">
        <small>{commentData.snippet.authorDisplayName}</small>
        <small>{dayjs(commentData.snippet.publishedAt).fromNow()}</small>
      </div>
      <p class="comment-label">{parser(commentData.snippet.textDisplay)}</p>
    </div>
  );
}
