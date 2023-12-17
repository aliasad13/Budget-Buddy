import axios from 'axios' ;

const BACKEND_URL = 'http://192.168.20.3:3000/'

function storeExpense(expenseData) {
    axios.post(BACKEND_URL + 'api/v1/expenses', expenseData);

}

export async function fetchExpenses() {
    try {
        const response = await axios.get(BACKEND_URL + 'api/v1/expenses');
        console.log("response data: " + JSON.stringify(response.data, null, 2))

        const expenses = [];

        for (const key in response.data){
            const expenseObj = {
                id: response.data[key].id,
                amount: response.data[key].amount,
                date: response.data[key].date,
                description: response.data[key].description
            }
            expenses.push(expenseObj);  // push expenseObj onto expenses
        }
        return expenses

    } catch (error) {
        console.log("error: " + JSON.stringify(error.data, null, 2))
    }
}

export async function fetchRecentExpenses() {
    try {
        const response = await axios.get(BACKEND_URL + 'api/v1/expenses/recent_expenses');
        console.log("response data: " + JSON.stringify(response.data, null, 2))

        const expenses = [];

        for (const key in response.data){
            const expenseObj = {
                id: key,
                amount: response.data[key].amount,
                date: response.data[key].date,
                description: response.data[key].description
            }
            expenses.push(expenseObj);  // push expenseObj onto expenses
        }
        return expenses

    } catch (error) {
        console.log("error: " + JSON.stringify(error.data, null, 2))
    }
}



/*
In JavaScript, HTTP requests are often asynchronous tasks, meaning they don't
block the execution of the rest of the code while waiting for a response.
To handle the asynchrony of HTTP requests, developers commonly use Promises

In JavaScript, a promise is an object that represents the eventual completion
or failure of an asynchronous operation and its resulting value.

this is how a promise is created:

const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation, e.g., making an API call or reading a file

  // If the operation is successful, call resolve with the result
  // If there's an error, call reject with the reason for the error
});

when we have a promise, we can use .then on myPromise to handle success and failure.

myPromise.then(
  (result) => {
    // Handle the fulfilled state (operation succeeded)
    console.log(result);
  },
  (error) => {
    // Handle the rejected state (operation failed)
    console.error(error);
  }

*/