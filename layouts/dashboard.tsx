import React, {
  MouseEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Avatar,
  Badge,
  BadgeProps,
  Box,
  Button,
  Collapse,
  Dialog,
  Divider,
  IconButton,
  Menu,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "../public/images/logo.svg";
import ArrowIcon from "@/public/images/arrow.svg";
import NotificationActiveIcon from "../public/images/notification-active.svg";
import NotificationIcon from "@/public/icons/bell.svg";
import Drawal from "@/components/drawal/Drawal";
import Head from "next/head";
import Styles from "./dashboard.module.scss";
import { dashboard } from "@/configs/routes";
import MenuIcon from "remixicon-react/Menu2LineIcon";
// import { faker } from "@faker-js/faker";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import CarretDownIcon from "@/public/images/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState, setUserState } from "@/store/authSlice";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import substring from "@/helper/substring";
import Notifications from "@/components/notifications/notifications";
import TestModeBadge from "@/components/testModeBadge";
import truncate from "@/helper/truncate";
import { TransitionProps } from "@mui/material/transitions";
import NewSubsidiary from "@/components/form/newSubsidiary";
import NewBusiness from "@/components/form/newBusiness";
import { selectAppState, setMenuState } from "@/store/appSlice";
import Breadcrumb from "@/components/Breadcrumb";
import Modal from "@/components/modal/modal";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  children?: ReactNode;
  title: string;
  onboarding?: boolean;
  breadcrumbLinks?: any;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 3,
    border: `1.3px solid ${theme.palette.background.paper}`,
    fontWeight: 900,
    fontSize: "8px",
    height: "17px",
    minheight: "17px",
    minWidth: "17px",
    maxWidth: "17px",
  },
}));

const Dashboard = ({ children, title, onboarding, breadcrumbLinks }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openBizModal, setOpenBizModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<number | undefined>(0);
  const [activeBizMenu, setActiveBizMenu] = useState(false);
  const [photo, setPhoto] = useState("");
  const open = Boolean(anchorEl);
  const [labels, setLabels] = useState<any>([]);
  const [otherSubsidiaries, setOtherSubsidiaries] = useState([]);
  const [verified, setVerified] = useState<undefined | boolean>(undefined);
  const [pendingApproval, setPendingApproval] = useState<undefined | boolean>(
    undefined
  );
  const [pendingVerification, setPendingVerification] = useState<
    undefined | boolean
  >(undefined);

  const { reload } = useSelector(selectAppState);
  const { subsidiaries, user, notifications } = useSelector(selectUserState);
  const { menu } = useSelector(selectAppState);

  const { business_name, id, subsidiary_logo, verification_status } =
    subsidiaries ?? {};

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/user/subsidiaries`,
    "get"
  );

  // update logo subsidiaries
  const fetchSubsidiaries = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information/view`,
    "get"
  );

  const changeSettlementApi = useFetch(
    `${baseUrl}/dashboard/session/set-subsidiary`,
    "post"
  );
  // user profile api
  const userApi = useFetch(`${baseUrl}/dashboard/me`, "get");

  const dispatch = useDispatch();

  // fetch subsidiaries type
  useEffect(() => {
    fetchSubsidiaries.handleSubmit();
  }, []);

  // set subsidiary logo
  useEffect(() => {
    setPhoto(fetchSubsidiaries?.data?.data?.logo);
  }, [fetchSubsidiaries?.data?.data]);
  // toggle menu state
  useEffect(() => {
    dispatch(setMenuState(activeBizMenu));
  }, [activeBizMenu]);

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const { status } = changeSettlementApi?.data;
    if (status === "success") {
      userApi.handleSubmit();
      setActiveBizMenu(false);
    }
  }, [changeSettlementApi?.data]);

  useEffect(() => {
    if (userApi?.data?.subsidiary_details) {
      const defaultBusiness =
        userApi?.data?.subsidiary_details?.subsidiaries?.find(
          // (business: { is_default: boolean }) => business?.is_default
          (business: { is_default: boolean }) => business
        );
      dispatch(
        setUserState({
          notifications: userApi?.data?.notifications,
          subsidiaries: defaultBusiness,
        })
      );
    }
  }, [userApi?.data]);

  useEffect(() => {
    const allSubsidiaries = data?.subsidiary_details?.subsidiaries;
    const fnSubsidiaries = allSubsidiaries?.filter(
      (subsidiary: { id: number }) => subsidiary?.id !== id
    );
    setOtherSubsidiaries(fnSubsidiaries);
  }, [data, id]);

  useEffect(() => {
    if (verified || pendingApproval) {
      // return setLabels(routes.slice(1));
    }
    setLabels(dashboard);
  }, [verified, pendingApproval]);

  const handleClickBizModal = () => {
    setOpenBizModal(true);
  };

  const handleCloseBizModal = () => {
    setOpenBizModal(false);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNavMenu = (id: number) => {
    if (id === openMenuId) return setOpenMenuId(undefined);
    setOpenMenuId(id);
  };

  const toggleSettlement = (id: number) => {
    changeSettlementApi.handleSubmit({
      subsidiary_id: id,
      set_as_default: true,
    });
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
              : toggleNavMenu(id)
          }
          key={id}
        >
          <Icon
            width="24px"
            height="24px"
            size={22}
            onClick={() => Router.push(link)}
          />
          <Typography component="span">{name}</Typography>
          {nest && (
            <IconButton
              className={`${Styles.nestedIcon} ${
                openMenuId === id ? Styles.active : ""
              }`}
              sx={{
                position: "absolute",
                right: "18px",
                width: "18px",
                height: "18px",
                padding: 0,
              }}
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
        <title>{title} | ARCA</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {/* notification menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: { padding: 0 } } }}
      >
        <Notifications />
      </Menu>
      {/* New Business Modal */}
      <Modal
        isOpen={openBizModal}
        close={handleClickBizModal}
        onClose={handleCloseBizModal}
        title="Create a New Business"
      >
        <NewBusiness closeHandler={handleCloseBizModal} reload={handleSubmit} />
      </Modal>

      <Stack className={Styles.container}>
        <Stack
          className={`${Styles.sidebar} ${showSidebar ? Styles.active : ""}`}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            width="100%"
            mt="24px"
            className={Styles.logo}
          >
            <Logo />
          </Stack>
          {/* brand menu */}
          {id ? (
            <Box px="16px">
              <Stack
                borderRadius="8px"
                bgcolor="#F0F9FF"
                width="100%"
                height="auto"
                mx="auto"
                mt="56px"
                p="16px"
                border="1px solid #E8EAED"
                className={Styles.brand}
              >
                {/* default business */}
                <Stack direction="row" justifyContent="space-between">
                  <Stack>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {truncate(business_name, 15)}
                    </Typography>
                    <Typography
                      fontWeight={400}
                      color="#3C4453"
                      fontSize="13px"
                      lineHeight="21px"
                    >
                      Merchant ID: {id ?? 0}
                    </Typography>
                  </Stack>
                  <IconButton
                    onClick={() => setActiveBizMenu((prev) => !prev)}
                    sx={{
                      p: "4px",
                      my: "auto",
                      color: "#92959F",
                    }}
                    className={activeBizMenu ? Styles.active : ""}
                  >
                    <ArrowIcon fill="#92959F" />
                  </IconButton>
                </Stack>
                {/* other businesses */}
                <Collapse in={activeBizMenu}>
                  <Stack>
                    <Stack mt="14px" spacing="8px">
                      {otherSubsidiaries?.map(
                        ({
                          business_name,
                          business_id,
                          id,
                        }: typeof subsidiaries) => (
                          <Box
                            onClick={() => toggleSettlement(id)}
                            key={id}
                            className={Styles.subsidiary}
                          >
                            <Typography fontSize="14px" color="#1D2A23">
                              {business_name}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Stack>
                    <Divider sx={{ mt: "14px" }} />
                    <Button
                      sx={{ mt: "20px", height: "36px" }}
                      variant="contained"
                      onClick={handleClickBizModal}
                    >
                      Add new business
                    </Button>
                  </Stack>
                </Collapse>
              </Stack>
            </Box>
          ) : (
            ""
          )}

          {/* navigation */}
          <Box px="16px" overflow="auto">
            <nav
              className={`${Styles.navigations} ${
                menu?.disabled ? Styles.disabled : ""
              }`}
            >
              <ul>
                {labels?.map((props: any) => (
                  <NavLink key={props.id} {...props} />
                ))}
              </ul>
            </nav>
          </Box>
        </Stack>
        {/* header */}
        <Box height="auto">
          {/* {verified === false && <TestModeBadge />} */}
          <Stack
            className={Styles.topbar}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Breadcrumb items={breadcrumbLinks} title={title} />
            <Stack direction="row" spacing="18px">
              <IconButton onClick={handleClick}>
                <StyledBadge
                  badgeContent={notifications?.length}
                  color="error"
                  max={9}
                >
                  <NotificationIcon />
                </StyledBadge>
              </IconButton>
              <Avatar src={photo} sx={{ width: "40px", height: "40px" }} />
            </Stack>
          </Stack>
        </Box>
        <Stack className={Styles.content}>
          <Drawal />
          <Box padding={onboarding ? 0 : "32px"}>{children}</Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
