import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Modal,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";

export default function App() {
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
      <View style={styles.tnc}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.text2}>
          I have read and agree to the{" "}
          <Link style={styles.text3} href="/termscondition">
            {" "}
            Terms and Condition.
          </Link>
          <Text style={styles.red}> *</Text>
        </Text>
      </View>
      <Button text="Register" />
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
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Opensans",
    padding: 12,
  },
  text2: {
    alignItems: "left",
  },
  text3: {
    width: "100%",
    alignItems: "left",
    color: "#19918f",
  },
  red: {
    color: "#ff0000",
  },
  checkbox: {
    margin: 3,
    color: "#19918F",
  },
  tnc: {
    flexDirection: "row",
  },
  popup: {
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontFamily: "Opensans",
  },
  textStyle: {
    color: "#ffff",
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerpopup: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#19918F",
    textAlign: "center",
    paddingBottom: 10,
  },
});
