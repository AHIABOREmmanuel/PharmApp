import { View, Text,Image } from 'react-native'
import React from 'react' 
import { StatusBar } from 'expo-status-bar'

const Welcome = () => {
  return (
<View className="flex-1 justify-center items-center space-y-10 bg-amber-500" >
      < StatusBar style='light' />

      {/* logo image with rings */}
      <View className="bg-white/20 rounded-full p-10">
      {/* <Image source={require('../../../assets/Logo-Digipharma by K.png')}  */}
      style={{width:200,height: 200 }} />

      </View>
    

    {/* lTitle and punchline */}
    <View>
        <Text className="font-bold text-white tracking-widest" >
            EPHARMA
        </Text>
        <Text>
            Votre pharmacie connectée
        </Text>
    </View>
    </View>
  )
}

export default Welcome