import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import ArrowIcon from "@/public/icons/arrow-up.svg";
import Styles from "./overview.module.scss";
import stringToCurrency from "@/helper/formatCurrency";

interface cardProps {
  linkTo?: string;
  currency?: string;
  linkText?: string;
  footer?: ReactNode;
  icon: ReactNode;
  variant?: "success" | "error";
  title: string | number;
  subtitle: string | number;
}
const OverviewCard = ({
  linkTo,
  title,
  subtitle,
  icon,
  currency,
  footer,
  linkText,
}: cardProps) => {
  const [amount, cent] = stringToCurrency?.(title)?.split?.(".");

  return (
    <Box
      border="1px solid #e8eaed"
      borderRadius="8px"
      flex={1}
      overflow="hidden"
    >
      <Box className={Styles.container}>
        {/* heading */}
        <Stack className={Styles.heading} direction="row">
          <IconButton className={Styles.icon}>{icon}</IconButton>
          {/* right section */}
          {/* title */}
          <Box className={Styles.title}>
            <Typography
              component="h2"
              lineHeight="28px"
              color="#070F1C"
              letterSpacing="-0.5px"
              fontSize="20px"
              fontWeight={700}
            >
              {currency && (
                <Typography
                  fontSize="16px"
                  color="#3C4453"
                  component="span"
                  fontWeight={600}
                >
                  {currency}
                </Typography>
              )}{" "}
              {currency ? amount : title}
              {currency && (
                <Typography
                  fontSize="15px"
                  color="#162031"
                  component="span"
                  fontWeight={600}
                >
                  .{cent}
                </Typography>
              )}
            </Typography>
            <Typography
              lineHeight="21px"
              color="#586379"
              fontSize="13px"
              fontWeight={500}
            >
              {subtitle}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {footer ??
        (linkTo && (
          <Box className={Styles.linkPanel}>
            <Typography component="a" href={linkTo}>
              {linkText ?? "View balance"}{" "}
              <ArrowIcon width="16px" height="16px" fill="#0048B1" />
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default OverviewCard;
