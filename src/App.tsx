// npm modules
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// page components
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Profiles from "./pages/Profiles/Profiles";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

// components
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// pages
import PostPage from "./pages/Post/PostPage";
import PostForm from "./pages/PostForm/PostForm";
// import UpdatePost from "./pages/UpdatePost/UpdatePost";

// services
import * as authService from "./services/authService";
import * as postService from "./services/postService";

// stylesheets
import "./App.css";

// types
import { User, Post } from "./types/models";
import { PostFormData } from "./types/forms";
import Footer from "./components/Footer/Footer";

function App(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(authService.getUser());

  const [posts, setPosts] = useState<Post[]>([]);

  // FOR POSTING FORM
  const handlePost = async (formData: PostFormData): Promise<void> => {
    try {
      const createPost = await postService.create(formData);
      console.log("CREATE POST", createPost);
      setPosts((prevPosts) => [createPost, ...prevPosts]);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUpdate = async (formData: PostFormData) => {
  //   // const updatedPost = await postService.update(formData);
  //   const updatedPosts = await postService.getAllPosts();
  //   setPosts(updatedPosts);
  //   navigate("/posts");
  // };

  // const handleUpdate = async (
  //   formData: PostFormData,
  //   postId: number
  // ): Promise<void> => {
  //   try {
  //     const updatedPost = await postService.update({ post });
  //     console.log("UPDATED POST", updatedPost);
  //     setPosts((prevPosts) =>
  //       prevPosts.map((post) =>
  //         post.id === updatedPost.id ? updatedPost : post
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleUpdate = async (updatedPost: Post) => {
  //   const newPost = await postService.update(updatedPost);
  //   setPosts(posts.map((post) => (post.id === newPost.id ? newPost : post)));
  //   navigate("/posts");
  // };

  const handleLogout = (): void => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const handleAuthEvt = (): void => {
    setUser(authService.getUser());
  };

  useEffect((): void => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const postData: Post[] = await postService.getAllPosts();
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };
    user ? fetchPosts() : setPosts([]);
  }, [user]);

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute user={user}>
              <PostPage user={user} posts={posts} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <PostForm handlePost={handlePost} />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <UpdatePost />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
