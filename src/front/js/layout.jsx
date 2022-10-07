import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop.jsx";

import { SignUp } from "./pages/signup.jsx";
import { Login } from "./pages/login.jsx";
import { Feed } from "./pages/feed.jsx";
import { Main } from "./pages/main.jsx";
import { NewPost } from "./pages/newpost.jsx";
import { Settings } from "./pages/settings.jsx";
import { SearchPosts } from "./pages/searchPosts.jsx";
import { SearchUsers } from "./pages/searchUsers.jsx";
import injectContext from "./store/appContext.jsx";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Feed />} path="/feed" />
            <Route element={<Main />} path="/main" />

            <Route element={<NewPost />} path="/newpost" />
            <Route element={<Settings />} path="/settings" />
            <Route element={<SearchPosts />} path="/search/posts" />
            <Route element={<SearchUsers />} path="/search/users" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
