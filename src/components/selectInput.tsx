import { Box, CheckIcon, ISelectProps, Select } from 'native-base';
import React from 'react';
import { colors, fonts } from '~/styles/theme';
import { MaterialIcons } from '@expo/vector-icons';
import Text from './text';

type Props = ISelectProps & {
  placeholder?: string,
  title: string,
  items?: Array<{
    label: string,
    value: string | boolean | number,
    selected: boolean,
  }>,
}

const SelectInput = (p: Props) => {
  return (
    <Select
      {...p}
      w="100%"
      h="56px"
      placeholderTextColor={colors.grey400}
      color={colors.grey400}
      fontFamily={fonts.medium}
      fontSize={16}
      selectedValue={p.selectedValue}
      onValueChange={p.onValueChange}
      accessibilityLabel={p.placeholder}
      placeholder={p.placeholder}
      bg={colors.secondary}
      borderColor={colors.transparent}
      rounded={14}
      dropdownCloseIcon={
        <Box mr={3}>
          <MaterialIcons name="keyboard-arrow-down" size={30} color={colors.grey400} />
        </Box>
      }
      dropdownOpenIcon={
        <Box mr={3}>
          <MaterialIcons name="keyboard-arrow-down" size={30} color={colors.grey400} />
        </Box>
      }
      _actionSheetContent={{
        bg: colors.secondary,
      }}
      _item={{
        bg: colors.transparent,
        py: 3,
        _text: {
          color: colors.grey400,
          fontFamily: fonts.semibold,
          fontSize: 16,
        },
        _pressed: {
          bg: colors.transparent,
          opacity: 0.5
        },
      }}
      _selectedItem={{
        bg: colors.primary,
        rounded: 8,
        py: 3,
        justifyContent: 'center',
        startIcon: <CheckIcon size="6" color={colors.white} />,
        _text: {
          color: colors.white,
          fontFamily: fonts.semibold,
          fontSize: 16,
        },
        _pressed: {
          bg: colors.primaryLight,
          opacity: 0.5
        },
      }}
      >
        <Select.Item disabled alignItems="center" _disabled={{opacity: 1}} label={p.title} value="" />
        {p.items?.map((item, index) => (
          <Select.Item key={index} label={item.label} value={item.value} />
          ))}
      </Select>
  );
}

export default SelectInput;