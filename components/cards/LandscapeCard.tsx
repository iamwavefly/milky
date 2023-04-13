import { Box, Typography } from "@mui/material";
import React from "react";
import MoreIcon from "../../public/assets/images/moreIcon.svg";
import Carlendar from "../../public/assets/images/calendar.svg";
import Styles from "./landscape.module.scss";

interface cardProps {
  id?: string | number;
  title?: string | number;
  subtitle?: string | number;
  content?: string | number;
  onClick?: () => void;
}
const LandscapeCard = ({
  id,
  title,
  subtitle,
  content,
  onClick,
}: cardProps) => {
  return (
    <Box className={Styles.container} onClick={onClick}>
      <Box className={Styles.title}>
        <Typography component="h2">{title}</Typography>
        <Box>
          <MoreIcon />
        </Box>
      </Box>
      {/* <Box className="subtitle"> */}
      <Typography component="p">{subtitle}</Typography>
      {/* </Box> */}
      <Box className={Styles.footer}>
        <Box>
          <Carlendar />
        </Box>
        <Typography component="h3">{content}</Typography>
      </Box>
    </Box>
  );
};

export default LandscapeCard;
