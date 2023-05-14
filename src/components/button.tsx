import React from 'react';
import { colors } from '../styles/theme';
import Text from './text';
import { IPressableProps, Pressable } from 'native-base';

type Props = IPressableProps & {
  onPress?: () => void;
  title?: string;
  titleColor?: string;
  secondary?: boolean;
  danger?: boolean;
  children?: React.ReactNode;
};


const Button = ( p: Props) => {
  return (
    <Pressable _pressed={{ opacity: 0.4 }} _disabled={{ opacity: 0.4 }} h="56px" w="100%" alignItems="center" justifyContent="center"
      bg={
        p.secondary ? colors.transparent : p.danger ? colors.attention_light : colors.primary
      } rounded={8} {...p} >
        {p.title && (
          <Text h4 semibold color={
            p.secondary ? colors.primary : p.danger ? colors.attention : colors.white
          }>{p.title}</Text>
        )}
        {p.children}
    </Pressable>
  )
}

export default Button;

