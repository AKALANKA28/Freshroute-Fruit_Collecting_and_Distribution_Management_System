import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import './farmers.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
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
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { 
    flexDirection: "row",
    backgroundColor: "#FFF",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    flex: 1,
    fontSize: 12,
  },
  tableCol: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    flex: 1,
    fontSize: 10,
  },
});

const SupplierReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Freshroute - Supplier Details Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>NIC</Text>
              <Text style={styles.tableColHeader}>Supplier Name</Text>
              <Text style={styles.tableColHeader}>Username</Text>
              <Text style={styles.tableColHeader}>Email</Text>
              <Text style={styles.tableColHeader}>City</Text>
            </View>
            {dataList.map((supplier, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{supplier.NIC}</Text>
                <Text style={styles.tableCol}>{supplier.name}</Text>
                <Text style={styles.tableCol}>{supplier.username}</Text>
                <Text style={styles.tableCol}>{supplier.email}</Text>
                <Text style={styles.tableCol}>{supplier.city}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SupplierReport;
