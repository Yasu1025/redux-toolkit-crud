import { memo, VFC, useState, useEffect } from "react";
import { Space, Button, Card, Input } from "antd";
import { IFPost } from "../models/Post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateAsyncPost } from "../store/features/postSlice";
import {
  deleteAsyncPost,
  selectEdit,
  setEdit,
} from "../store/features/postSlice";

type PropTypes = {
  post: IFPost;
};

const UserPost: VFC<PropTypes> = memo(({ post }) => {
  const [bodyText, setBodyText] = useState("");
  const isEdit = useSelector(selectEdit);
  const dispatch: AppDispatch = useDispatch();

  const onDeletePost = () => {
    dispatch(deleteAsyncPost({ userId: `${post.id}` }));
  };

  const onUpdate = async () => {
    await dispatch(
      updateAsyncPost({
        userId: post.id,
        values: {
          title: post.title,
          body: bodyText,
        },
      })
    );

    dispatch(setEdit({ edit: false }));
  };

  useEffect(() => {
    if (post.body) {
      setBodyText(post.body);
    }
  }, [post.body]);

  return (
    <>
      <Card type="inner" title={post.title}>
        <p>User ID; {post.id}</p>
        {isEdit ? (
          <>
            <Input.TextArea
              rows={4}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
            />
          </>
        ) : (
          <span>{post.body}</span>
        )}
      </Card>
      <Space
        size="middle"
        style={{ marginTop: 35, marginLeft: 5, float: "right" }}
      >
        {!isEdit ? (
          <>
            <Button
              type="primary"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(setEdit({ edit: true }))}
            >
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
          </>
        ) : (
          <>
            <Button
              type="primary"
              style={{ cursor: "pointer" }}
              onClick={onUpdate}
            >
              Save
            </Button>
            <Button
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(setEdit({ edit: false }))}
            >
              Cancel
            </Button>
          </>
        )}
      </Space>
    </>
  );
});

export default UserPost;
