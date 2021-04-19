import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View, StyleSheet, Switch, TouchableWithoutFeedback, Image, Slider } from 'react-native';
import { setCustomText } from 'react-native-global-props';
import { useFonts, Inter_900Black, Inter_300Light } from '@expo-google-fonts/inter';
import i18n from '../i18n'

const Stack = createStackNavigator();

const Settings = (props) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [isFont, setIsFont] = useState(false);
    const [fontSize, setFontSize] = useState(17);
    let [lng, setLng] = useState(props.lng);

    const toggleSwitch = (value) => {
        props.setIsDark(value);
        setIsEnabled(value);
    };
    let [fontsLoaded] = useFonts({
        Inter_900Black,
        Inter_300Light,

    });

    const customTextProps = {
        style: {
            fontFamily: 'Inter_900Black',
            fontSize: fontSize,
        }
    }

    const defaultTextProps = {
        style: {
            fontFamily: 'Inter_300Light',
            fontSize: fontSize,
        }
    }
    let setCustomFont = (value) => {
        setCustomText(value ? customTextProps : defaultTextProps);
        props.setFont(value ? customTextProps : defaultTextProps);
        setIsFont(value);

    }
    let changeLngToRus = () => {
        i18n.locale = "ru";
        props.setLng('ru');
        setLng('ru');
    }

    let changeSize = (value) => {
        setFontSize(value);
    }
    let changeLngToEng = () => {
        i18n.locale = "en";
        props.setLng('en');
        setLng('en');
    }
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <TouchableWithoutFeedback onPress={changeLngToRus}>
                    <Image style={styles.imageThumbnail} source={{ uri: "https://megabuzz.ru/image/flags/flag-rus.png" }} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={changeLngToEng}>
                    <Image style={styles.imageThumbnail} source={{ uri: "https://anastasiafond.ru/wp-content/uploads/2018/04/En.png" }} />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.itemContainer}>
                <Text>{i18n.t("def")}</Text>
                <Switch
                    trackColor={{ false: "gray", true: "lime" }}
                    thumbColor={isEnabled ? "white" : "white"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text>{i18n.t("dark")}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text>{i18n.t("def_font")}</Text>
                <Switch
                    trackColor={{ false: "gray", true: "lime" }}
                    thumbColor={isFont ? "white" : "white"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setCustomFont}
                    value={isFont}
                />
                <Text>{i18n.t("inter")}</Text>
            </View>
            <View>
                <Text style={{ width: 200, textAlign: 'center'}}>
                {i18n.t("size")} {Math.floor(fontSize)}
                </Text>
                <Slider maximumValue={20}
                    value={fontSize}
                    onValueChange={changeSize} />
                <Button title={i18n.t("save")} onPress={() => setCustomFont(isFont)}></Button>
            </View>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-around'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 90,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    textName: {
        textAlign: 'center',
        fontSize: 17,
    },
    textDesctiption: {
        textAlign: 'center',
        color: 'gray',
    },
    textLocation: {
        color: 'gray',
        textAlign: 'center',
    }
});