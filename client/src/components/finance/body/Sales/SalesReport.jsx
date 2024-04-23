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
    color: "#333333",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
  },
  tableColHeader: {
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  tableCol: {
    padding: 8,
    fontSize: 10,
    color: "#333333",
    textAlign: "center",
  },
});

const CompaignReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Sales Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Campaign Title</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeader}>Objective</Text>
              <Text style={styles.tableColHeader}>Target Audience</Text>
              <Text style={styles.tableColHeader}>Budget</Text>
            </View>
            {dataList.map((campaign, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{campaign.compaign_title}</Text>
                <Text style={styles.tableCol}>{campaign.date}</Text>
                <Text style={styles.tableCol}>{campaign.objective}</Text>
                <Text style={styles.tableCol}>{campaign.target_aud}</Text>
                <Text style={styles.tableCol}>{campaign.budget}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CompaignReport;
