import React from 'react';
import { Animated } from 'react-native';

const CustomTabIcon = ({ focused, icon }) => {
    const scaleValue = new Animated.Value(1);

    Animated.spring(scaleValue, {
        toValue: focused ? 1.2 : 1,
        useNativeDriver: true,
    }).start();

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            {React.cloneElement(icon, {   // Cloning the provided icon element using React.cloneElement. This allows us to add or override properties of the cloned element.
                size: focused ? 30 : 20,
                color: focused ? '#9fd533' : 'white',
            })}
        </Animated.View>
    );
};

export default CustomTabIcon;
