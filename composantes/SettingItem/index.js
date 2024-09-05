import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLORS } from '../../outils/constantes'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './style'



export default function SettingItem({item}) {
  return (
    <TouchableOpacity style={styles.container}>
        <Text> {item.libelle}</Text>
        {/* <AntDesing name="arrowright" size={20} color={COLORS.main} /> */}
    </TouchableOpacity>
   
      
   
  )
};
