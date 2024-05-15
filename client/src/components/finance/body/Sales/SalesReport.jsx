import React, { Fragment } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../../../assests/logo.png"; // Import your logo image

const SalesReport = ({ dataList }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const total = dataList.reduce((sum, sales) => {
    return sum + sales.totalPrice;
  }, 0);
  
  // const reciept_data = {
  //   id: "642be0b4bbe5d71a5341dfb1",
  //   invoice_no: "20200669",
  //   name: "Akalanka Dias",
  //   date: "09-05-2024",
  //   items: [
  //     {
  //       id: 1,
  //       date: "08/05/2024",
  //       category: "Employee",
  //       price: 20000.0,
  //       description: "Employee Cost",
  //     },
  //     {
  //       id: 2,
  //       date: "08/05/2024	",
  //       category: "Transport",
  //       price: 50000.0,
  //       description: "Fuel Cost",
  //     },
  //     {
  //       id: 3,
  //       date: "08/05/2024",
  //       category: "Promotion",
  //       price: 30000.0,
  //       description: "Promotion Cost",
  //     },
  //     {
  //       id: 4,
  //       date: "08/05/2024",
  //       category: "Research",
  //       price: 10000.0,
  //       description: "Reasearch Cost",
  //     },
  //     {
  //       id: 5,
  //       date: "08/05/2024",
  //       category: "Transport",
  //       price: 25000.0,
  //       description: "Transport Cost",
  //     },
  //     {
  //       id: 5,
  //       date: "08/05/2024",
  //       category: "Research	",
  //       price: 30000.0,
  //       description: "Expenses",
  //     },
  //   ],
  // };

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
      border: "1 solid black", // Add border to the page

    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontWeight: "800", fontSize: 16, textAlign: "center" },

    addressTitle: { fontSize: 11, fontStyle: "bold" },

    invoice: { fontWeight: "800", fontSize: 20, textDecoration: "underline" },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: 400, fontSize: 13 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.reportTitle}>FreshRoute Distributors</Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Sales Report</Text>
          {/* <Text style={styles.invoiceNumber}>Invoice number: {reciept_data.invoice_no} </Text> */}
        </View>
        {/* <View>
        <Text style={styles.addressTitle}>7, Ademola Odede, </Text>
        <Text style={styles.addressTitle}>Ikeja,</Text>
        <Text style={styles.addressTitle}>Lagos, Nigeria.</Text>
      </View> */}
      </View>
    </View>
  );
  const UserAddress = () => {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <View style={{ maxWidth: 200 }}>
            <Text style={styles.addressTitle}>Finance Manger: </Text>
            <Text style={styles.address}>Akalanka Dias</Text>
          </View>
          <Text style={styles.addressTitle}>Date: {currentDate}</Text>
        </View>
      </View>
    );
  };

  const TableHead = () => {
    return (
      <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
          <Text>Customer</Text>
        </View>
        <View style={styles.theader}>
          <Text>Date</Text>
        </View>
        <View style={styles.theader}>
          <Text>Fruit Name</Text>
        </View>
       
        <View style={styles.theader}>
          <Text>Price</Text>
        </View>
        <View style={styles.theader}>
          <Text>Quantity</Text>
        </View>
        <View style={styles.theader}>
          <Text>Tax Rate</Text>
        </View>
        <View style={styles.theader}>
          <Text>Total (Rs)</Text>
        </View>
      </View>
    );
  };

  const TableBody = () => {
    return dataList.map((sales) => (
      <Fragment key={sales._id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{sales?.user?.name}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{new Date(sales.createdAt).toLocaleDateString()}</Text>
          </View>

          <View style={styles.tbody}>
            {sales.orderItems.map((item) => (
              <Text key={item._id}>{item.product.title}</Text>
            ))}
          </View>
          <View style={styles.tbody}>
            {sales.orderItems.map((item) => (
              <Text key={item._id}>Rs. {item.price.toFixed(2)}</Text>
            ))}
          </View>
          <View style={styles.tbody}>
            {sales.orderItems.map((item) => (
              <Text key={item._id}> {item.quantity} kg</Text>
            ))}
          </View>
          <View style={styles.tbody}>
            <Text>2 %</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{sales.totalPrice.toFixed(2)}</Text>
          </View>
          
        </View>
      </Fragment>
    ));
  };

  const TableTotal = () => {
    return (
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={styles.total}>
          <Text></Text>
        </View>
        <View style={styles.total}>
          <Text> </Text>
        </View>
        <View style={styles.tbody}>
          <Text>Total</Text>
        </View>
        <View style={styles.tbody}>
          <Text>
          <Text>{total.toFixed(2)}</Text>

          </Text>
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableTotal />
      </Page>
    </Document>
  );
};

export default SalesReport;
