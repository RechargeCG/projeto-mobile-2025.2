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
    width: 111*2.5,
    height: 170*2.5
  },
  coverBox: {
    flex: 1,
    alignSelf: 'center',
    maxHeight: '65%',
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
    backgroundColor: 'rgba(15, 16, 16, 0.4)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20,
    color: 'white',
    fontSize: 15,
  },
  displayField: {
    backgroundColor: 'rgba(15, 16, 16, 0.4)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingTop: 20, 
    paddingBottom: 20,
    justifyContent: 'center',
    minHeight: 60,
  },
  displayFieldText: {
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
    marginTop: 15,
    marginBottom: 10,
  },
  listContainerGrid: {
    marginBottom: 20,
  },
  gridItemWrapper: {
    width: '33.33%',
    height: 170,
    marginRight: '2%',
    marginBottom: '2.5%',
  },
  listGridImage: {
    width: 111,
    height: 170
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  modalListContainer: {
    width: '100%',
    flexGrow: 1,
  },
  modalListContent: {
    paddingBottom: 10,
  },
  modalTagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  modalTagText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCheckboxSelected: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
  modalCheckMark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalButtonGroup: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '48%',
    alignItems: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#6c757d',
  },
  modalSaveButton: {
    backgroundColor: '#1E90FF',
  },
  modalTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  // Container principal da caixa expansível (apenas margens)
  expandableBoxContainer: {
    marginVertical: 10,
    // Não precisa de altura fixa, o conteúdo define a altura
  },

  // View que imita o inputField visualmente
  expandableBoxField: {
    backgroundColor: 'rgba(15, 16, 16, 0.4)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  // Estilo do Texto
  expandableBoxText: {
    color: 'white',
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    // A chave da truncagem é o numberOfLines no JSX
  },
  
  // Estilos para o botão "Ler Mais"
  expandableButton: {
    marginTop: 5,
    paddingVertical: 5,
    alignSelf: 'flex-start', // Garante que o touch area seja pequeno
  },
  expandableButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
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