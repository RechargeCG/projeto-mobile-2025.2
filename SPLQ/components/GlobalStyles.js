import { StyleSheet } from "react-native";

const GlobalStyles = {
  wrapper: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
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
    // maxWidth: '70%',
    // maxHeight: '70%'
  },
  coverBox: {
    flex: 1,
    alignSelf: 'center',
    maxWidth: '70%',
    maxHeight: '70%',
    marginBottom: '10%'
  },
  boxContainer: {
    height: '80',
    marginVertical: '10'
  },
  labelText: {
    width: 215,
    color: 'white',
    position: 'absolute',
    top: 2,
    left: 15,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 15,
    zIndex: 10,
  },
  inputField: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(85, 85, 85, 0.55)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingTop: 20,
    color: 'white',
    fontSize: 15,
  }

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