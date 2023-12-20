import axios from 'axios' ;

const BACKEND_URL = 'http://192.168.20.4:3000/'


//POST

export function storeExpense(expenseData) {
    axios.post(BACKEND_URL + 'api/v1/expenses', expenseData)
        .then(response => {
            // Handle success, e.g., show a message to the user
            console.log('Expense stored successfully:', response.data);
            alert('Food has been added successfully')
        })
        .catch(error => {
            // Handle error, e.g., show an error message to the user
            console.error('Error storing expense:', error);
            alert('Error storing food')

        });

}

// PUT

export function updateExpense(expenseId, expenseData) {
    axios.put(BACKEND_URL + `api/v1/expenses/${expenseId}`, expenseData)
        .then(response => {
            // Handle success, e.g., show a message to the user
            console.log('Expense stored successfully:', response.data);
            alert('Food has been updated successfully')
        })
        .catch(error => {
            // Handle error, e.g., show an error message to the user
            console.error('Error storing expense:', error);
            alert('Error updating food')

        });

}


// DELETE

export function deleteExpense(expenseId) {
    return axios.delete(BACKEND_URL + `api/v1/expenses/${expenseId}`)
        .then(response => {
            // Handle success, e.g., show a message to the user
            console.log('Expense stored successfully:', response.data);
            alert('Food has been deleted successfully')
        })
        .catch(error => {
            // Handle error, e.g., show an error message to the user
            console.error('Error deleting food:', error);
            alert('Error deleting food')
        });
}





//GET

export async function fetchExpenses() {
    try {
        const response = await axios.get(BACKEND_URL + 'api/v1/expenses');

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

export async function fetchExpense(expenseId) {
    try {
        const response = await axios.get(BACKEND_URL + `api/v1/expenses/${expenseId}`);
        const expenseData = response.data;

        if (Array.isArray(expenseData)) {
            // If the response is an array, assume it's a list of expenses
            const expenses = expenseData.map((expenseItem) => ({
                id: expenseItem.id,
                amount: expenseItem.amount,
                date: expenseItem.date,
                description: expenseItem.description,
            }));
            return expenses;
        } else {
            // If the response is a single expense object
            const expense = {
                id: expenseData.id,
                amount: expenseData.amount,
                date: expenseData.date,
                description: expenseData.description,
            };
            return expense; // Return a single-element array for consistency
        }
    } catch (error) {
        console.error('Error fetching expense:', error);
        return []; // Return an empty array in case of an error
    }
}

export async function fetchRecentExpenses() {
    try {
        const response = await axios.get(BACKEND_URL + 'api/v1/expenses/recent_expenses');

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