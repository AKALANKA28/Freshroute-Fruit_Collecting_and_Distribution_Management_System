import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import '../OrderList.css';
import logo from '../../../../assests/logo.png'

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
  logo:{
    width: 100,
    height: 100
  },
  signatureContainer:{
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: 20,
    marginRight: 5,
    alignItems: "flex-end"
  },
  dottedLine:{
    borderBottomWidth: 1,
    borderColor: "#333333",
    width: 100,
    marginBottom: 5
  },
  signatureText: {
    fontSize: 10,
    color: "#333333"
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    textSize: 10,
    color: "#666666"
  }
});

const Footer = () => (
  <Text style={styles.footer}>© 2024 Freshroute.lk copyright all right reserved.</Text>
);

const AssignedOrderReport = ({ dataList }) => {
  const currentDate = new Date().toLocaleString();
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
        <Image src = {logo} style={styles.logo}/>
          <Text style={styles.heading}>FreshRoute - Ongoing Order Details</Text>
          <Text style={{ textAlign: 'right', marginBottom: 10 }}>{currentDate}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Fruit Type</Text>
              <Text style={styles.tableColHeader}>Fruit Category</Text>
              <Text style={styles.tableColHeader}>Quality (kg)</Text>
              <Text style={styles.tableColHeader}>Quantity</Text>
              <Text style={styles.tableColHeader}>Placed Date</Text>
              <Text style={styles.tableColHeader}>Due Date</Text>
             
            </View>
            {dataList.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.fruit}</Text>
                <Text style={styles.tableCol}>{item.category}</Text>
                <Text style={styles.tableCol}>{item.quality}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>{item.placedDate}</Text>
                <Text style={styles.tableCol}>{item.dueDate}</Text>
                 
              </View>
            ))}

            <View style={styles.signatureContainer}>
              <View style={styles.dottedLine} />
              <Text style={styles.signatureText}>Signature</Text>
            </View>

          </View>
          <Footer/>
        </View>
      </Page>
    </Document>
  );
};

export default AssignedOrderReport;
