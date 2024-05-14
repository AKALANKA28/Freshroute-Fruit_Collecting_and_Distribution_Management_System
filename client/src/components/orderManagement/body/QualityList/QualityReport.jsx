import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import './Quality.css';
import logo from '../../../../assests/logo.png'

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
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
  logo:{
    width: 100,
    height: 100
  }
});

const QualityReport = ({ dataList }) => {

  const currentDate = new Date().toLocaleString();
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
          <Image src = {logo} style={styles.logo}/>
          <Text style={styles.heading}>FreshRoute - Quality Details Report</Text>
          <Text style={{ textAlign: 'right', marginBottom: 10 }}>{currentDate}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Fruit Type</Text>
              <Text style={styles.tableColHeader}>Fruit Category</Text>
              <Text style={styles.tableColHeader}>Grade</Text>
              <Text style={styles.tableColHeader}>Quality Description</Text>
              <Text style={styles.tableColHeader}>Storage Conditions</Text>
             
            </View>
            {dataList.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.fruit}</Text>
                <Text style={styles.tableCol}>{item.category}</Text>
                <Text style={styles.tableCol}>{item.quality}</Text>
                <Text style={styles.tableCol}>{item.qualityDesc}</Text>
                <Text style={styles.tableCol}>{item.storageCond}</Text>
              
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default QualityReport;
