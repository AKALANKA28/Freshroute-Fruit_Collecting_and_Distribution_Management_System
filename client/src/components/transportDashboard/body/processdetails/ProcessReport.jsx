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

const ProcessReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Process Details Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Process ID</Text>
              <Text style={styles.tableColHeader}>Vehicle Number</Text>
              <Text style={styles.tableColHeader}> Driver name</Text>
              <Text style={styles.tableColHeader}> Current status</Text>
              
            
            </View>
            {dataList.map((process, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{process.process_ID}</Text>
                <Text style={styles.tableCol}>{process.vehicle_no}</Text>
                <Text style={styles.tableCol}>{process.driver_name}</Text>
                <Text style={styles.tableCol}>{process.current_status}</Text>
                
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProcessReport;
