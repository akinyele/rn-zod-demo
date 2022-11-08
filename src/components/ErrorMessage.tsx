import {FC} from "react";
import {Text, View} from "react-native";

const ErrorMessage: FC<{ errorValue : String | undefined | boolean }> = ({errorValue}) => (
    <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{errorValue}</Text>
        </View>
);
