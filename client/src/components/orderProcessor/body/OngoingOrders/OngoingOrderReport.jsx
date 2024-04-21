import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import '../OrderList.css';

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

const AssignedOrderReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>FreshRoute - Ongoing Order Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Fruit Type</Text>
              <Text style={styles.tableColHeader}>Fruit Category</Text>
              <Text style={styles.tableColHeader}>Quality(kg)</Text>
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
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AssignedOrderReport;
