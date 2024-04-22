import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
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

const SalaryReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Salary Details Report</Text>
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
                <Text style={styles.tableCol}>{transportFee.price}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SalaryReport;
