import { Center, Spinner } from 'native-base';
import React from 'react';
import { colors } from '~/styles/theme';

type Props = {
  isLoading: boolean;
};

const Loading = (p: Props) => {
  return (
    p.isLoading ? (
      <Center bg={colors.blackOpacity} zIndex={99} position="absolute" top={0} left={0} w="full" h="full" {...p}>
        <Spinner mt={10} size="lg" color={colors.white} />
      </Center>
    ) : null
  );
}

export default Loading;