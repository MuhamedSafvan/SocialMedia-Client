import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useState } from "react";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../components/FlexBetween";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { setPost } from "../state";
import { assetBaseUrl, baseUrl, IUser } from "../utils/constants";



interface Props {
  postId: string;
  user: IUser;
  description: string;
  postPath: string;
  likes: any;
  comments: string[];
}
const PostWidget = ({
  postId,
  user,
  description,
  postPath,
  likes,
  comments,
}: Props) => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.token);
  const loggedInUserId = useSelector((state: any) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = (palette as any).neutral.main;
  const primary = (palette as any).primary.main;
  const name = `${user.firstName} ${user.lastName}`;

  const [isComments, setIsComments] = useState(false);

  const addRemoveLike = async () => {
    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const updatedPost = await response.json();
    if (response.status === 200 && updatedPost) {
      dispatch(setPost({ post: updatedPost }));
    }
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={user._id}
        name={name}
        profilePic={user.profilePic!}
        subtitle={user.location!}
      />
      <Typography
        color={main}
        sx={{
          mt: "1rem",
        }}
      >
        {description}
      </Typography>
      {postPath && (
        <img
          src={`${assetBaseUrl}/${postPath}`}
          alt="post"
          width="100%"
          height="auto"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Like Section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={addRemoveLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* Comment Section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography
                sx={{
                  color: main,
                  m: "0.5rem 0",
                  pl: "1rem",
                }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
