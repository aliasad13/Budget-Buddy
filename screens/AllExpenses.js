import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {fetchExpenses} from "../util/http";
import ExpensesList from "../components/ExpensesOutput/ExpensesList";

function AllExpenses() {
  return(
      <ExpensesList/>
  )

}



export default AllExpenses;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'center',
    },
});