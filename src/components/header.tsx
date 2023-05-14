import { useNavigation } from '@react-navigation/native';
import { Box, IBoxProps } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import React from 'react';
import Text from '~/components/text';
import { colors } from '~/styles/theme';
import Pressable from './pressable';

interface Props extends IBoxProps {
  back?: boolean;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  color?: string;
}


const Header = (p: Props) => {
  const navigation = useNavigation();
  const voltar = () => navigation.goBack();

  return (
    <Box bg={colors.background} flexDir="row" justifyContent="space-between" alignItems="center" p={5} {...p}>
      {p.back && (
        <Pressable onPress={voltar} pr={4}>
          <CaretLeft size={25} weight="bold" color={p.color || colors.primary} />
        </Pressable>
      )}

      {p.onBack && (
        <Pressable onPress={p.onBack} pr={4}>
          <CaretLeft size={25} weight="bold" color={p.color || colors.primary} />
        </Pressable>
      )}

      <Box flex={1}>
        {p.title && <Text h2 medium color={p.color || colors.primary}>{p.title}</Text>}
        {p.subtitle && <Text h2 bold mt={-1} color={p.color || colors.primary}>{p.subtitle}</Text>}
      </Box>

      {p.rightComponent && (
        <Box>
          {p.rightComponent}
        </Box>
      )}
    </Box>
  )
}


export default Header