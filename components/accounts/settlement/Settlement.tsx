import accountsRoutes from "@/public/mock/account";
import React from "react";
import Styles from "./settlement.module.scss";

import AccountCard from "../../cards/Card";
import { Box } from "@mui/material";

const Settlement = () => {
  return (
    <Box mx="auto" justifyContent="center" display="flex">
      <Box className={Styles.card__wrapper}>
        {accountsRoutes?.map((x) => (
          <AccountCard
            btn_name={x?.btn_name}
            key={x?.id}
            member={x?.member}
            title={x?.title}
            subtitle={x?.subtitle}
            settlement={x?.settlement}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Settlement;
