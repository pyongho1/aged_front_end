import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostFormData } from "../../types/forms";
import { update } from "../../services/postService";
import styles from "./UpdatePost.module.css";
import { Post } from "../../types/models";

interface Props {
  post: Post;
}

function UpdatePost({ post }: Props): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    date: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedPost = await update(post.id, formData);
      console.log("UPDATED POST", updatedPost);
      navigate(`/posts`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <textarea
            id="date"
            name="date"
            // value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default UpdatePost;
