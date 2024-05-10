import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Import your logo image
import logo from "../../../../assests/logo.png";

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
  logoContainer: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
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
          <View style={styles.logoContainer}>
            <Image src={logo} style={styles.logo} />
          </View>
          <Text style={styles.heading}>Employee Details Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Name</Text>
              <Text style={styles.tableColHeader}>Job Role</Text>
              <Text style={styles.tableColHeader}>NIC</Text>
              <Text style={styles.tableColHeader}>Address</Text>
              <Text style={styles.tableColHeader}>Email Address</Text>
              <Text style={styles.tableColHeader}>Account Number</Text>
              <Text style={styles.tableColHeader}>Bank Name</Text>
              <Text style={styles.tableColHeader}>Joined Date</Text>
            </View>
            {dataList.map((employee, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{employee.name}</Text>
                <Text style={styles.tableCol}>{employee.jobrole}</Text>
                <Text style={styles.tableCol}>{employee.nic}</Text>
                <Text style={styles.tableCol}>{employee.address}</Text>
                <Text style={styles.tableCol}>{employee.email}</Text>
                <Text style={styles.tableCol}>{employee.accno}</Text>
                <Text style={styles.tableCol}>{employee.bankname}</Text>
                <Text style={styles.tableCol}>{employee.joineddate}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EmployeeReport;
