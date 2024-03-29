import {createContext, useEffect, useReducer, useState} from "react";
import {fetchExpenses} from "../util/http";


// dispatch({ type: 'ADD', payload: { description: '...', amount: '...', date: '...' } });


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},   //object destructuring to get props out of the incoming object
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}   // ids of the object which should be updated and the data which should be added instead of the current one
});

function expensesReducer(state, action){                    // a JS function that receives the current state and action automatically, both values will be provided by react when we connect this function with the useReducer(); hook in the ExpensesContextProvider
    switch (action.type){
        case 'ADD':
            console.log("ADD expenses state: " + JSON.stringify(state, null, 2))
            console.log("action: " + JSON.stringify(action, null, 2))
            const id = new Date().toString() + Math.random().toString()
            console.log("after action: " + JSON.stringify([{...action.payload, id: id},...state], null, 2))

            return ([{...action.payload, id: id},...state])

        case 'SET':
            return action.payload;

        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id) // fetching the index of the item we are updating with id
            const updatableExpense = state[updatableExpenseIndex] // fetching expense with index from array
            const updatedItem = {...updatableExpense, ...action.payload.data}  // this updates the existing data with the new data, note that we are not changing the id
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses


        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)  // take out only items who's id is not that of action.payload.id

        default:
            return state;

    }
 }


function ExpensesContextProvider({children}) {


    const [expenseState, dispatch] = useReducer(expensesReducer, []);                    //connection set, expenseState is the current state

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData})    //=> this triggers the ADD case and the action in fn expensesReducer. type should be from switch action.'type', payload, can be any name
    }

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses})
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id})
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }
    
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider