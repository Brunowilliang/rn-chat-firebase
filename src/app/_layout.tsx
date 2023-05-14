import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, } from "@expo-google-fonts/montserrat";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import "moment/locale/pt-br";
import { NativeBaseProvider, StatusBar } from "native-base";
import { useEffect, useState } from 'react';
import { Text } from "react-native";
import FlashMessage from "react-native-flash-message";
import "react-native-url-polyfill/auto";
// @ts-ignore
import log from "rnlog";
import { NativeBaseConfig, NativeBaseTheme } from "~/styles/nativeBaseTheme";



export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  // @ts-ignore
  if (Text.defaultProps == null) {
    // @ts-ignore
    Text.defaultProps = {};
    // @ts-ignore
    Text.defaultProps.allowFontScaling = false;
  };

  const queryClient = new QueryClient({});

  if (__DEV__) {
    log.config();
  }

  async function loadData() {
    await Font.loadAsync({
      Montserrat_400Regular,
      Montserrat_500Medium,
      Montserrat_600SemiBold,
      Montserrat_700Bold,
    });

    setAppIsReady(true);
  }


  useEffect(() => {
    loadData();
  }, []);

  return (
    !appIsReady ? <SplashScreen /> :
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider config={NativeBaseConfig} theme={NativeBaseTheme}>
          <FlashMessage position="top" />
          <StatusBar barStyle="default" translucent animated />
          <Stack screenOptions={{
            headerShown: false,
          }} />
        </NativeBaseProvider>
      </QueryClientProvider>
  );
}