import React, {
  MouseEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import Logo from "../public/images/icon.svg";
import ArrowIcon from "../public/images/arrow.svg";
import NotificationActiveIcon from "../public/images/notification-active.svg";
import NotificationIcon from "remixicon-react/Notification4LineIcon";
import Drawal from "@/components/drawal/Drawal";
import Head from "next/head";
import Styles from "./dashboard.module.scss";
import routes from "@/configs/routes";
import MenuIcon from "remixicon-react/Menu2LineIcon";
import { faker } from "@faker-js/faker";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import CarretDownIcon from "../public/icons/carret-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "@/store/authSlice";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import substring from "@/helper/substring";
import Notifications from "@/components/notifications/notifications";
import TestModeBadge from "@/components/testModeBadge";
import truncate from "@/helper/truncate";

interface Props {
  children?: ReactNode;
  title: string;
}

const Dashboard = ({ children, title }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(0);
  const [photo, setPhoto] = useState("");
  const open = Boolean(anchorEl);
  const [labels, setLabels] = useState<any>([]);

  const dispatch = useDispatch();
  const { subsidiaries, user, notifications } = useSelector(selectUserState);
  const [verified, setVerified] = useState<undefined | boolean>(undefined);
  const [pendingApproval, setPendingApproval] = useState<undefined | boolean>(
    undefined
  );
  const [pendingVerification, setPendingVerification] = useState<
    undefined | boolean
  >(undefined);
  const { business_name, id, subsidiary_logo, verification_status } =
    subsidiaries;

  useEffect(() => {
    const imageUrl = `https://subsidiary-dashboard-api-service-dev.eks-alliancepay.com/subsidiary/dashboard/file/alliancepay-compliance-images/download?fileId=${subsidiary_logo}`;
    setPhoto(imageUrl);
  }, [subsidiary_logo]);

  useEffect(() => {
    if (verified || pendingApproval) {
      return setLabels(routes.slice(1));
    }
    setLabels(routes);
  }, [verified, pendingApproval]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleMenu = () => {
    setShowSidebar((prev) => !prev);
  };

  // nested menu
  useEffect(() => {
    openMenuId !== 0 && localStorage.setItem("menu", String(openMenuId));
  }, [openMenuId]);

  useEffect(() => {
    const menuId = localStorage.getItem("menu");
    if (typeof menuId === "string") {
      return setOpenMenuId(+menuId);
    }
  }, [openMenuId]);
  //
  useEffect(() => {
    if (verification_status) {
      setVerified(
        verification_status?.toLowerCase() === "active" ? true : false
      );
      setPendingApproval(
        verification_status?.toLowerCase() === "pending-approval" ? true : false
      );
      setPendingVerification(
        verification_status?.toLowerCase() === "pending-verification"
          ? true
          : false
      );
    }
  }, [verification_status]);

  useEffect(() => {
    localStorage.setItem("sidebar", showSidebar ? "open" : "close");
  }, [showSidebar]);

  useLayoutEffect(() => {
    const isSidebarOpen = localStorage.getItem("sidebar");
    isSidebarOpen === "close" &&
      isSidebarOpen !== undefined &&
      setShowSidebar(false);
  }, []);

  const { pathname } = useRouter();

  const NavLink = ({ link, id, Icon, name, nest, header, func }: any) => {
    return (
      <li key={id}>
        <Box
          className={
            pathname.includes(link as string) && !header
              ? Styles.active
              : !showSidebar && pathname.includes(link as string)
              ? Styles.active
              : ""
          }
          onClick={() =>
            func
              ? func()
              : link && !nest
              ? Router.push(link)
              : setOpenMenuId(id)
          }
          key={id}
        >
          <Icon size={22} onClick={() => Router.push(link)} />
          <Typography component="span">{name}</Typography>
          {nest && (
            <IconButton
              className={Styles.nestedIcon}
              sx={{ position: "absolute", right: "18px" }}
            >
              <CarretDownIcon />
            </IconButton>
          )}
        </Box>
        {nest && (
          <ul
            className={`${Styles.nested} ${
              openMenuId === id ? Styles.active : ""
            }`}
          >
            {nest?.map(({ key, link, name }: any) => (
              <li key={key}>
                <Link
                  className={
                    pathname.includes(link as string) ? Styles.active : ""
                  }
                  href={link}
                  key={key}
                >
                  <Box></Box>
                  <Typography component="span">{name}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <Head>
        <title>{title} | alliancepay</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {/* notification menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { padding: 0 } }}
      >
        <Notifications />
      </Menu>
      {/* notification menu ends */}
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
          {id ? (
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
                  {truncate(business_name, 15)}
                </Typography>
                <Typography
                  fontWeight={400}
                  mt="2px"
                  color="#5F616D"
                  fontSize="12px"
                  lineHeight="18px"
                >
                  Merchant ID: {id ?? 0}
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
          ) : (
            ""
          )}

          {/* navigation */}
          <nav className={Styles.navigations}>
            <ul>
              {labels?.map((props: any) => (
                <NavLink key={props.id} {...props} />
              ))}
            </ul>
          </nav>
        </Stack>
        {/* header */}
        <Box height="auto">
          {verified === false && <TestModeBadge />}
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
              <IconButton onClick={handleClick}>
                {notifications?.length ? (
                  <NotificationActiveIcon />
                ) : (
                  <NotificationIcon color="#262B40" size={20} />
                )}
              </IconButton>
              <Avatar src={photo} sx={{ width: "40px", height: "40px" }} />
            </Stack>
          </Stack>
        </Box>
        <Stack className={Styles.content}>
          <Drawal />
          <Box>{children}</Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
