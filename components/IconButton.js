import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useState} from "react";

function IconButtons({name, color, navigation}) {

    // const [iconName, setIconName] = useState(name); // Initial icon name is 'add'

    const handlePress = () => {
        // if (iconName === name) {
        //     setIconName(name);
        // } else {
        //     setIconName(name);
        // }
        navigation.navigate('ManageExpense')

    };
            // const {name} = props
    return (
        <TouchableOpacity onPress={handlePress}>
            <Ionicons name={name} size={24} color={color} style={{marginRight: 20}}/>
        </TouchableOpacity>
    );
}

export default IconButtons;
