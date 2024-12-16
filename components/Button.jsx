import { Text, TouchableOpacity, StyleSheet } from "react-native"

function Button({bgColor = "#19918F", text, handlePress = () => {}}){
    return(
      <TouchableOpacity onPress={handlePress} style={{...styles.button, backgroundColor: bgColor}}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '95%',
    alignItems: 'center',
    marginBottom: 15,
    marginTop:15,
    justifyContent: 'center',
    marginLeft: 10

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;