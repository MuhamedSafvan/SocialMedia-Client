import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { setFriends } from "../state";
import { baseUrl, IUser } from "../utils/constants";

interface Props {
  userId: string;
}
const FriendListWidget = ({ userId }: Props) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state: any) => state.token);
  const friends = useSelector((state: any) => state.user.friends);

  const getFriends = async () => {
    let response;
    if (userId) {
      response = await fetch(`${baseUrl}/user/friends?userId=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(`${baseUrl}/user/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    const data = await response.json();
    if (response.status === 200 && data) {
      dispatch(setFriends({ friends: data }));
    }
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <WidgetWrapper>
      <Typography
        color={(palette as any).neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{
          mb: "1.5rem",
        }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend: IUser) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            profilePic={friend.profilePic!}
            subtitle={friend.occupation!}
          ></Friend>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
