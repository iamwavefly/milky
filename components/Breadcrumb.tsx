import Router, { useRouter } from "next/router";
import Link from "next/link";
import styles from "./breadcrumb.module.scss";
import React from "react";
import SeperatorIcon from "@/public/icons/arrow-right.svg";
import { Stack, Typography } from "@mui/material";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  title?: string;
}

const Breadcrumb = ({ items, title }: BreadcrumbProps) => {
  const router = useRouter();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing="4px"
      className={styles.breadcrumb}
    >
      {items?.length ? (
        items?.map(({ label, link }, index) => (
          <React.Fragment key={link}>
            {index > 0 && (
              <SeperatorIcon width="20px" height="20px" fill="#6F7A90" />
            )}
            <Typography
              component="a"
              onClick={() => router.push(link)}
              color={link ? "#6F7A90" : "#162031"}
              fontSize="15px"
              fontWeight={500}
              lineHeight="26px"
            >
              {label}
            </Typography>
          </React.Fragment>
        ))
      ) : (
        <Typography
          component="a"
          color="#162031"
          fontSize="15px"
          fontWeight={500}
          lineHeight="26px"
        >
          {title}
        </Typography>
      )}
    </Stack>
  );
};

export default Breadcrumb;
