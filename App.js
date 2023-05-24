import { Provider, useSelector } from "react-redux"
import ScreenNav from "./components/Nav/ScreenNav"
import store from "./store"
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import { useFonts } from "expo-font"
import { Root } from "react-native-alert-notification"
import { StatusBar } from "react-native"

const App = () => {
  const [loaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium
  })
  if (!loaded) {
    return null
  }
  return (
    <Provider store={store}>
      <Root >
        <StatusBar translucent barStyle="dark-content" backgroundColor={'white'} />
        <ScreenNav />
      </Root>
    </Provider>
  )
}

export default App