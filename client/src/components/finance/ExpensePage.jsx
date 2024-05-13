import React from 'react'

import Header from './header/header'
import Sidebar from './sidebar/Sidebar'
import Expense from './body/Expenses/Expense'
import Footer from './footer/Footer'


const ExpensePage = () => {
  return (
    <div>
    <Header />
    <Sidebar />
    <Expense />
    <Footer />
  </div>
  )
}

export default ExpensePage
