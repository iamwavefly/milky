import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import ArrowIcon from "@/public/icons/arrow-up.svg";
import Styles from "./landscape.module.scss";

interface cardProps {
  linkTo?: string;
  currency?: string;
  linkText?: string;
  footer?: ReactNode;
  icon: ReactNode;
  variant?: "success" | "error";
  title: string | number;
  subtitle: string | number;
  noFilter?: boolean;
}
const LandscapeCard = ({
  linkTo,
  title,
  subtitle,
  icon,
  currency,
  variant,
  noFilter,
  footer,
  linkText,
}: cardProps) => {
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
          {!noFilter && (
            <Stack direction="row" alignItems="center" gap="8px">
              {/* icon */}
              <Stack
                className={Styles.label}
                bgcolor={variant === "error" ? "#FFF5F5" : "#EBFFF4"}
                direction="row"
                alignItems="center"
              >
                <Box
                  margin={0}
                  padding={0}
                  display="flex"
                  alignItems="center"
                  sx={{
                    transform:
                      variant === "error" ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  <ArrowIcon
                    width="16px"
                    height="16px"
                    fill={variant === "error" ? "#E84A5F" : "#0E9A4C"}
                  />
                </Box>
                <Typography
                  color={variant === "error" ? "#E84A5F" : "#0E9A4C"}
                  fontSize="13px"
                  lineHeight="21px"
                  fontWeight={500}
                  width="max-content"
                >
                  10%
                </Typography>
              </Stack>
              <Typography color="#3C4453" fontSize="12px">
                from last week
              </Typography>
            </Stack>
          )}
        </Stack>
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
            {title}
            {currency && (
              <Typography
                fontSize="15px"
                color="#162031"
                component="span"
                fontWeight={600}
              >
                .00
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

export default LandscapeCard;
