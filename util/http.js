import axios from 'axios' ;

const BACKEND_URL = 'http://192.168.20.4:3000/'


//POST

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + 'api/v1/expenses', expenseData)
    console.log('Expense stored successfully:', response.data);
    alert('Food has been stored successfully')
    // using await will give us the response data even if its post, put or delete
}

// PUT

export async function updateExpense(expenseId, expenseData) {
    const response =  await axios.put(BACKEND_URL + `api/v1/expenses/${expenseId}`, expenseData)
    console.log('Expense updated successfully:', response.data);
    alert('Food has been updated successfully')
}


// DELETE

export async function deleteExpense(expenseId) {
    try{
    const response =  await axios.delete(BACKEND_URL + `api/v1/expenses/${expenseId}`)
    console.log('Expense deleted successfully:', response.data);
    alert('Food has been deleted successfully')
    }
    catch (error){
        console.error('An error occurred while deleting:', error);
        alert('An error occurred while deleting')
    }
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

  instead of a pro,ise we can use await which gives us the response even if its a post request,

 you typically cannot use .then directly with await in the same line. await is used within an async function to
 pause execution until a Promise is settled (fulfilled or rejected). When you use await, you're effectively
 saying, "Wait for this asynchronous operation to complete before moving on."


  In summary, use await when you are working within an async function to pause execution until a
  promise is settled. If you are not in an async function and want to handle the resolution or rejection
  of a promise, you can use .then and .catch. Mixing await and .then on the same promise is redundant
  and not recommended.
  async function exampleAsyncFunction() {
  try {
    const result = await someAsyncOperation(); // Wait for the promise to settle
    console.log(result); // This will only execute after the promise is settled
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


*/