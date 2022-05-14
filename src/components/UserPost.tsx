import { memo, VFC } from "react";
import { Space, Button, Card } from "antd";
import { IFPost } from "../models/Post";

type PropTypes = {
  post: IFPost;
};

const UserPost: VFC<PropTypes> = memo(({ post }) => {
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
        <Button type="primary" style={{ cursor: "pointer" }} danger>
          DELETE
        </Button>
      </Space>
    </>
  );
});

export default UserPost;
