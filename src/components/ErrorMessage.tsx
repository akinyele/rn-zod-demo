import {FC} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";

const ErrorMessage: FC<{ errorValue : String | undefined | boolean }> = ({errorValue}) => (
    <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{errorValue}</Text>
        </View>
);

const styles = StyleSheet.create({
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        color: "red",
    }
});

export default ErrorMessage;
