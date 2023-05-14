import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, } from "@expo-google-fonts/montserrat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font";
import { SplashScreen, useRouter } from "expo-router";
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Toast from '~/components/toast';
import api from '~/services/pocketbase';
import { Collections, UsersResponse } from '~/utils/types';

type AuthProviderProps = {
  user: UsersResponse;
  setUser: (user: UsersResponse) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthProviderProps>({} as AuthProviderProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsersResponse[]>(null as any);
  const [loading, setLoading] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();

  async function login(email: string, password: string) {
    setLoading(true);
    await api.collection(Collections.Users).authWithPassword(
      email, password,
    ).then((response) => {
      setUser(response.record as any);
      AsyncStorage.setItem('@MyFinance:user', JSON.stringify(response.record));
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhum usuário encontrado.', type: 'warning' });
    }).finally(() => {
      setLoading(false);
    });
  }

  async function logout() {
    setUser(null as any);
    AsyncStorage.removeItem('@MyFinance:user');
    api.authStore.clear();
  }

  async function loadData() {
    await Font.loadAsync({
      Montserrat_400Regular,
      Montserrat_500Medium,
      Montserrat_600SemiBold,
      Montserrat_700Bold,
    });


    const userStorage = await AsyncStorage.getItem('@MyFinance:user');
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }

    setAppIsReady(true);
  }


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      if (!user) {
        router.replace("(auth)/login");
      } else {
        router.replace("(app)/home");
      }
    }
  }, [appIsReady, user]);


  const value = { user, setUser, login, logout, loading } as any;

  return (
    <AuthContext.Provider value={value}>
      {appIsReady ? children : <SplashScreen />}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
