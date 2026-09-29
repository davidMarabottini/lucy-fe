import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import PdfDocument from "@/components/atoms/PdfDocument/PdfDocument";

// 1. Tipizzazione avanzata per le colonne del PDF
export interface PdfColumn<T> {
  key: string;
  header: string;
  // Opzionale: permette di formattare il dato prima di stamparlo
  render?: (row: T) => React.ReactNode; 
}

interface PdfDataTableProps<T> {
  title: string;
  data: T[];
  columns: PdfColumn<T>[];
}

// 2. Stili ottimizzati per il layout flexbox di @react-pdf
const pdfStyles = StyleSheet.create({
  section: {
    gap: 4,
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flex: 1, // Distribuisce uniformemente lo spazio delle colonne
    margin: 4,
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 2,
    fontSize: 12,
  },
  tableCell: {
    flex: 1,
    margin: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 2,
    fontSize: 10,
  },
});

// 3. Componente Generico
export const PdfDataTable = <T extends Record<string, any>>({
  title,
  data,
  columns,
}: PdfDataTableProps<T>) => {
  return (
    <PdfDocument>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>{title}</Text>

        <View style={pdfStyles.table}>
          {/* Render dell'Header */}
          <View style={pdfStyles.tableRow}>
            {columns.map((col, index) => (
              <Text key={`header-${index}`} style={pdfStyles.tableHeader}>
                {col.header}
              </Text>
            ))}
          </View>

          {/* Render dei Dati */}
          {data.map((row, rowIndex) => (
            <View style={pdfStyles.tableRow} key={`row-${rowIndex}`}>
              {columns.map((col, colIndex) => (
                <Text key={`cell-${rowIndex}-${colIndex}`} style={pdfStyles.tableCell}>
                  {col.render 
                    ? col.render(row) 
                    : String(row[col.key as keyof T] ?? "")}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </PdfDocument>
  );
};
