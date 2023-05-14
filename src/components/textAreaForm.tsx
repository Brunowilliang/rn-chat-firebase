import React from 'react';
import { Box, Input, ITextAreaProps, TextArea as InputArea } from 'native-base';
import { colors, fonts } from '~/styles/theme';
import { Control, Controller } from 'react-hook-form';
import Text from './text';

type Props = ITextAreaProps & {
  control: Control;
  name: string;
  errorMessage?: any | string;
}

const TextArea = (p: Props) => {
  return (
    <>
      <Box rounded="14px">
        <Controller
          control={p.control}
          name={p.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputArea 
              h={32} 
              px={4}
              onBlur={onBlur}
              onChangeText={onChange}
              autoCorrect={false}
              allowFontScaling={false}
              value={value}
              borderColor={p.errorMessage ? colors.attention : colors.grey400}
              borderRadius={14}
              color={p.errorMessage ? colors.attention : colors.grey400}
              borderWidth={p.errorMessage ? 1 : 0}
              fontFamily={fonts.medium}
              bg={colors.secondary}
              placeholderTextColor={p.errorMessage ? colors.attention : colors.grey400}
              selectionColor={colors.grey400}
              _focus={{
                selectionColor: colors.grey400,
                placeholderTextColor: colors.grey600,
                bg: colors.secondary,
                rounded: '14px',
              }}
              fontSize={16}
              {...p}
            />
          )}
        />
      </Box>
      {p.errorMessage && (
        <Text h6 ml={5} top={-5} medium color={colors.attention} mt={2}>
          {p.errorMessage}
        </Text>
      )}
    </>
  );
}

export default TextArea;