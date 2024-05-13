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

const VehicleReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Vehicle Details Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Vehicle Number</Text>
              <Text style={styles.tableColHeader}>Type</Text>
              <Text style={styles.tableColHeader}>Conditions</Text>
              <Text style={styles.tableColHeader}>Capacity</Text>
              <Text style={styles.tableColHeader}>Owner Name</Text>
              <Text style={styles.tableColHeader}>NIC</Text>
              <Text style={styles.tableColHeader}>Email</Text>
              <Text style={styles.tableColHeader}>Phone</Text>
              <Text style={styles.tableColHeader}>Bank</Text>
              <Text style={styles.tableColHeader}>Branch</Text>
              <Text style={styles.tableColHeader}>Account Number</Text>
            
            </View>
            {dataList.map((vehicle, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{vehicle.vehicle_no}</Text>
                <Text style={styles.tableCol}>{vehicle.type}</Text>
                <Text style={styles.tableCol}>{vehicle.conditions}</Text>
                <Text style={styles.tableCol}>{vehicle.capacity}</Text>
                <Text style={styles.tableCol}>{vehicle.owner_name}</Text>
                <Text style={styles.tableCol}>{vehicle.nic}</Text>
                <Text style={styles.tableCol}>{vehicle.email}</Text>
                <Text style={styles.tableCol}>{vehicle.phone}</Text>
                <Text style={styles.tableCol}>{vehicle.Bank}</Text>
                <Text style={styles.tableCol}>{vehicle.Branch}</Text>
                <Text style={styles.tableCol}>{vehicle.account_no}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default VehicleReport;
