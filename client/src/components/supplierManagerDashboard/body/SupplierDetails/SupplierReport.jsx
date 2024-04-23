import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import './farmers.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: "green",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
    width: "33.33%",
    textAlign: "center",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    fontSize: 10,
    color: "#333333",
    width: "33.33%",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  line: {
    borderBottom: "1px solid #333333",
    marginBottom: 10,
  },
});

const SupplierReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
        
          <Text style={styles.heading}>Supplier Details</Text>
          <Text style={styles.headerText}>FreshRoute<br/></Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>NIC</Text>
              <Text style={styles.tableColHeader}>Supplier Name</Text>
              <Text style={styles.tableColHeader}>Username</Text>
              <Text style={styles.tableColHeader}>Email</Text>
              <Text style={styles.tableColHeader}>Mobile</Text>
              <Text style={styles.tableColHeader}>City</Text>
              <Text style={styles.tableColHeader}>Lane</Text>
            </View>
            {dataList.map((supplier, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{supplier.NIC}</Text>
                <Text style={styles.tableCol}>{supplier.name}</Text>
                <Text style={styles.tableCol}>{supplier.username}</Text>
                <Text style={styles.tableCol}>{supplier.email}</Text>
                <Text style={styles.tableCol}>{supplier.mobile}</Text>
                <Text style={styles.tableCol}>{supplier.city}</Text>
                <Text style={styles.tableCol}>{supplier.lane}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SupplierReport;
