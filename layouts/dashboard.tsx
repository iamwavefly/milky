import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import Logo from "../public/images/icon.svg";
import ArrowIcon from "../public/images/arrow.svg";
import NotificationIcon from "../public/images/notification-active.svg";
import Drawal from "@/components/drawal/Drawal";
import Head from "next/head";
import Styles from "./dashboard.module.scss";
import routes from "@/configs/routes";
import MenuIcon from "remixicon-react/Menu2LineIcon";
import { faker } from "@faker-js/faker";
import Router, { useRouter } from "next/router";

interface Props {
  children?: ReactNode;
  title: string;
}

const Dashboard = ({ children, title }: Props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleMenu = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("sidebar", showSidebar ? "open" : "close");
    const isSidebarOpen = localStorage.getItem("sidebar");
  }, [showSidebar]);

  useLayoutEffect(() => {
    const isSidebarOpen = localStorage.getItem("sidebar");
    isSidebarOpen === "close" &&
      isSidebarOpen !== undefined &&
      setShowSidebar(false);
  }, []);

  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{title} | alliancepay</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Stack className={Styles.container}>
        <Stack
          className={`${Styles.sidebar} ${showSidebar ? Styles.active : ""}`}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            height="60px"
            width="100%"
            className={Styles.logo}
          >
            <Stack
              height="26.87px"
              direction="row"
              spacing="1.8px"
              alignItems="center"
            >
              <Logo />
              <Typography
                color="#2E3192"
                fontSize="10px"
                fontWeight={500}
                component="p"
              >
                alliancepay
              </Typography>
            </Stack>
          </Stack>
          {/* brand menu */}
          <Stack
            bgcolor="#F5F6FE"
            width="226px"
            height="76px"
            mx="auto"
            mt="20px"
            direction="row"
            justifyContent="space-between"
            p="16px 14px"
            className={Styles.brand}
          >
            <Stack>
              <Typography fontWeight={500} fontSize="18px" lineHeight="24px">
                Godson Limited
              </Typography>
              <Typography
                fontWeight={400}
                mt="2px"
                color="#5F616D"
                fontSize="12px"
                lineHeight="18px"
              >
                Merchant ID : 123456789
              </Typography>
            </Stack>
            <IconButton
              sx={{
                width: "20px",
                height: "20px",
                p: "4px",
                my: "auto",
                color: "#92959F",
              }}
            >
              <ArrowIcon fill="#92959F" />
            </IconButton>
          </Stack>
          {/* navigation */}
          <nav className={Styles.navigations}>
            <ul>
              {routes?.map(({ id, Icon, link, name, func, nest }) => (
                <li
                  key={id}
                  className={pathname.includes(link) ? Styles.active : ""}
                  onClick={() => Router.push(link)}
                >
                  <Icon size={18} color="rgba(38, 43, 64, 0.8)" />
                  <Typography
                    fontWeight={500}
                    fontSize="14px"
                    lineHeight="20px"
                    color="rgba(38, 43, 64, 0.8)"
                    component="a"
                  >
                    {name}
                  </Typography>
                </li>
              ))}
            </ul>
          </nav>
        </Stack>
        {/* header */}
        <Stack
          className={Styles.topbar}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={toggleMenu}>
            <MenuIcon size={18} color="rgba(38, 43, 64, 0.8)" />
          </IconButton>
          <Stack direction="row" spacing="18px">
            <IconButton>
              <NotificationIcon />
            </IconButton>
            <Avatar
              src={faker.image.avatar()}
              sx={{ width: "40px", height: "40px" }}
            />
          </Stack>
        </Stack>
        <Stack className={Styles.content}>
          <Drawal />
          <Box>{children}</Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
