import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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

const PromotionReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Farmer Details Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Farmer Name</Text>
              <Text style={styles.tableColHeader}>Location</Text>
              <Text style={styles.tableColHeader}>Application No</Text>
              <Text style={styles.tableColHeader}>Required Resouce</Text>
              
            </View>
            {dataList.map((Promotion, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{Promotion.farmer_name}</Text>
                <Text style={styles.tableCol}>{Promotion.location}</Text>
                <Text style={styles.tableCol}>{Promotion.application_no}</Text>
                <Text style={styles.tableCol}>{Promotion.required_resouce}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PromotionReport;
