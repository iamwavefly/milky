import React, { ReactNode, useState, useEffect, MutableRefObject } from "react";
import { Stack, Typography, capitalize } from "@mui/material";
import Router, { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";

interface headerProps {
  title?: string | ReactNode;
  entries?: number | string;
  searchText?: string;
  url?: string;
  selector?: string;
  transparent?: boolean;
  actions?: ReactNode;
  buttons?: ReactNode;
  columns?: ColumnDef<any, any>[];
  data?: [];
  containerRef?: MutableRefObject<undefined>;
  pageName?: string;
  updateFilter?: any;
  setSearch?: (term: string) => void;
}

export default function Header({
  entries,
  actions,
  title,
  pageName,
}: headerProps) {
  const [searchTextName, setSearchTextName] = useState("");
  const [pageUrlName, setPageUrlName] = useState("");

  const { pathname } = useRouter();

  useEffect(() => {
    const newPageName = pathname?.split("/")?.pop()?.replaceAll("-", " ");
    setPageUrlName(newPageName as string);
  }, [pathname]);

  useEffect(() => {
    const lastPathname = Router.pathname.split("/").pop();
    setSearchTextName(lastPathname?.replaceAll("-", " ") as string);
  }, []);

  return (
    <>
      {/* menu ends */}
      <Stack
        direction="row"
        height={"40px"}
        alignItems="flex-end"
        justifyContent="space-between"
        bgcolor="transparent"
        px={0}
        gap="19px"
        mb="20px"
      >
        {title ? (
          title
        ) : (
          <Typography
            color="#070F1C"
            fontSize="18px"
            fontWeight={600}
            lineHeight="26px"
          >
            {capitalize(pageName ?? pageUrlName)} - {entries ?? 0}
          </Typography>
        )}
        <Stack direction="row" spacing="16px">
          {actions}
        </Stack>
      </Stack>
    </>
  );
}
