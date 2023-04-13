import React from "react";
import DownloadIcon from "../../public/assets/icons/download.svg";
import SearchIcon from "../../public/assets/icons/search.svg";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Styles from "./styles.module.scss";

interface headerProps {
  entries: string;
}

export default function MultipleTableHeader({ entries }: headerProps) {
  return (
    <Box bgcolor="#fff">
      {/* <Box
        px="24px"
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>{entries}</Typography>
        <Stack className={Styles.menu} direction="row" spacing="16px">
          <Box>
            <OutlinedInput
              placeholder="Search entries"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton sx={{ border: 0 }} edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Button>
            Export <DownloadIcon />
          </Button>
        </Stack>
      </Box> */}
      <Grid container>
        <Grid item xs={6}>
          <Box>
            <OutlinedInput
              placeholder="Search entries"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton sx={{ border: 0 }} edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  );
}
