import React from 'react';
import { Box, ITextAreaProps, Text, TextArea as InputArea } from 'native-base';
import { colors, fonts } from '~/styles/theme';

type Props = ITextAreaProps;

const TextArea = (p: Props) => {
  return (
    <Box bg={colors.secondary} rounded="14px">
      <InputArea 
        h={20} 
        px={4}
        allowFontScaling={false}
        borderColor={colors.grey400}
        selectionColor={colors.grey400}
        borderWidth={0}
        autoCorrect={false}
        fontFamily={fonts.medium}
        placeholderTextColor={colors.grey400}
        _focus={{
          selectionColor: colors.grey400,
          placeholderTextColor: colors.grey600,
          bg: colors.secondary,
          rounded: '14px',
        }}
        fontSize={16}
        color={colors.grey400}
        {...p}
      />
    </Box>
  );
}

export default TextArea;