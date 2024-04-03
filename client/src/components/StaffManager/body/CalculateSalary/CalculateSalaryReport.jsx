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
    wordWrap: "break-word", // Add wordWrap property for content wrapping
  },
});

const EmployeeReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Salary Details Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>

            <Text style={styles.tableColHeader}>Employee Name</Text>
              <Text style={styles.tableColHeader}>Job Role</Text>
              <Text style={styles.tableColHeader}>Basic</Text>
              <Text style={styles.tableColHeader}>Allowance</Text>
              <Text style={styles.tableColHeader}>EPF - Employee Contribution</Text>
              <Text style={styles.tableColHeader}>EPF - Employer Contribution</Text>
              <Text style={styles.tableColHeader}>ETF -  Employer Contribution</Text>
              
            </View>
            {dataList.map((calculateSalary, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{calculateSalary.name}</Text>
                <Text style={styles.tableCol}>{calculateSalary.jobrole}</Text>
                <Text style={styles.tableCol}>{calculateSalary.salary}</Text>
                <Text style={styles.tableCol}>{calculateSalary.allowance}</Text>
                <Text style={styles.tableCol}>{calculateSalary.epfe}</Text>
                <Text style={styles.tableCol}>{calculateSalary.epfr}</Text>
                <Text style={styles.tableCol}>{calculateSalary.etf}</Text>
               
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EmployeeReport;
