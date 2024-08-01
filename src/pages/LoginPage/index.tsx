import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Lottie from "react-lottie";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import animationData from "../../utils/animations/landing.json";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const dark = (theme.palette as any).neutral.dark;

  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}
        bgcolor={(theme.palette as any).background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          BuzzSocial
        </Typography>
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ fontSize: "25px" }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ fontSize: "25px", color: dark }} />
          )}
        </IconButton>
      </Box>
      <Box>
        {/* <NavBar /> */}

        <Box
          width={isNonMobileScreen ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          bgcolor={(theme.palette as any).background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to BuzzSocial, the Social Media for Sociopaths!
          </Typography>
          <Lottie options={defaultOptions} height={400} width={400} />
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
