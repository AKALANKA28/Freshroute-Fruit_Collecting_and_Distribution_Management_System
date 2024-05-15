import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import './TransportFee.css';
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
    width: "120%",
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
  signatureContainerCenter: {
    marginTop: 40, 
    flexDirection: "column", 
    alignItems: "center", 
    marginRight: 20, 
  },
  signatureContainer: {
    marginTop: 40,
    flexDirection: "column", 
    alignItems: "flex-end", 
    marginRight: 20, 
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    marginTop: 8,
    borderStyle: "dashed",
  },
  signatureText: {
    fontSize: 10,
    color: "#333333",
  },
});

const Footer = () => (
  <Text style={styles.footer}>© 2024 Freshroute.lk copyright all right reserved.</Text>
);

const SalaryReport = ({ dataList }) => {
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
          <Text style={styles.heading}>Freshroute - Transport Fee Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Vehicle No</Text>
              <Text style={styles.tableColHeader}>Vehicle Type</Text>
              <Text style={styles.tableColHeader}>Conditions</Text>
              <Text style={styles.tableColHeader}> Capacity</Text>
              <Text style={styles.tableColHeader}> Price per km(Rs)</Text>
            
            </View>
            {dataList.map((transportFee, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{transportFee.vehicle_no}</Text>
                <Text style={styles.tableCol}>{transportFee.type}</Text>
                <Text style={styles.tableCol}>{transportFee.conditions}</Text>
                <Text style={styles.tableCol}>{transportFee.capacity}</Text>
                <Text style={styles.tableCol}>{formatCurrency(transportFee.price)}</Text>
              </View>
            ))}
          </View>
          <View style={styles.signatureContainer}>
          <View style={styles.signatureContainerCenter}>
            <View style={styles.signatureLine} />
           <Text style={styles.signatureText}>Signature</Text>
        </View>
        </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};


// Function to format currency
const formatCurrency = (amount) => {
  if (amount == null || amount == 0 ) {
    return ""; // or any default value you prefer
  }
  return `Rs:${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default SalaryReport;
