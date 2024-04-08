import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import './predictions.css';

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

const PredictionReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Predictions Details Report</Text>
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
      </Page>
    </Document>
  );
};

export default PredictionReport;
