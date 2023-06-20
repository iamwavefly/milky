import htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const downloadDoc = (
  target: "pdf" | "jpeg" | "png",
  containerRef: any,
  fileName: string
) => {
  // Get the component's DOM node
  let domNode = containerRef.current;
  // Get the component's dimensions
  const { width, height } = domNode.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  //
  if (containerRef.current) {
    html2canvas(containerRef.current, {
      onclone: (documentClone: any) => {
        const elementsToHide =
          documentClone.querySelectorAll(".MuiCheckbox-root");
        elementsToHide.forEach((element: any) => {
          element.style.display = "none";
        });
      },
    })
      .then((canvas: any) => {
        const imgData = canvas.toDataURL("image/png", 1);
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [width, height],
        });
        if (target === "pdf") {
          pdf.addImage(imgData, "JPEG", 0, 0, width, height);
          pdf.save(fileName);
        }
        if (target === "png") {
          const downloadLink = document.createElement("a");
          downloadLink.href = imgData;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      })
      .catch((error: any) => {
        console.error("Error exporting table as PNG:", error);
      });
  }
};

export default downloadDoc;
