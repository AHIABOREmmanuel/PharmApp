import { Image,StyleSheet } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <Image source={require('../assets/LOGO_JPOPE_DIGI-PHARMA_AHIABOR Koffi Emmanuel.jpg')} style={styles.imageContainer} />
  )
}

export default Logo

const styles = StyleSheet.create({
    imageContainer: {
        width: 90,
        height: 90,
        marginBottom: 20,
      },
      
})