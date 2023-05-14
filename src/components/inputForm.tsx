import Ionicons from "@expo/vector-icons/Ionicons";
import { HStack, ITextProps } from 'native-base';
import { CaretDown } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { FilledTextField } from 'rn-material-ui-textfield';
import { colors, fonts } from '~/styles/theme';
import Pressable from "./pressable";
import Text from './text';

type Props = ITextProps & {
  label: string;
  select?: boolean;
  password?: boolean;
  small?: boolean;
  errorMessage?: any | string;
  prefix?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search' | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText?: (text: string) => void;
  value?: string;
  maxLength?: number;
  helpText?: string;
  textRight?: string;
  iconRight?: string;
  formatText?: object;
  iconLeft?: string;
  iconRightOnPress?: () => void;
  iconLeftOnPress?: () => void;
  onPress?: () => void;
  bg?: string;
  control: Control;
  name: string;
}

export const maskBRL = (text: string) => {
  let v: any = text.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  return v;
}

export const maskPhone = (text: string) => {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export const maskZipcode = (text: string) => {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

// create mas for cpf or cnpj ex: 000.000.000-00 or 00.000.000/0000-00
export const maskCpf = (text: string) => {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const maskCnpj = (text: string) => {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}



const InputForm = (p: Props) => {
  const [showPassword, setShowPassword] = useState(true);

  const ShowPassword = () => { setShowPassword(!showPassword) }

  return (
    <>
      <Pressable
        onPress={p.onPress}
        h={p.small ? '46px' : '56px'}
        w="100%"
        {...p}
      >
        <HStack
          h={p.small ? '46px' : '56px'}
          w="100%"
          bg={colors.white}
          px={4}
          // mb={p.errorMessage ? 5 : 0 || p.helpText ? 5 : 0}
          space={3}
          rounded="14px"
          borderWidth={1}
          borderColor={p.errorMessage ? colors.attention : colors.white}
          pointerEvents={p.select || p.disabled ? 'none' : 'auto'}
          alignItems="center"
          {...p}
        >
          <Controller
            control={p.control}
            name={p.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <FilledTextField
                label={p.label}
                renderLabel={() => <Text h6 bold>{p.label}</Text>}
                formatText={p.formatText}
                allowFontScaling={false}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                tintColor={colors.grey600}
                baseColor={colors.grey400}
                keyboardType={p.keyboardType}
                autoCapitalize={p.autoCapitalize}
                maxLength={p.maxLength}
                labelFontSize={13}
                prefix={p.prefix}
                activeLineWidth={0}
                lineWidth={0}
                autoCorrect={false}
                // error={p.errorMessage}
                // errorColor={colors.attention}
                secureTextEntry={p.password && showPassword}
                labelTextStyle={{
                  fontFamily: fonts.medium,
                  color: colors.grey400,
                  lineHeight: 18,
                }}
                titleTextStyle={{
                  fontFamily: fonts.bold,
                }}
                style={{
                  fontFamily: fonts.medium,
                  color: p.errorMessage ? colors.attention : colors.grey600,
                  marginBottom: p.small ? 3 : 0,
                }}
                containerStyle={{ flex: 1, height: 56, }}
                inputContainerStyle={{ backgroundColor: colors.transparent, }}
                affixTextStyle={{ fontFamily: fonts.semibold, }}
                contentInset={{ left: 0, right: 0, }}
              />
            )}
          />
          {p.password && (
            <TouchableOpacity onPress={ShowPassword}>
              <Ionicons name={showPassword ? 'ios-eye' : 'ios-eye-off'} color={p.errorMessage ? colors.attention : colors.grey400} size={24} />
            </TouchableOpacity>
          )}
          {p.select && (
            <CaretDown size={25} weight="bold" color={colors.grey400} />
          )}
        </HStack>
      </Pressable>
      {p.errorMessage && (
        <Text h6 semibold color={colors.attention}>{p.errorMessage}</Text>
      )}
      {p.helpText && (
        <Text h6 semibold color={colors.grey400}>{p.helpText}</Text>
      )}
    </>
  );
}

export default InputForm