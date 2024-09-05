import { View, Text,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'

const CustomButton = ({text,btnAction}) => {
  return (
    <TouchableOpacity  onPress={btnAction} style={styles.buttonContainer}>
    <View >   
        <Text style={styles.buttonText}> {text} </Text>
    </View>
    </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonContainer: {
        width: "50%",
        justifyContent: 'center',
        padding:20,
        backgroundColor: "#32ce89",
        borderRadius: 25,
        
      },
    
      buttonText:{
        color: 'white',
        fontSize: 14,
      },
})