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

const AccResourceReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Farmer Resource Information Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Name</Text>
              <Text style={styles.tableColHeader}>Email</Text>
              <Text style={styles.tableColHeader}>Contact No</Text>
              <Text style={styles.tableColHeader}>Location</Text>
              <Text style={styles.tableColHeader}>Farm Size</Text>
              <Text style={styles.tableColHeader}>Fruit Type</Text>
              <Text style={styles.tableColHeader}>Production Capacity</Text>
              <Text style={styles.tableColHeader}>Resource Type</Text>
              <Text style={styles.tableColHeader}>Details of Requirement</Text>
            
            </View>
            {dataList.map((accresource, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{accresource.name}</Text>
                <Text style={styles.tableCol}>{accresource.email}</Text>
                <Text style={styles.tableCol}>{accresource.contactNumber}</Text>
                <Text style={styles.tableCol}>{accresource.location}</Text>
                <Text style={styles.tableCol}>{accresource.farmSize}</Text>
                <Text style={styles.tableCol}>{accresource.fruitType}</Text>
                <Text style={styles.tableCol}>{accresource.productionCapacity}</Text>
                <Text style={styles.tableCol}>{accresource.resourceType}</Text>
                <Text style={styles.tableCol}>{accresource.detailReq}</Text>
              </View>
            ))}

          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AccResourceReport;
