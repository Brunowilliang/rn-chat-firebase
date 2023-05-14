import { MaterialIcons } from '@expo/vector-icons';
import { Box, CheckIcon, ISelectProps, Select } from 'native-base';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { colors, fonts } from '~/styles/theme';
import Text from './text';

type Props = ISelectProps & {
  placeholder?: string,
  title: string,
  items?: Array<{
    label: string,
    value: string | boolean | number,
    selected: boolean,
  }>,
  control: Control;
  name: string;
  errorMessage?: any | string;
}

const SelectInput = (p: Props) => {
  return (
    <Box flexDir="column" flex={1}>
      <Controller
        control={p.control}
        name={p.name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            {...p}
            w="100%"
            h="56px"
            color={p.errorMessage ? colors.attention : colors.grey400}
            fontFamily={fonts.medium}
            fontSize={16}
            borderColor={p.errorMessage ? colors.attention : colors.transparent}
            borderWidth={p.errorMessage ? 1 : 0}
            placeholderTextColor={p.errorMessage ? colors.attention : colors.grey400}
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
            accessibilityLabel={p.placeholder}
            allowFontScaling={false}
            placeholder={p.placeholder}
            bg={colors.secondary}
            rounded={14}
            dropdownCloseIcon={
              <Box mr={3}>
                <MaterialIcons name="keyboard-arrow-down" size={30} color={p.errorMessage ? colors.attention : colors.grey400} />
              </Box>
            }
            dropdownOpenIcon={
              <Box mr={3}>
                <MaterialIcons name="keyboard-arrow-down" size={30} color={p.errorMessage ? colors.attention : colors.grey400} />
              </Box>
            }
            _actionSheetContent={{
              bg: colors.secondary,
            }}
            _item={{
              bg: colors.transparent,
              py: 3,
              _text: {
                // allowFontScaling: false,
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
                // allowFontScaling: false,
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
            <Select.Item disabled alignItems="center" _disabled={{ opacity: 1 }} label={p.title} value="" />
            {p.items?.map((item, index) => (
              <Select.Item key={index} label={item.label} value={item.value} allowFontScaling={false} />
            ))}
          </Select>
        )}
      />
      {p.errorMessage && (
        <Text h6 ml={5} top={-5} medium color={colors.attention} mt={2}>
          {p.errorMessage}
        </Text>
      )}
    </Box>
  );
}

export default SelectInput;