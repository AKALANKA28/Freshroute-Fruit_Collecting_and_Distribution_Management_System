import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
  },
  value: {
    width: "70%",
  },
});

const SupplierReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Supplier Details Report</Text>
          {dataList.map((supplier, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>Supplier Name:</Text>
              <Text style={styles.value}>{supplier.name}</Text>
            </View>
            // Add other fields as necessary
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default SupplierReport;