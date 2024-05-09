import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
// import logo from "../../../../assests/logo.png"; // Import your logo image

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
  // logo: {
  //   width: 100,
  //   height: 100
  // }
    paddingRight: 2,

    hr: {
      borderBottomWidth: 1,
      borderBottomColor: "#AAAAAA",
      marginVertical: 10, // Adjust the vertical margin as needed
    },
  textMargin: {
    paddingRight: 1, // Adjust the padding as needed
  },
  // space: {
  //   width: 2, // Adjust the width as needed
  // },

  
});

const SalesReport = ({ dataList }) => {
  console.log(dataList);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
        {/* <Image src={logo} style={styles.logo} /> */}
        <View style={styles.hr} /> {/* Horizontal rule */}

          <Text style={styles.heading}>Sales Report</Text>
          <View style={styles.top}>
            <View style={styles.leftTable}>
              <View style={styles.tableRow}>
              <Text style={styles.topTableColHeader}>Sales Person</Text>
              <Text style={styles.topTableColHeader}>Date</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>Akalanka Dias</Text>
                <Text style={styles.tableCol}>2024/04/24</Text>
              </View>
               

            </View>
            <View styel= {styles.col2}>
            <View style={styles.topTable}>
              <View style={styles.tableRow}>
              <Text style={styles.topTableColHeader}>Sales Amount</Text>
              <Text style={styles.topTableColHeader}>Rs. 20000.00</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.topTableColHeader}>Sales Tax</Text>
                <Text style={styles.topTableColHeader}>Rs. 30000.00</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.topTableColHeader}>Sales Total</Text>
                <Text style={styles.topTableColHeader}>Rs. 50000.00</Text>
              </View>
              {/* <View style={styles.tableRow}>
                <Text style={styles.topTableColHeader}>Customer Name</Text>
                <Text style={styles.topTableColHeader}>Date</Text>
              </View> */}
               

            </View>
            </View>
          </View>
          <View style={styles.hr} /> {/* Horizontal rule */}

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Customer Name</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeader}>Fruit Name</Text>
              <Text style={styles.tableColHeader}>Amount </Text>
              <Text style={styles.tableColHeader}>Paid</Text>
              <Text style={styles.tableColHeader}>Due</Text>
              <Text style={styles.tableColHeader}>Status</Text>

            </View>
            {dataList.map((sales, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{sales.customer_name}</Text>
                <Text style={styles.tableCol}>{sales.date}</Text>
                <Text style={styles.tableCol}>{sales.fruit_name}</Text>
                <Text style={styles.tableCol}>{sales.paid}</Text>
                <Text style={styles.tableCol}>{sales.due}</Text>
                <Text style={styles.tableCol}>{sales.status}</Text>

              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SalesReport;
