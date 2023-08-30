import LandscapeCard from "@/components/cards/LandscapeCard";
import SubsidiaryRoutes from "@/public/mock/settlement";
import React from "react";
import SubcidiaryCard from "./SubcidiaryCard";
import Styles from "./style.module.scss";
import { Box, Stack } from "@mui/material";
import Router from "next/router";

const Subsidiaries = () => {
  return (
    <Stack direction="row" ml="auto" width="auto" justifyContent="center">
      <Box className={Styles.card__container}>
        {/* {SubsidiaryRoutes?.map(({ id, content, subtitle, title }) => (
          <LandscapeCard
            key={id}
            content={content}
            subtitle={subtitle}
            title={title}
            onClick={() => Router.push("/accounts/settlements/cycle/group")}
          />
        ))} */}
      </Box>
    </Stack>
  );
};

export default Subsidiaries;
