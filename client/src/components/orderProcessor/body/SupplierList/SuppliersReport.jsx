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
  }
});

const SuppliersReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
        <Image src = {logo} style={styles.logo}/>
          <Text style={styles.heading}>FreshRoute - Supplier Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Supplier Name</Text>
              <Text style={styles.tableColHeader}>Fruit Type</Text>
              <Text style={styles.tableColHeader}>Fruit Category</Text>
              <Text style={styles.tableColHeader}>Quality</Text>
              <Text style={styles.tableColHeader}>Total Quantity (kg)</Text>
              <Text style={styles.tableColHeader}>Price for 1kg</Text>
              <Text style={styles.tableColHeader}>Date Can Be Given</Text>
              <Text style={styles.tableColHeader}>Contact No</Text>
              
              
             
            </View>
            {dataList.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.supplierName}</Text>
                <Text style={styles.tableCol}>{item.fruit}</Text>
                <Text style={styles.tableCol}>{item.subCategory}</Text>
                <Text style={styles.tableCol}>{item.quality}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>{item.price}</Text>
                <Text style={styles.tableCol}>{item.dateCanBeGiven}</Text>
                <Text style={styles.tableCol}>{item.contact}</Text>
               
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SuppliersReport;
