import { View, Text, StyleSheet, useState } from "react-native";
import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import DropdownPickerComponent from "../../components/Dropdown";

function Topup(){
  return(
    <>
      <View style={styles.container}>
          <Amount  marginBottom={24} />
          <DropdownPickerComponent/>
          <Input text={"Notes"} />
      </View>
      <View>
      <Button text={"Top Up"} style= {styles.button}/>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
      backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20
  }
});

export default Topup;