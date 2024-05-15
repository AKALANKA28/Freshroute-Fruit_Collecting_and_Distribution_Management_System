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
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 1,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 10,
    fontWeight: "bold",
    width: "16.666%",
    textAlign: "center",
    backgroundColor : '#DEDEDE'
  },
  tableCol: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 8,
    width: "16.666%",
    textAlign: "center",
  },
  tbody2:{ flex:2, borderRightWidth:1, },
  logo: {
    width: 100,
    height: 100,
  },
  signatureContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: 20,
    marginRight: 5,
    alignItems: "flex-end",
  },
  dottedLine: {
    borderBottomWidth: 1,
    borderColor: "#333333",
    width: 100,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    color: "#333333",
  },
});

const Footer = () => (
  <Text style={styles.footer}>© 2024 Freshroute.lk copyright all right reserved.</Text>
);

const SupplierReport = ({ dataList }) => {
  const reportDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo'});

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
              {/* <Text style={styles.tableColHeader}>NIC</Text> */}
              <Text style={styles.tableColHeader}>Supplier Name</Text>
              <Text style={styles.tableColHeader}>Username</Text>
              <Text style={styles.tableColHeader}>Email</Text>
              <Text style={styles.tableColHeader}>Mobile</Text>
              <Text style={styles.tableColHeader}>City</Text>
              <Text style={styles.tableColHeader}>Lane</Text>
            </View>
            {dataList.map((supplier, index) => (
              <View key={index} style={styles.tableRow}>
                {/* <Text style={[styles.tableCol, styles.tbody2]}>{supplier.NIC}</Text> */}
                <Text style={[styles.tableCol, styles.tbody2]}>{supplier.name}</Text>
                <Text style={[styles.tableCol, styles.tbody2]}>{supplier.username}</Text>
                <Text style={[styles.tableCol, styles.tbody2]}>{supplier.email}</Text>
                <Text style={[styles.tableCol, styles.tbody2]}>{supplier.mobile}</Text>
                <Text style={[styles.tableCol, styles.tbody2]}>{supplier.city}</Text>
                <Text style={[styles.tableCol, styles.tbody2]}>{supplier.lane}</Text>
              </View>
            ))}
          </View>

          <View style={styles.signatureContainer}>
            <View style={styles.dottedLine} />
            <Text style={styles.signatureText}>Signature</Text>
          </View>

        </View>
        <Footer />
      </Page>
    </Document>
  );
};

export default SupplierReport;