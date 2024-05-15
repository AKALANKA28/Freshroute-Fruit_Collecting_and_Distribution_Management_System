import React, { Fragment } from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../../../assests/logo.png"; // Import your logo image

// const styles = StyleSheet.create({


//   page: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
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
//   table: {
//     display: "table",
//     width: "100%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//   },
//   tableRow: { 
//     flexDirection: "row",
//     backgroundColor: "#FFF",
//   },
//   tableColHeader: {
//     borderStyle: "solid",
//     borderBottomWidth: 1,
//     borderRightWidth: 1,
//     padding: 5,
//     flex: 1,
//     fontSize: 12,
//   },
//   tableCol: {
//     borderStyle: "solid",
//     borderBottomWidth: 1,
//     borderRightWidth: 1,
//     padding: 5,
//     flex: 1,
//     fontSize: 10,
//   },
// });

const ExpenseReport = ({ dataList }) => {

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const styles = StyleSheet.create({
    page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

    spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },

    titleContainer: {flexDirection: 'row',marginTop: 24},
    
    logo: { width: 90 },

    reportTitle: {  fontWeight: '800' , fontSize: 16,  textAlign: 'center', },

    addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
    
    invoice : {fontWeight: '800',fontSize: 20, textDecoration: "underline"},
    
    invoiceNumber : {fontSize: 11,fontWeight: 'bold'}, 
    
    address : { fontWeight: 400, fontSize: 13},
    
    theader : {marginTop : 20,fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

    theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

    tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

    total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

    tbody2:{ flex:2, borderRightWidth:1, },

    footer: {
      position: "absolute",
      bottom: 30, // Adjust this value as needed to position the footer
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 10,
      color: "#666666",
    },

    footer: { position: "absolute", bottom: 50,left: 0,right: 0,textAlign: "center", fontSize: 10, color: "#666666"},

    space:{
      alignment: "right",
    }
    
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
        <Text style={styles.invoice}>Expense Report</Text>
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
        <View style={{maxWidth : 200}}>
          <Text style={styles.addressTitle}>Finance Manger: </Text>
          <Text style={styles.address}>
              {/* {reciept_data.name} */}
              Akalanka Dias
          </Text>
        </View>
        <Text style={styles.addressTitle}>Date: {currentDate}</Text>
      </View>
    </View>
  );
};

const TableHead = () => {
  return (
    <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Date</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Category</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Description</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Amount</Text>   
      </View>
    </View>
  );
};

const TableBody = () => {
  return (
    dataList.map((expense) => (
      <Fragment key={expense.id}>
        <View style={{ width:'100%', flexDirection :'row'}}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{new Date(expense.date).toLocaleDateString()}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{expense.category}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{expense.description}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{expense.amount}</Text>   
          </View>
          
        </View>
      </Fragment>
    ))
  );
};

const TableTotal = () => {
  return (
    <View style={{ width:'100%', flexDirection :'row'}}>
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
        {/* {dataList((sum, item) => sum + (item.price), 0)} */}

          {/* {reciept_data.items.reduce((sum, item) => sum + (item.price * item.qty), 0)} */}
        </Text>  
      </View>
    </View>
  );
};



const Footer = () => (
  <View style={styles.footer}>

    <Text>..................</Text>
    <Text style={styles.space}>{"\n"}signature</Text>
    <Text>{"\n"}© 2024 Freshroute.lk copyright all right reserved.</Text>


  </View>
);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle  />
        <Address/>
        <UserAddress/>
        <TableHead/>
        <TableBody/>
        <TableTotal/>
        <Footer/>

    </Page>
      {/* <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Sales  Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Compaign Title</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeader}>Objective</Text>
              <Text style={styles.tableColHeader}>Target audience</Text>
              <Text style={styles.tableColHeader}>Budjet</Text>
            
            </View>
            {dataList.map((expense, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{expense.date}</Text>
                <Text style={styles.tableCol}>{expense.category}</Text>
                <Text style={styles.tableCol}>{expense.amount}</Text>
                <Text style={styles.tableCol}>{expense.description}</Text>
                <Text style={styles.tableCol}>{expense.budjet}</Text>
              </View>
            ))}

          </View>
        </View>
      </Page> */}
    </Document>
  );
};

export default ExpenseReport;
