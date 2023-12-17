import React, {useEffect} from 'react';
import {StyleSheet, Text} from "react-native";
import {fetchExpenses} from "../util/http";
import async from "async";

function RecentExpenses({navigation}) {


}

/*we should not turn an effect function into a async function, its discouraged by the react team
so we cannot use await directly on fetchExpenses even though  its a async function like
useEffect(() => {
await fetchExpenses();
})

the above method by adding await fetchExpenses inside the async function getExpenses is a work around for that
**/

export default RecentExpenses;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});