// services
import * as tokenService from "./tokenService";

// types
import { Post } from "../types/models";
import { PostFormData } from "../types/forms";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`;

async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    return (await res.json()) as Post[];
  } catch (error) {
    throw error;
  }
}

async function create(formData: PostFormData): Promise<Post> {
  try {
    console.log("Creating post:", formData);
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log("Response from server:", res);
    // return res.json();
    return (await res.json()) as Post;
  } catch (error) {
    throw error;
  }
}

async function deletePost(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function update(formData: PostFormData, post: Post): Promise<Post> {
  const postId = post.id;
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return (await res.json()) as Post;
  } catch (error) {
    throw error;
  }
}

export { getAllPosts, create, deletePost, update };
