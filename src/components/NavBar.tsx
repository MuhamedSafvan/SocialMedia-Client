import React, { useState } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useMediaQuery, useTheme } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { setLogout, setMode } from "../state";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const user = useSelector((state: any) => state.user);
const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();

  const neutralLight = (theme.palette as any).neutral.light;
  const dark = (theme.palette as any).neutral.dark;
  const background = (theme.palette as any).background.default;
  const primaryLight = (theme.palette as any).primary.light;
  const alt = (theme.palette as any).background.alt;

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Test User";

  return (
    <div>
      <FlexBetween padding="1rem 6%" bgcolor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            BuzzSocial
          </Typography>
          {isNonMobileScreen && (
            <FlexBetween bgcolor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        {/* DESKTOP NAV */}
        {isNonMobileScreen ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? <DarkMode sx={{ fontSize: "25px" }} /> : <LightMode sx={{ fontSize: "25px", color: dark }} />}
            </IconButton>
            <Message sx={{ fontSize: "25px", color: dark }} />
            <Notifications sx={{ fontSize: "25px", color: dark }} />
            <Help sx={{ fontSize: "25px", color: dark }} />
            <FormControl variant="standard" defaultValue={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <Menu />
          </IconButton>
        )}
        {/* MOBILE NAV */}
        {!isNonMobileScreen && isMobileMenuToggled && (
          <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" bgcolor={background}>
            {/* Close Icon */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Close />
              </IconButton>
            </Box>
            {/* Menu Items */}
            <FlexBetween gap="3rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
                {theme.palette.mode === "dark" ? <DarkMode sx={{ fontSize: "25px" }} /> : <LightMode sx={{ fontSize: "25px", color: dark }} />}
              </IconButton>
              <Message sx={{ fontSize: "25px", color: dark }} />
              <Notifications sx={{ fontSize: "25px", color: dark }} />
              <Help sx={{ fontSize: "25px", color: dark }} />
              <FormControl variant="standard" defaultValue={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </div>
  );
};

export default NavBar;
