import { StyleSheet } from "react-native";
import { useResizeMode } from "react-native-keyboard-controller";

export const GlobalStyles = {
  wrapper: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    color: 'white',
  },
  header: {
    margin: '2%',
    alignItems: 'flex-end',
  },
  screentitle: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 18,
    opacity: 1,
    textAlign: 'left',
  },
  covertitle: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 18,
    opacity: 1,
    textAlign: 'center',
  },
  body : {
    flex: 1,
    paddingHorizontal: '5%',
  },
  cover: {
    margin: '5%',
    alignSelf: 'center',
  },
  coverBox: {
    flex: 1,
    alignSelf: 'center',
    maxWidth: '70%',
    maxHeight: '70%',
    marginBottom: '10%'
  },
  boxContainer: {
    marginVertical: 10,
  },
  labelText: {
    width: 215,
    color: 'white',
    position: 'absolute',
    top: 2,
    left: 17,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 15,
    zIndex: 10,
  },
  inputField: {
    backgroundColor: 'rgba(85, 85, 85, 0.55)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
    color: 'white',
    fontSize: 15,
  },
  buttonContainer: {
    width: '100%',
    height: 46,
    backgroundColor: '#222222',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: '10'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  // --- NOVOS ESTILOS PARA LISTAS (HORIZONTAL) ---
  listContainerHorizontal: {
    height: 146,
  },
  listContentHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  listImageItem: {
    width: 104,
    height: 146,
  },
  //Grid
  sectiontitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    // marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  listContainerGrid: {
    marginBottom: 20,
  },
  gridItemWrapper: {
    width: '31.33%',
    height: 210,
    marginRight: '2%',
    marginBottom: '2.5%',
    backgroundColor: 'red'
  },
  listGridImage: {
    width: '100%',
    useResizeMode: 'cover'
  },
};

export const mergeStyles = (LocalStyles) => {
  const merged = {};

  for (const key in LocalStyles) {
    if (Object.prototype.hasOwnProperty.call(LocalStyles, key)) {
      merged[key] = LocalStyles[key];
    }
  }

  for (const key in GlobalStyles) {
    if (Object.prototype.hasOwnProperty.call(GlobalStyles, key)) {
      if (!merged[key]) {
        merged[key] = GlobalStyles[key];
      }
    }
  }
  
  return merged;
};