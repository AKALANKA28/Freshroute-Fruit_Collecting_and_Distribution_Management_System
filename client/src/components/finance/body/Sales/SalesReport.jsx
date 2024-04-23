import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../../../assests/logo.png"; // Import your logo image

const styles = StyleSheet.create({

  logo: {
    width: 100, // Adjust the width of your logo as needed
    height: 100, // Adjust the height of your logo as needed
    marginBottom: 10, // Adjust the margin as needed
    alignItems: "center"
  },

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

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,

  },

  info: {
    flex: "1",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    overflow: "hidden",

  },

  leftTable: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderRadius: 5,
    overflow: "hidden",
  },

  topTableColHeader: {
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },


  rightTable: {
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
        <Image src={logo} style={styles.logo} /> {/* Include your logo */}
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
