import {
  View,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import ZodForm from "./forms/ZodForm";

type formValues = {
  email: string,
  password: string
}

export default function App() {
  function onLoginHandler(values: formValues) {
    const { email, password } = values;

    Alert.alert(`Credentials entered. email: ${email}, password: ${password}`);
  }

  return (
    <View style={styles.container}>
        <ZodForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  input: {
    marginVertical: 10,
    width: Dimensions.get("window").width - 100,

    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width - 200,
    height: 44,
    borderRadius: 5,
    backgroundColor: "#343434",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});
