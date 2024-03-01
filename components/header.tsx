import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import Styles from "@/styles/header.module.scss";
import Logo from "@/public/icons/logo.png";
import Image from "next/image";
import { navLinks } from "@/utils/links";
import Link from "next/link";
import AddCartIcon from "@/public/icons/add-cart.svg";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import Router from "next/router";

export default function Header() {
  const cart = useSelector((state: AppState) => state.cart.products);

  return (
    <Grid container className={Styles.container}>
      <Grid item>
        {/* logo */}
        <Link href="/">
          <Image src={Logo} height={135} alt="Milky Logo" />
        </Link>
      </Grid>
      <Grid item className={Styles.nav}>
        {/* nav links */}
        {navLinks?.map(({ id, link, name }, index) =>
          index < navLinks.length - 1 ? (
            <Link href={link} key={id}>
              <Typography variant="h5">{name}</Typography>
            </Link>
          ) : (
            // cart button
            <Stack
              direction="row"
              className={Styles.cart}
              onClick={() => Router.push("/cart")}
            >
              <IconButton className={Styles.cartButton}>
                <AddCartIcon />
              </IconButton>
              <Box>
                <Typography variant="h4" fontWeight={500}>
                  Cart
                </Typography>
                <Typography variant="h6">{cart.length ?? 0} Items</Typography>
              </Box>
            </Stack>
          )
        )}
      </Grid>
    </Grid>
  );
}
