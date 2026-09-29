import { Document, Page, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import clsx from "clsx";
import type { PdfDocumentProps } from "./PdfDocument.types";
import styles from "./PdfDocument.module.scss";

// Default page look shared by every PDF generated through this wrapper
const defaultStyles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
});

const PdfDocument = ({
  children,
  title,
  author,
  size = "A4",
  orientation = "portrait",
  width = "100%",
  height = "900px",
  additionalClassName,
}: PdfDocumentProps) => {
  return (
    <PDFViewer
      width={width}
      height={height}
      showToolbar
      className={clsx(styles['c-pdf-document'], additionalClassName)}
    >
      <Document title={title} author={author}>
        <Page size={size} orientation={orientation} style={defaultStyles.page}>
          {children}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfDocument;
