import React from 'react'
import { Box, Divider, Menu, Pressable as Button, VStack } from 'native-base';
import { colors } from '~/styles/theme';
import Text from './text';
import { DotsThreeVertical } from 'phosphor-react-native';
import Pressable from './pressable';
import { TouchableOpacity } from 'react-native';

type Props = {
  iconName?: string,
  iconColor?: string,
  iconSize?: number,
  Icon?: Element | JSX.Element,
  items?: Array<{
    name?: string,
    onPress?: () => void
  }>,
}

const overlay = {
  style: {
    backgroundColor: 'rgba(0, 0, 0)',
  },
}

const MenuOptions = (p: Props) => {
  return (
    <Menu p={0} overflow="hidden" rounded="8px" bg={colors.white} placement={'bottom right'}
    _backdrop={{ backgroundColor: colors.black, opacity: 0.6 }}
    trigger={triggerProps => {
      return (
        <TouchableOpacity {...triggerProps}>
          {p.Icon}
        </TouchableOpacity>
      );
    }}>
    {p.items?.map(({ name, onPress }, index) => {
      return (
        <Box key={index}>
          <Menu.Item flex={1} onPress={onPress} px="15px" py="15px" _pressed={{ bgColor: colors.primaryOpacity }} >
            <Text h4 semibold>{name}</Text>
          </Menu.Item>
          {index < p.items?.length - 1 as any && <Divider bg={colors.grey400} />}
        </Box>
        )
      })}
      
    </Menu>
  )
}

export default MenuOptions
