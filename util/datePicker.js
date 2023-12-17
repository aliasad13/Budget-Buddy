import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from "react";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";





function datePicker(){
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('Empty')

    const onDateChange = (event, selectedDate) =>{
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate)

        let tempDate = new Date(currentDate);
        let formattedDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        let formattedTime = 'H:' + tempDate.getHours() + "M:" + tempDate.getMinutes() + 'S:' + tempDate.getHours()
        setText(formattedDate + '\n' + formattedTime)
        console.log(formattedDate + '\n' + formattedTime)

    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode);
    }


    return(
        <View style={styles.inputView}>
            <TouchableOpacity style={styles.dateButton} onPress={() => showMode('date')}>
                <Text>Pick Date</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dateButton} onPress={() => showMode('time')}>
                <Text>Pick Time</Text>
            </TouchableOpacity>

            {show && (  // if the show is truthy, then the date picker will be rendered
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                />
            )}
        </View>
    )

}

export default datePicker()

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
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