import { StyleSheet } from "react-native";
import { PADDING } from "../../outils/constantes";

const styles = StyleSheet.create({
    container:{
        marginTop: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        
        elevation: 5,
        justifyContent: 'space-between',
        paddingVertical: PADDING.vertical,
        paddingHorizontal: PADDING.horizontal

    },
})

export default styles;