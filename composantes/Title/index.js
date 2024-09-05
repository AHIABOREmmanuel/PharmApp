import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Title = ({title}) => {
  return (
    <Text style={styles.title}>{title}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    title:{
        fontSize: 22,
        color:'#32ce89',
        textTransform: "uppercase",
        marginBottom: 20,
      },
})