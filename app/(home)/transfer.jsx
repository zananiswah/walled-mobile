import { View, Text, StyleSheet } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
function Transfer() {
  return (
    <View>
      <Text>Ini halaman transfer</Text>
      <Input text="Amount" />
      <Input text="Notes" />
      <Button text="Transfer"/>
    </View>
  );
}

export default Transfer;
