import {FlatList, StyleSheet, Text, View} from 'react-native';

import ExpenseItem from './ExpenseItem';
import {useEffect, useState} from "react";
import {fetchExpenses} from "../../util/http";
// import WebSocketService from "../../util/WebSocketService";

function renderExpenseItem(itemData) {
    return <ExpenseItem
        description={itemData.item.description}
        amount={itemData.item.amount}
        date={itemData.item.date}
        id={itemData.item.id}


    />;
}

function ExpensesList() {


    const [expenses, setExpenses] = useState()
    useEffect(() => {
        // WebSocketService.on('notifications', (data) => {
        //     console.log('Received WebSocket notification:', data);
        //     // Update your component state or trigger a refresh
        // });
        async function getExpenses() {
            try {
                const response = await fetchExpenses();
                setExpenses(response); // Assuming that the response is an array of expenses
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        }
        getExpenses();
        // return () => {
        //     WebSocketService.off('notifications');
        // };
    }, []);
    console.log("expenses: " + JSON.stringify(expenses, null, 2))

    return (
        <View style={{backgroundColor: "#171717"}}>
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={renderExpenseItem}
                contentContainerStyle={styles.scrollView}
                ItemSeparatorComponent={<View style={styles.separator}/> } // we can use itemSeparator to separate the items of the list with any style rather than just space
                ListEmptyComponent={<Text style={styles.listViewNoItem}>No items found</Text>}

            />
        </View>
    );
}

export default ExpensesList;

const styles = StyleSheet.create({

    separator: {
        borderBottomColor: '#12725f',
        borderBottomWidth: .7,
        marginBottom: 10, // Adjust the margin as needed
    },

    gridItem: {
        margin: 16,
    },

    scrollView: {
        paddingVertical: 100,
        paddingHorizontal: 25,
        backgroundColor: "#171717",

    },
    textViewAmount: {
        width: "33%",
        alignItems: "flex-end"
    },
    textViewDesc: {
        width: "33%",
        alignItems: "flex-start"
    },
    textViewDate: {
        width: "33%",
        alignItems: "center"
    },

    description: {
        alignItems: "center",
        color: "white",
    },
    amount: {
        alignItems: "center",
        fontWeight: "bold",
        color: "white",

    },

    outerView: {
        width: "50%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "",
        borderWidth: 1

    },

    iosShadow: {
        shadowColor: "#26ff26",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4
    },

    listView: {
        textAlign: "left",
        padding: 10,
        color: "white",
        borderWidth: 1,
        borderRadius: 6,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#000000"
    },
    listViewNoItem: {
        textAlign: "left",
        padding: 10,
        color: "black",
        borderWidth: 1,
        borderRadius: 6,

        flexDirection: "row",
        backgroundColor: "#ffd700"
    },
    ListViewHeader: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        color: "black",
        borderWidth: 1,
        borderRadius: 6,

        flexDirection: "row",
        backgroundColor: "#ffd700"
    }

})