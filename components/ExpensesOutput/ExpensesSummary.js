import {View} from "react-native";

function ExpensesSummary({expenses,periodName}) {
    const expenseSum = expenses.reduce((sum, expense) => {    //expense is the current value of expenses and sum is the total sum up until expense
        return sum + expense.amount
    }, 0); //starting value for sum

    return (
        <View>
            <Text> {periodName} </Text>
            <Text> {expenseSum.toFixed(2)} </Text> {/* 2 decimal points*/}
        </View>
    )
}

export default ExpensesSummary