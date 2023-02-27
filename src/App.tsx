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

// services
import * as authService from "./services/authService";
import * as postService from "./services/postService";

// stylesheets
import "./App.css";

// types
import { User, Post } from "./types/models";
import PostPage from "./pages/Post/PostPage";
import { PostFormData } from "./types/forms";
import PostForm from "./pages/PostForm/PostForm";
import UpdatePost from "./pages/UpdatePost/UpdatePost";

function App(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(authService.getUser());

  const [posts, setPosts] = useState<Post[]>([]);

  // FOR POSTING FORM
  const handlePost = async (formData: PostFormData): Promise<void> => {
    try {
      const createPost = await postService.create(formData);
      console.log("CREATE POST", createPost);
      // setPosts(
      //   posts.map((post) => (post.id === createPost.id ? createPost : post))
      // );
      setPosts((prevPosts) => [createPost, ...prevPosts]);
      // setPosts([createPost, ...posts]);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Route
          path="/update"
          element={
            <ProtectedRoute user={user}>
              <UpdatePost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
