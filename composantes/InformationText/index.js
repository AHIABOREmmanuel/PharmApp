import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const informationText = ({text}) => {
  return (
    <View   style={styles.textCenter}>
    <Text style={styles.informationText}>{text}</Text>
      </View>

  )
}

export default informationText

const styles = StyleSheet.create({
    informationText:{
        width: "100%",
        marginTop: 10,
        
      },
    
})