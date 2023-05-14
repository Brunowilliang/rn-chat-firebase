import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { Box, Center, ScrollView } from 'native-base';
import React from 'react';
import Button from '~/components/button';
import Text from '~/components/text';
import { colors } from '~/styles/theme';


const Index = () => {
  const router = useRouter();

  function handleSignIn() {
    auth().signInWithEmailAndPassword('brunowilliang@icloud.com', '123456')
      .then((userCredential) => {
        console.log('userCredential', userCredential);
      }).catch((error) => {
        console.log('error', error);
      });
  }


  return (
    <>
      <Box safeAreaTop bg={colors.background} flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Center flex={1}>
            <Text>
              Login
            </Text>
            <Button title='Login' onPress={handleSignIn} />
          </Center>
        </ScrollView>
      </Box>
    </>
  );
}

export default Index;