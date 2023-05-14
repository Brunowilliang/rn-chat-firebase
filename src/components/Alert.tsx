import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { AlertDialog, HStack, VStack } from 'native-base';
import { colors } from '~/styles/theme';
import Button from './button';
import Text from './text';

type Props = {
  title?: string;
  description?: string;
  onPressTitle?: string;
  onCloseTitle?: string;
  onPress?: () => void;
  onClose?: () => void;
};

export type AlertRef = {
  showAlert: (p: Props) => void;
};

const Alert = forwardRef((props: Props, ref: React.Ref<AlertRef>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [onPressTitle, setOnPressTitle] = useState('');
  const [onCloseTitle, setOnCloseTitle] = useState('');

  useImperativeHandle(ref, () => ({
    showAlert: (p: Props) => {
      setTitle(p.title || '');
      setDescription(p.description || '');
      setOnPressTitle(p.onPressTitle || '');
      setOnCloseTitle(p.onCloseTitle || '');
      setOnPress(() => p.onPress ?? (() => {}));
      setOnClose(() => p.onClose ?? (() => {}));
      setIsOpen(true);
    },
  }));

  const leastDestructiveRef = useRef(null);

  const [onPress, setOnPress] = useState<Function>(() => {});
  const [onClose, setOnClose] = useState<Function>(() => {});

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handlePress = () => {
    setIsOpen(false);
    onPress();
  };


  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={leastDestructiveRef} _backdrop={{opacity: 0.7,}} onClose={handleClose}>
      <AlertDialog.Content bg={colors.secondary} p={3}>
        <VStack space={2} mb={7} mt={4}>
          <Text h3 bold textAlign="center">
            {title}
          </Text>
          <Text h5 color={colors.grey400} semibold textAlign="center">
            {description}
          </Text>
        </VStack>
        <HStack space={2}>
          {onCloseTitle && (
            <Button danger flex={1} title={onCloseTitle || 'Cancelar'} onPress={handleClose} />
          )}
          {onPressTitle && (
            <Button secondary flex={1} title={onPressTitle || 'Confirmar'} onPress={handlePress} />
          )}
        </HStack>
      </AlertDialog.Content>
    </AlertDialog>
  );
});

export default Alert;