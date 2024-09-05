import { StyleSheet } from 'react-native';
import { COLORS, PADDING } from '../../../outils/constantes';

const dashboardStyles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
    backgroundColor: 'white',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 16,
  },
  scrollableList: {
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
  },
  title: {
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
  },
  titleBold: {
    fontWeight: 'bold',
  },
  link: {
    color: COLORS.main,
  },
  title_space_between: {
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pharmaciesContainer: {
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
  },
  pharmacyCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
    marginBottom: 20,
    borderRadius: 5,
  },
  pharmacyImg: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  pharmacyLocal: {
    backgroundColor: COLORS.main,
    padding: 5,
    paddingHorizontal: PADDING.horizontal,
    paddingVertical: PADDING.vertical,
    borderRadius: 200,
    fontSize: 14,
  },
  pharmacyName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
  },
  pharmacyInfo: {
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'center',
  },
});

export default dashboardStyles;
