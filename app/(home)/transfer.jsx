import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Amount from "../../components/Amount";

export default function Transfer() {
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#ffff" }}>
        <View
          style={{
            backgroundColor: "#19918F",
            paddingHorizontal: 20,
            paddingVertical: 8,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>To:</Text>
          <TextInput
            style={{ fontSize: 16 }}
            keyboardType="number-pad"
            placeholder="insert account number"
            placeholderTextColor={"#fff"}
            color={"#fff"}
          />
        </View>
        <View style={styles.container}>
          <Amount marginBottom={24} />
          <Input text={"Notes"} />
        </View>
      </ScrollView>
      <View>
        <Button text={"Transfer"} style={styles.button} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
});
