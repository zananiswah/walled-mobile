import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Image, Text } from "react-native";
import Button from "../components/Button";
import { Link, useNavigation, useRouter } from "expo-router";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z.string().min(4, { message: "Must be 4 character or more long" }),
});

export default function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    try {
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [key]: error.errors[0].message }));
    }
  };

  const handleSubmit = async () => {
    try {
      LoginSchema.parse(form);

      const res = await axios.post(
        "https://walled-api.vercel.app/auth/login",
        form
      );
      await AsyncStorage.setItem("token", res.data.data.token);
      router.replace("/(home)");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setServerError(err.response.data.message || "An error occurred");
        } else if (err.request) {
          setServerError("Network error. Please try again later.");
          console.error("Network Error:", err.request);
        } else {
          setServerError("An unexpected error occurred.");
          console.error("Request Setup Error:", err.message);
        }
      } else if (err?.errors) {
        const errors = {};
        err.errors.forEach((item) => {
          const key = item.path[0];
          errors[key] = item.message;
        });
        setErrors(errors);
      } else {
        setServerError("An unknown error occurred.");
        console.error("Unhandled Error:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {serverError && <Text>{serverError}</Text>}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="stretch"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
      />

      {errorMsg.email ? (
        <Text style={styles.errorMsg}>{errorMsg.email}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
        value={form.password}
      />

      {errorMsg.password ? (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      ) : null}

      {/* <Link href="/(home)" style={styles.linkText}>Masuk</Link> */}
      <Button handlePress={handleSubmit} text="Login" />

      <Text style={{ alignSelf: "flex-start", padding: 10 }}>
        Don't have account? {""}
        <Link href="/register" style={styles.register}>
          Register here
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
    width: 233,
    height: 57,
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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  register: {
    color: "#19918F",
    fontWeight: "bold",
    textDecorationLine: "underline",
    alignSelf: "flex-start",
  },
  linkText: {
    color: "#19918F",
  },
  errorMsg: {
    color: "red",
    width: "100%",
  },
});

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View, TextInput, Image, Text } from "react-native";
// import Button from "../components/Button";
// import Input from "../components/Input";
// import { Link } from "expo-router";
// import { z } from "zod";
// import { useState } from "react";
// import axios from "axios";

// const LoginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(4, { message: "Must be 8 or more characters" }),
// });

// export default function App() {
//   const [form, setForm] = useState({});
//   const [errorMsg, setErrors] = useState({});

//   const handleInputChange = (key, value) => {
//     setForm({ ...form, [key]: value });
//     try {
//       LoginSchema.pick({ [key]: true }).parse({ [key]: value });
//       setErrors((prev) => ({ ...prev, [key]: "" }));
//     } catch (err) {
//       setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
//     }
//   };

//   const handleSubmit = async () => {
//     console.log('FORM', form);

//     try {
//         LoginSchema.parse(form);

//         const res = await axios.post("http://192.168.30.41:8080/auth/login", form)
//         console.log(res.data, "ini budi");

//         if (res.status === 200) {
//           router.replace('/(home)')
//         }
//     } catch (error) {
//       const errors = {};
//       err.errors.forEach((item) => {
//         const key = item.path[0];
//         errors[key] = item.message;
//       });
//       setErrors(errors);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/logo.png")} style={styles.logo} />
//       {/* <Text>Nyoba router nich</Text> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#aaa"
//         keyboardType="email-address"
//         onChangeText={(text) => handleInputChange("email", text)}
//         value={form.email}
//       />
//       {errorMsg.email ? <Text style={styles.errorMessage}>{errorMsg.email}</Text> : null}

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#aaa"
//         secureTextEntry={true}
//         onChangeText={(text) => handleInputChange("password", text)}
//         value={form.password}
//       />
//       {errorMsg.password ?  <Text style={styles.errorMessage}>{errorMsg.password}</Text>: null}

//       <Link href="/(home)">Ke Home</Link>
//       <Button handlePress={handleSubmit} text="Login" />
//       <Text style={styles.text}>
//         Don't have account?
//         <Link style={styles.link} href="register">
//           {" "}
//           Register here.
//         </Link>
//       </Text>
//       <StatusBar style="auto" hidden />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   logo: {
//     // width: 100,
//     // height: 100,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginTop: 15,
//     backgroundColor: "#f9f9f9",
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#4DB6AC",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 15,
//     width: "100%",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   link: {
//     color: "#19918F",
//     width: "100%",
//     alignItems: "left",
//   },
//   text: {
//     width: "100%",
//     marginLeft: 30
//   },
//   errorMessage:{
//     color: "#ff0000"
//   }
// });
