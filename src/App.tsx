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
import * as profileService from "./services/profileService";

// stylesheets
import "./App.css";

// types
import { User, Post, Profile } from "./types/models";
import { PostFormData } from "./types/forms";
import Footer from "./components/Footer/Footer";
import UpdatePost from "./pages/UpdatePost/UpdatePost";

function App(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(authService.getUser());

  const [profiles, setProfiles] = useState<Profile[]>([]);

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

  const handleDeletePost = async (id: number): Promise<void> => {
    await postService.deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
    navigate("/posts");
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

  useEffect((): void => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const profileData: Profile[] = await profileService.getAllProfiles();
        setProfiles(profileData);
      } catch (error) {
        console.log(error);
      }
    };
    user ? fetchProfiles() : setProfiles([]);
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
              <PostPage user={user} posts={posts} profiles={profiles} handleDeletePost={handleDeletePost} />
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
              <UpdatePost post={posts} />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
