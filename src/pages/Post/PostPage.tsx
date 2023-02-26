// style
import styles from "./PostPage.module.css";

// types
import { Post } from "../../types/models";

// components
import PostCard from "../../components/PostCard/PostCard";

interface PostProps {
  posts: Post[];
}

const PostPage = (props: PostProps) => {
  const { posts } = props;

  if (!posts.length) return <p>No posts yet...</p>;

  return (
    <div className={styles.container}>
      <h2>POST PAGE</h2>
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
        // <p>{post.title}</p>
      ))}
    </div>
  );
};

export default PostPage;
