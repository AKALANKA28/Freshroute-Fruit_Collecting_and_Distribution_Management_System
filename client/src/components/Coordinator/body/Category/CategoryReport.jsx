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

const CategoryReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Category Details Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Fruit</Text>
              <Text style={styles.tableColHeader}>Category</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeader}>Weight</Text>
              <Text style={styles.tableColHeader}>Quality</Text>
              <Text style={styles.tableColHeader}>Price</Text>
            
            </View>
            {dataList.map((category, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{category.fruit}</Text>
                <Text style={styles.tableCol}>{category.category}</Text>
                <Text style={styles.tableCol}>{category.date}</Text>
                <Text style={styles.tableCol}>{category.weight}</Text>
                <Text style={styles.tableCol}>{category.quality}</Text>
                <Text style={styles.tableCol}>{category.price}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CategoryReport;
