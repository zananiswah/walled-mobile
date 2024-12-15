import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Image, Text } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      {/* <Text>Nyoba router nich</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        secureTextEntry={false}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        placeholderTextColor="#aaa"
        secureTextEntry={false}
      />
      <Text style={styles.text2}>
        I have read and agree to the
        <Link style={styles.link} href="/termscondition">
          {" "}
          Terms and Conditions
          <Text style={styles.red}> *</Text>
        </Link>
      </Text>
      <Button text="Login" />
      <Text style={styles.text}>
        Have account?
        <Link style={styles.link} href="/">
          {" "}
          Login here.
        </Link>
      </Text>
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    // width: 100,
    // height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4DB6AC",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#19918F",
    padding: 20,
  },
  text: {
    width: "100%",
    alignItems: "left",
  },
  text2: {
    width: "100%",
    alignItems: "left",
    marginBottom: 15,
    paddingHorizontal: 30
  },
  red: {
    color: "#ff0000",
  },
});
