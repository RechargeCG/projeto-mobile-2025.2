import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Generico from './Telas/Generico';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Generico">
        <Stack.Screen name="Generico" component={Generico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
