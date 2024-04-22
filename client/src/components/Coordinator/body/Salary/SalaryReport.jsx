import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../../../assests/logo.png"; // Import the logo

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: "green",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
    fontWeight: "bold", // Make the text more bold
    color: "#333333",
    width: "33.33%",
    textAlign: "center",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    fontSize: 10,
    color: "#333333",
    width: "33.33%",
    textAlign: "center",
  },
  logo: {
    width: 100, // Set the absolute width
    height: 100, // Set the absolute height
  },
  line: {
    borderBottom: "1px solid #333333",
    marginBottom: 10,
  },
});

const SalaryReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.heading}>Salary Details</Text>
          <Text style={styles.headerText}>FreshRoute<br/></Text>
        </View>
        <View style={styles.line} />
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Job Role</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeader}>Salary</Text>
            </View>
            {dataList.map((salary, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{salary.jobrole}</Text>
                <Text style={styles.tableCol}>{formatDate(salary.date)}</Text>
                <Text style={styles.tableCol}>{formatCurrency(salary.salary)}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.footer}>Generated on: {new Date().toLocaleDateString()}</Text>
      </Page>
    </Document>
  );
};

// Function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

// Function to format currency
const formatCurrency = (amount) => {
  return `RS:${amount.toFixed(2)}`;
};

export default SalaryReport;
