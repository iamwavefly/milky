import React, {
  ReactNode,
  useState,
  MouseEvent,
  useRef,
  useEffect,
} from "react";
import DownloadIcon from "../../public/icons/download.svg";
import CarretDownIcon from "../../public/icons/carret-down.svg";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./styles.module.scss";
import htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CSVLink } from "react-csv";
import SearchIcon from "remixicon-react/SearchLineIcon";
import DropdownMenu from "../DropdownMenu";

interface headerProps {
  containerRef?: any;
  data?: any;
  columns?: any[];
  entries: string;
  buttons?: ReactNode;
  entryOnly?: boolean;
  noButton?: boolean;
  setSearch?: (term: string) => void;
}

export default function Header({
  containerRef,
  data,
  columns,
  entries,
  buttons,
  entryOnly,
  noButton,
  setSearch,
}: headerProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [csvHeader, setCsvHeader] = useState<any>([]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const newColumns = columns?.map(({ accessorKey, header }) => {
      if (typeof accessorKey === "string" || typeof header === "string") {
        return { label: header, key: accessorKey };
      }
    });
    setCsvHeader(newColumns);
  }, [columns]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // download as png
  const downloadPNG = (target: "pdf" | "jpeg" | "png") => {
    // Get the component's DOM node
    const domNode = containerRef.current;
    // Get the component's dimensions
    const { width, height } = domNode.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    html2canvas(domNode).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [width, height],
      });
      if (target === "pdf") {
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save("download.pdf");
      }
      if (target === "png") {
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = "component.png";
        downloadLink.click();
      }
    });
  };

  return (
    <>
      {/* menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => downloadPNG("png")}>Export as .png</MenuItem>
        <MenuItem onClick={() => downloadPNG("pdf")}>Export as .pdf</MenuItem>
        <MenuItem>
          <CSVLink data={data} headers={csvHeader}>
            Export as .csv
          </CSVLink>
        </MenuItem>
      </Menu>
      {/* menu ends */}
      <Stack
        direction="row"
        height="91px"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#FFFFFF"
        padding="25px 28px"
        marginTop="35px"
        gap="19px"
      >
        <TextField
          variant="standard"
          placeholder="Search transactions or enter keyword"
          sx={{
            width: "100%",
            "& input": {
              height: 0,
            },
          }}
          onChange={(e) => setSearch && setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton sx={{ border: 0, left: 20 }} edge="start">
                  <SearchIcon color="#69696B" size={19} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" gap="10px" alignItems="center">
          <DropdownMenu title="NGN" />
          <Button
            variant={buttons ? "outlined" : "contained"}
            onClick={handleClick}
            sx={{
              border: 0,
              height: "38px",
              py: "0 !important",
              fontSize: "12px",
            }}
          >
            Export
            {/* <Stack
              pl="10px"
              ml="auto"
              justifyContent="center"
              borderLeft="1px solid #E4E8F2"
              height="100%"
            >
              <CarretDownIcon />
            </Stack> */}
          </Button>
          {buttons}
        </Stack>
      </Stack>
    </>
  );
}
