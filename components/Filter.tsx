import { Box, Button, Menu, MenuItem, Stack } from "@mui/material";
import React, {
  MouseEvent,
  MutableRefObject,
  ReactNode,
  Ref,
  RefObject,
  useEffect,
  useState,
} from "react";
import Styles from "./styles.module.scss";
import htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CSVLink } from "react-csv";
import SearchIcon from "remixicon-react/SearchLineIcon";
import ArrowDownIcon from "@/public/icons/arrow-down.svg";

interface Props {
  variant?: "containedSmall" | "outlinedSmall";
  title: string;
  data: [];
  containerRef?: RefObject<HTMLInputElement> | MutableRefObject<undefined>;
  columns: any;
}

export default function Filter({
  variant,
  columns,
  data,
  containerRef,
  title,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [csvHeader, setCsvHeader] = useState<any>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const newColumns = columns?.map(
      ({ accessorKey, header }: { accessorKey: string; header: string }) => {
        if (typeof accessorKey === "string" || typeof header === "string") {
          return { label: header, key: accessorKey };
        }
      }
    );
    setCsvHeader(newColumns);
  }, [columns]);

  // download as png
  const downloadPNG = (target: "pdf" | "jpeg" | "png") => {
    // Get the component's DOM node
    const domNode = containerRef?.current;
    // Get the component's dimensions
    const { width, height } = domNode?.getBoundingClientRect() as any;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    domNode &&
      html2canvas(domNode).then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 1);
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [width, height],
        });
        if (target === "pdf") {
          pdf.addImage(imgData, "JPEG", 0, 0, width, height);
          pdf.save(`${title}.pdf`);
        }
        if (target === "png") {
          const downloadLink = document.createElement("a");
          downloadLink.href = imgData;
          downloadLink.download = `${title}.png`;
          downloadLink.click();
        }
      });
    handleClose();
  };

  return (
    <Box>
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
          <CSVLink
            filename={title}
            data={data}
            headers={csvHeader}
            onClick={handleClose}
          >
            Export as .csv
          </CSVLink>
        </MenuItem>
      </Menu>
      <Stack direction="row" gap="10px" alignItems="center">
        <Button
          variant={variant ?? "containedSmall"}
          sx={{ height: "40px" }}
          onClick={handleClick}
        >
          Export <ArrowDownIcon fill="#fff" height="18px" width="18px" />
        </Button>
      </Stack>
    </Box>
  );
}
