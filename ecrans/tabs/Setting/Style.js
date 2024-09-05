import { StyleSheet } from "react-native";
import { PADDING } from "../../../outils/constantes";


const Styles = StyleSheet.create({
    container: {
        flex: 1,
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical, 
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  Image: {
    width: 80,
    height: 80,
    borderRaduis: 80/2,
  },

  userInfo:{
    fontWeight: 'bold',
    marginBottom:5,
  },

  userName: {
   marginLeft: 15,
  },

  userEmail: {
    marginBottom: 5,
  }

})

export default Styles;