import { Typography, useTheme } from "@mui/material";
import React from "react";
import WidgetWrapper from "../components/WidgetWrapper";
import FlexBetween from "../components/FlexBetween";
import { assetBaseUrl } from "../utils/constants";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const main = (palette as any).neutral.main;
  const dark = (palette as any).neutral.dark;
  const medium = (palette as any).neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src={`${assetBaseUrl}/info4.jpeg`}
        alt="advert"
        width="100%"
        height="auto"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
          Your pathway to stunning and immaculate beauty and make sure your skin
          is esfoliating skin and shining like light.
        </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
