import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { baseUrl, IUser } from "../../utils/constants";
import NavBar from "../../components/NavBar";
import UserWidget from "../../widgets/UserWidget";
import FriendListWidget from "../../widgets/FriendListWidget";
import MyPostWidget from "../../widgets/MyPostWidget";
import AllPostsWidget from "../../widgets/AllPostsWidget";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const token = useSelector((state: any) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`${baseUrl}/user?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();


    setUser(data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }
  const profileUser = user as IUser;

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget
            userId={profileUser._id}
            profilePic={profileUser.profilePic!}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={profileUser._id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget profilePic={profileUser.profilePic!} />
          <Box m="2rem 0" />
          <AllPostsWidget userId={profileUser._id} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
