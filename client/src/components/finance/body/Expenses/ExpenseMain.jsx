import React from 'react'
import Body from './ExpenseBody'
import './expense.css'
import PageTitle from '../PageTitle'


const Main = () => {
  return (
    <main className='main'>
    {/* <PageTitle page="Expense" /> */}
    <Body />
   </main>
  )
}

export default Main
