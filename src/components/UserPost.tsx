import { memo, VFC } from "react";
import { Space, Button, Card } from "antd";
import { IFPost } from "../models/Post";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteAsyncPost } from "../store/features/postSlice";

type PropTypes = {
  post: IFPost;
};

const UserPost: VFC<PropTypes> = memo(({ post }) => {
  const dispatch: AppDispatch = useDispatch();

  const onDeletePost = () => {
    dispatch(deleteAsyncPost({ userId: `${post.id}` }));
  };

  return (
    <>
      <Card type="inner" title={post.title}>
        <p>User ID; {post.id}</p>
        <span>{post.body}</span>
      </Card>
      <Space
        size="middle"
        style={{ marginTop: 35, marginLeft: 5, float: "right" }}
      >
        <Button type="primary" style={{ cursor: "pointer" }}>
          EDIT
        </Button>
        <Button
          type="primary"
          style={{ cursor: "pointer" }}
          onClick={onDeletePost}
          danger
        >
          DELETE
        </Button>
      </Space>
    </>
  );
});

export default UserPost;
