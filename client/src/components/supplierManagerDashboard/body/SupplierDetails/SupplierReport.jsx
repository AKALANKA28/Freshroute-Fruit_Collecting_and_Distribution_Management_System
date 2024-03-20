// import React from "react";
// import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   label: {
//     width: "30%",
//     fontWeight: "bold",
//   },
//   value: {
//     width: "70%",
//   },
// });

// const SupplierReport = ({ dataList }) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text style={styles.heading}>Supplier Details Report</Text>
//           {dataList.map((supplier, index) => (
//             <View key={index} style={styles.row}>
//               <Text style={styles.label}>Supplier Name:</Text>
//               <Text style={styles.value}>{supplier.name}</Text>
//             </View>
//             // Add other fields as necessary
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default SupplierReport;


import React from "react";
import { PDFViewer, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    width: "100%",
    border: "1px solid black",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    border: "1px solid black",
    padding: 8,
    textAlign: "center",
  },
  tableRow: {
    border: "1px solid black",
    padding: 8,
    textAlign: "center",
  },
});

const SupplierReport = ({ dataList }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Supplier Details Report</Text>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>NIC</th>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>City</th>
                <th style={styles.tableHeader}>Lane</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((supplier, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td>{supplier.NIC}</td>
                  <td>{supplier.username}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.city}</td>
                  <td>{supplier.lane}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </View>
      </Page>
    </Document>
  );
};

export default SupplierReport;
