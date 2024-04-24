import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import './farmers.css';
import logo from '../../../../assests/logo.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginLeft: 10,
  },
  reportDateTime: {
    fontSize: 10,
    color: "#333333",
    textAlign: "right",
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
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 10,
    fontWeight: "bold", // Add bold font weight
    color: "#333333",
    width: "14.285%",
    textAlign: "center",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 8,
    color: "#333333",
    width: "14.285%",
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

const Footer = () => (
  <Text style={styles.footer}>© 2024 Freshroute.lk copyright all right reserved.</Text>
);

const SupplierReport = ({ dataList }) => {
  const reportDateTime = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Image src={logo} style={styles.logo} />
              <Text style={styles.headerText}>FreshRoute</Text>
            </View>
            <Text style={styles.reportDateTime}>{reportDateTime}</Text>
          </View>
          <Text style={styles.heading}>Freshroute - Supplier Details</Text>
          
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
        <Footer />
      </Page>
    </Document>
  );
};

export default SupplierReport;
