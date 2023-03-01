import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// types
import { Post, Profile } from "../../types/models";
import { User } from "../../types/models";

// styles
import styles from "./PostCard.module.css";

// services
import * as postService from "../../services/postService";
import Landing from "../../pages/Landing/Landing";

interface PostCardProps {
  post: Post;
  user: User | null;
  profile?: Profile;
  handleDeletePost: (id: number) => void;
}

const PostCard = (props: PostCardProps): JSX.Element => {
  const { post, user, profile, handleDeletePost } = props;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  // const [profiles, setProfiles] = useState<Profile[]>([]);

  // useEffect((): void => {
  //   const fetchProfiles = async (): Promise<void> => {
  //     try {
  //       const profileData: Profile[] = await profileService.getAllProfiles();
  //       setProfiles(profileData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   user ? fetchProfiles() : setProfiles([]);
  // }, [user]);

  const postDate = new Date(post.date);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - postDate.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h5>{profile?.name}</h5>
        <img
          src={profile?.photo}
          className={styles.profilePic}
          alt="profile pic"
        />
        <h3>{post.title}</h3>
        <p>{numDays} days past</p>
        {user && (
          <button
            className={styles.delBtn}
            onClick={() => handleDeletePost(post.id)}
          ></button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
