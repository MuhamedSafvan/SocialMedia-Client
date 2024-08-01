import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/constants";
import { setPosts } from "../state";
import PostWidget from "./PostWidget";

interface Props {
  userId: string;
  isProfile?: boolean;
}

const AllPostsWidget = ({ userId, isProfile = false }: Props) => {
  const dispatch = useDispatch();
  console.log("currentUserId", userId);
  const posts = useSelector((state: any) => state.posts);
  const token = useSelector((state: any) => state.token);

  const getPosts = async () => {
    console.log("posts are calling..");

    const postResponse = await fetch(`${baseUrl}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await postResponse.json();
    dispatch(setPosts({ posts }));
  };

  const getUserPosts = async () => {
    const postResponse = await fetch(`${baseUrl}/posts?user=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await postResponse.json();
    dispatch(setPosts({ posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);
  return (
    <>
      {posts.map(
        ({ _id, user, description, postPath, likes, comments }: any) => (
          <PostWidget
            key={_id}
            postId={_id}
            user={user}
            description={description}
            postPath={postPath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default AllPostsWidget;
