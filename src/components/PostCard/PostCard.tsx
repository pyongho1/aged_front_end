// types
import { Post } from "../../types/models";

// styles
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
}

const PostCard = (props: PostCardProps): JSX.Element => {
  const { post } = props;

  const postDate = new Date(post.date);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - postDate.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3>{post.title}</h3>
        <p>{numDays}</p>
      </div>
    </div>
  );
};

export default PostCard;
// props: PostCardProps: JSX.Element;
