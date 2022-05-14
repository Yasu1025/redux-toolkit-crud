import { memo, VFC, useState } from "react";
import { Input, Space, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  getAsyncPost,
  selectPost,
  selectLoading,
} from "../store/features/postSlice";
import LoadingCard from "./LoadingCard";
import { IFPost } from "../models/Post";
import UserPost from "../components/UserPost";

const Home: VFC = memo(() => {
  const [userId, setUserId] = useState("");
  const post: IFPost[] = useSelector(selectPost);
  const loading: boolean = useSelector(selectLoading);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onFetchUserPost = () => {
    if (!userId) return;
    dispatch(getAsyncPost({ userId }));
    setUserId("");
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Fetch Post</h1>
      <Input
        placeholder="Enter user ID"
        type="number"
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
        style={{ width: "300px" }}
      />
      <br />
      <Space size="small" style={{ margin: 10 }}>
        <Button type="primary" onClick={onFetchUserPost}>
          Fetch User Post
        </Button>
        <Button type="primary" onClick={() => navigate("/create-post")}>
          Create user Post
        </Button>
      </Space>
      <br />
      <hr />
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <>
          {post.length > 0 && (
            <div className="site-card-border-less-wrapper">
              <UserPost post={post[0]} />
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default Home;
