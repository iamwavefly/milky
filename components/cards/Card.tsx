import React from "react";
import Styles from "./card.module.scss";
import MoreIcon from "../../public/assets/images/moreIcon.svg";
import UserIcon from "../../public/assets/images/user.svg";
import Calendar from "../../public/assets/images/calendar.svg";
import ArrowRight from "../../public/assets/images/arrow-right.svg";
import { Box, Typography } from "@mui/material";

interface cardProps {
  title?: string | number;
  subtitle?: string | number;
  member?: string | number;
  settlement?: string | number;
  btn_name?: string | number;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  menuIcon?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Card = ({
  title,
  subtitle,
  member,
  settlement,
  btn_name,
  // memnerIcon:
  handleClick,
}: // menuIcon,
cardProps) => {
  return (
    <Box className={Styles.container}>
      <Box className={Styles.title}>
        <Typography component="h2">{title}</Typography>
        <Box
          style={{
            paddingInline: "5px",
            cursor: "pointer",
          }}
          // onClick={menuIcon}
        >
          <MoreIcon />
        </Box>
      </Box>
      <Box className={Styles.subtitle}>
        <Typography component="h3">{subtitle}</Typography>
      </Box>
      <Box className={Styles.content}>
        <Box>
          <UserIcon />
          <p>{member}</p>
        </Box>
        <Box>
          <Calendar />
          <p>{settlement}</p>
        </Box>
      </Box>
      <button onClick={handleClick}>
        <Typography variant="subtitle2">{btn_name}</Typography>
        <ArrowRight className={Styles.rightArrow} />
      </button>
    </Box>
  );
};

export default Card;
