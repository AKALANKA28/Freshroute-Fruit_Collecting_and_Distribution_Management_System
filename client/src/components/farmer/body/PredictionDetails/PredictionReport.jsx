import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import './predictions.css';
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
  // headerText: {
  //   fontSize: 20,
  //   color: "green",
  //   fontWeight: "bold",
  // },

  headerText: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
  },
  tableColHeader: {
    borderWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 10,
    fontWeight: "bold", // Add bold font weight
    color: "#333333",
    width: "16.666%",
    textAlign: "center",
  },
  tableCol: {
    borderWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 8,
    color: "#333333",
    width: "16.666%",
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

const PredictionReport = ({ dataList }) => {
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
              <Text style={styles.tableColHeader}>Fruit Type</Text>
              <Text style={styles.tableColHeader}>Sub Category</Text>
              <Text style={styles.tableColHeader}>Quality</Text>
              <Text style={styles.tableColHeader}>Quantity</Text>
              <Text style={styles.tableColHeader}>Price for One</Text>
              <Text style={styles.tableColHeader}>Date Can Be Given</Text>
            </View>
            {dataList.map((prediction, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{prediction.fruit}</Text>
                <Text style={styles.tableCol}>{prediction.subCategory}</Text>
                <Text style={styles.tableCol}>{prediction.quality}</Text>
                <Text style={styles.tableCol}>{prediction.quantity}</Text>
                <Text style={styles.tableCol}>{prediction.price}</Text>
                <Text style={styles.tableCol}>{prediction.dateCanBeGiven}</Text>
              </View>
            ))}
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

export default PredictionReport;
