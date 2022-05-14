import { memo, VFC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages";
import CreatePost from "../pages/CreatePost";

const MyRouter: VFC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  );
});

export default MyRouter;
