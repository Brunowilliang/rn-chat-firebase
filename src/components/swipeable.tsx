import { Box, ScrollView } from 'native-base';
import React, { Ref, forwardRef, useImperativeHandle } from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { colors } from '~/styles/theme';

type Props = ModalizeProps & {
  children: React.ReactNode;
};

export interface SwipeableRef {
  open(): void;
  close(): void;
}

const Swipeable = forwardRef((props: Props, ref: Ref<SwipeableRef>) => {
  const modalRef = React.useRef<Modalize>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.open();
    },
    close: () => {
      modalRef.current?.close();
    },
  }));

  return (
    <Modalize
      ref={modalRef}
      modalStyle={{ backgroundColor: colors.background }}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      closeOnOverlayTap={true}
      withReactModal={true}
      handleStyle={{ backgroundColor: colors.secondary, }}
      HeaderComponent={<Box pt={7} />}
      adjustToContentHeight
      handlePosition='inside'
      {...props}
    >
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {props.children}
      </ScrollView>
    </Modalize>
  );
});

export default Swipeable;