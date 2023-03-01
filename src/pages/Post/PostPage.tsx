// style
import styles from "./PostPage.module.css";

// types
import { Post, Profile } from "../../types/models";
import { User } from "../../types/models";

// components
import PostCard from "../../components/PostCard/PostCard";

interface PostProps {
  posts: Post[];
  user: User | null;
  profiles: Profile[];
  handleDeletePost: (id: number) => Promise<void>;
}

const PostPage = (props: PostProps) => {
  const { posts, user, profiles, handleDeletePost } = props;

  if (!posts.length)
    return (
      <p className={styles.noPost}>Oh no! Seems like there is no post yet...</p>
    );

  return (
    <div className={styles.container}>
      <h2>See how many days have passed!</h2>
      <p>⚠️ Click on the left side of the sphere to delete</p>
      <div className={styles.cardContainer}>
        {posts.map((post: Post) => {
          const profile = profiles.find(
            (profile: Profile) => profile.id === post.profileId
          );
          return (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              profile={profile}
              handleDeletePost={handleDeletePost}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostPage;
