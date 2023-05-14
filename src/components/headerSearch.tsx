import React, { useRef, useState } from 'react'
import Text from '~/components/text';
import { colors } from '~/styles/theme';
import { Box, IBoxProps } from 'native-base';
import Pressable from './pressable';
import Input from './input';
import { CaretLeft, MagnifyingGlass, Trash, X } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

interface Props extends IBoxProps {
  back?: boolean;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  value?: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  // clearText: () => void;
}


const Header = (p: Props) => {
  const navigation = useNavigation();
  const voltar = () => navigation.goBack();

  const searchRef = useRef<any>();
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    setOpen(!open);
    p.onSearch();
    searchRef.current.focus();
  }

  const handleClear = () => {
    setOpen(false);
    p.onSearch();
    searchRef.current.blur();
  }

  const handleClearText = () => {
    setOpen(false);
    p.onChangeText('');
    searchRef.current.blur();
  }

  return (
    <Box safeAreaTop bg={colors.background} flexDir="row" justifyContent="space-between" alignItems="center" p={5} {...p}>
      {p.back && (
        <Pressable onPress={voltar} pr={4}>
          <CaretLeft size={25} weight="bold" color={colors.white} />
        </Pressable>
      )}

      {p.onBack && (
        <Pressable onPress={p.onBack} pr={4}>
          <CaretLeft size={25} weight="bold" color={colors.white} />
        </Pressable>
      )}

      <Box flex={!open ? 1 : 0} display={!open ? 'flex' : 'none'}>
        {p.title && <Text h2 medium color={colors.white}>{p.title}</Text> }
        {p.subtitle && <Text h2 bold mt={-1} color={colors.white}>{p.subtitle}</Text>}
      </Box>

      <Box flex={open ? 1 : 0} display={open ? 'flex' : 'none'}>
          <Input
            display={open ? 'flex' : 'none'}
            search
            label='Pesquise pelo nome'
            value={p.value}
            inputRef={searchRef}
            returnKeyType="search"
            onChangeText={(text) => {p.onChangeText(text)}}
            onSubmitEditing={() => {handleClear()}}
            onEndEditing={() => {handleClear()}}
            rightComponent={
              <Pressable onPress={() => handleClearText()}>
                <X size={22} weight="bold" color={colors.grey400} />
              </Pressable>
            }
          />
      </Box>
        <Pressable display={open ? 'none' : 'flex'} onPress={() => handleSearch()} px={3}>
          <MagnifyingGlass size={22} weight="bold" color={colors.white} />
        </Pressable>
        {!open && p.rightComponent}
      </Box>
  )
}


export default Header