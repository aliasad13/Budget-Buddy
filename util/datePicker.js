import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from "react";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";





function datePicker({onDateChange, initialDate}){
    const [date, setDate] = useState(new Date(initialDate));
    const [mode, setMode] = useState('date')
    // const [show, setShow] = useState(false)
    const [show, setShow] = useState(true)
    const [text, setText] = useState('Empty')

    const onDateChangeInternal = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate)

        let tempDate = new Date(currentDate);
        let formattedDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        let formattedTime = 'H:' + tempDate.getHours() + " M:" + tempDate.getMinutes() + ' S:' + tempDate.getHours()
        setText(formattedDate + '\n' + formattedTime)
        console.log(formattedDate + '\n' + formattedTime)

        onDateChange(currentDate);

    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode);
    }

    useEffect(() => {
        // Update the date when the initialDate prop changes
        setDate(new Date(initialDate));
    }, [initialDate]);

    return(
        <View style={styles.inputView}>
            {/*<TouchableOpacity style={styles.dateButton} onPress={() => showMode('date')}>*/}
            {/*    <Text>Pick Date</Text>*/}
            {/*</TouchableOpacity>*/}

            {/*<TouchableOpacity style={styles.dateButton} onPress={() => showMode('time')}>*/}
            {/*    <Text>Pick Time</Text>*/}
            {/*</TouchableOpacity>*/}

            {/*to have buttons to select between which one we have to choose, whether time or date:
            1. uncomment the above touchable opacities
            2. const [show, setShow] = useState() => make this false
            3. make the mode={mode} in <DateTimePicker/>

            */}

            {show && (  // if the show is truthy, then the date picker will be rendered
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    // mode={mode}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onDateChangeInternal}
                />
            )}
        </View>
    )

}

export default datePicker

const styles = StyleSheet.create({


    inputView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        color: "white"
    },

    textInput: {
        height: 35,
        width: 150,
        borderWidth: .75,
        color: "black",
        backgroundColor: "white",
        borderRadius: 6,
        paddingHorizontal: 10,
        margin: 15
    },

    dateButton: {
        height: 35,
        width: 150,
        borderRadius: 6,
        paddingHorizontal: 10,
        margin: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    dateText: {
        color: "white"
    },

    datePicker: {
        color: "white"
    }
});