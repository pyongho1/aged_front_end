// style
import styles from "./PostPage.module.css";

// types
import { Post } from "../../types/models";
import { User } from "../../types/models";

// components
import PostCard from "../../components/PostCard/PostCard";

interface PostProps {
  posts: Post[];
  user: User | null;
}

const PostPage = (props: PostProps) => {
  const { posts, user } = props;

  if (!posts.length) return <p>No posts yet...</p>;

  return (
    <div className={styles.container}>
      <h2>See how many days have passed!</h2>
      <p>⚠️Click on the left side of the sphere to delete</p>
      <div className={styles.cardContainer}>
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} user={user} />
          // <p>{post.title}</p>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
