import { Box } from "@mui/material";
import { assetBaseUrl } from "../utils/constants";

interface Props {
  image: string;
  size?: string;
}

const UserImage = ({ image, size = "60px" }: Props) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={`${assetBaseUrl}/${image}`}
        alt="user"
      />
    </Box>
  );
};

export default UserImage;
