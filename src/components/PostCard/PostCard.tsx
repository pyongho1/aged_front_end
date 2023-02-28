import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// types
import { Post } from "../../types/models";
import { User } from "../../types/models";

// styles
import styles from "./PostCard.module.css";

// services
import * as postService from "../../services/postService";
import Landing from "../../pages/Landing/Landing";

interface PostCardProps {
  post: Post;
  user: User | null;
}

const PostCard = (props: PostCardProps): JSX.Element => {
  const { post, user } = props;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  const handleDelete = async () => {
    try {
      await postService.deletePost(post.id);
      setPosts(posts.filter((p) => p.id !== post.id));
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUpdate = async () => {
  //   try {
  //     await postService.update(formData, post.id);
  //     navigate(`/posts`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const postDate = new Date(post.date);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - postDate.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3>{post.title}</h3>
        <p>{numDays} days past</p>
        {user && <button className={styles.delBtn} onClick={handleDelete}></button>}
      </div>
    </div>
  );
};

export default PostCard;
// props: PostCardProps: JSX.Element;
