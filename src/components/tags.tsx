import { colors } from '~/styles/theme';
import React from 'react';
import Pressable from './pressable';
import Text from './text';

type Props = {
  name: string;
  onPress: () => void;
  selected: boolean;
};

const Tag = (p: Props) => {
  return (
    <Pressable px={3}py={2}rounded="10px" bg={p.selected ? colors.primary : colors.secondary} onPress={p.onPress}>
      <Text semibold color={p.selected ? colors.white : colors.grey400}>
        {p.name}
      </Text>
    </Pressable>
  );
}

export default Tag;