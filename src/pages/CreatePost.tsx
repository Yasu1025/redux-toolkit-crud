import React, { memo, VFC, useState } from "react";
import { Button, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import {
  createAsyncPost,
  selectLoading,
  selectPost,
} from "../store/features/postSlice";

const CreatePost: VFC = memo(() => {
  const [values, setValues] = useState({ title: "", body: "" });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createAsyncPost(values));
    setValues({ title: "", body: "" });
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Create Post</h1>
        <Input
          placeholder="Enter Title"
          type="text"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          style={{ width: "400px" }}
        />
        <br />
        <br />
        <Input.TextArea
          placeholder="Enter Title"
          onChange={(e) => setValues({ ...values, body: e.target.value })}
          value={values.body}
          style={{ width: "400px" }}
          size="large"
        />
        <br />
        <br />
        <Space style={{ margin: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </Space>
      </form>
    </div>
  );
});

export default CreatePost;
