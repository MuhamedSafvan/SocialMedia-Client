import {
  DeleteOutlined,
  EditOutlined,
  ImageOutlined
} from "@mui/icons-material";
import { useState } from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";

import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../components/FlexBetween";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { setPosts } from "../state";
import { baseUrl } from "../utils/constants";

interface Props {
  profilePic: string;
}
const MyPostWidget = ({ profilePic }: Props) => {
  const dispatch = useDispatch();
  const [isimage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const mediumMain = (palette as any).neutral.mediumMain;
  const medium = (palette as any).neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("user", _id);
    formData.append("description", description);

    if (image) {
      formData.append("picture", image);
      formData.append("postPath", (image as any).name);
    }
    const postResponse = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const posts = await postResponse.json();
    if (postResponse.status === 200) {
      dispatch(setPosts({ posts }));
      setDescription("");
      setImage(null);
    }
  };
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={profilePic}></UserImage>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "100%",
            backgroundColor: (palette as any).neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isimage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            accept={{
              "image/jpeg": [".jpeg", ".png"],
            }}
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0] as any);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Photo Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{(image as any).name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap=".25rem" onClick={() => setIsImage(!isimage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: medium,
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {/* {isNonMobileScreen ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          </>
        )} */}
        <Button
          disabled={!description}
          onClick={handlePost}
          sx={{
            color: (palette.background as any).alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
