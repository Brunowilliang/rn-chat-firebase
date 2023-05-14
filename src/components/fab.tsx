import { Fab, IFabProps } from 'native-base';
import React from 'react';
import { colors } from '~/styles/theme';

type Props = IFabProps & {
}


const FabButton = (p: Props) => {
  return (
    <Fab
      bg={colors.primary}
      _pressed={{ bg: colors.primary, opacity: 0.5 }}
      renderInPortal={false}
      right={5}
      p={4}
      bottom={5}
      shadow={2}
      size="lg"
      {...p}
    />
  )
}

export default FabButton;