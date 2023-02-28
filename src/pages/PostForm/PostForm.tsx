import { useState } from "react";

// styles
import styles from "./PostForm.module.css";

import { PostFormData } from "../../types/forms";

import { Link, useNavigate } from "react-router-dom";

interface PostProps {
  handlePost: (formData: PostFormData) => void;
}

const PostForm = (props: PostProps) => {
  const { handlePost } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    date: new Date(),
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();
    try {
      await handlePost(formData);
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  const { title, date } = formData;

  return (
    <div className={styles.container}>
      <h1 className={styles.firstHeading}>Enter in your Anniversary!</h1>

      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="title">What day is this for?</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="date">Starting Date</label>
        <input
          type="date"
          name="date"
          id="date"
          // value={date}
          onChange={handleChange}
        />
        <button>Enter</button>
      </form>
    </div>
  );
};

export default PostForm;
