import React from 'react';
import { View, Text } from 'react-native';
import { IconButton, Portal, Dialog, Button } from 'react-native-paper';
import { useAuth } from '../../../context/AuthContext';
import color from '../../../ui/token/colors';
import { styles } from './Header.styles';
import { th } from '../i18n/t';

type Props = { username: string };

export const Header = ({ username }: Props) => {
  const { signOut, loading } = useAuth();
  const [visible, setVisible] = React.useState(false);

  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  const handleConfirmLogout = async () => {
    try {
      await signOut();
    } finally {
      closeDialog();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{th('brand')}</Text>
          <Text style={styles.subtitle}>{th('greeting', { username })}</Text>
        </View>

        <View style={styles.icons}>
          <IconButton
            icon="power"
            size={20}
            iconColor={color.brandBorder}
            onPress={openDialog}
            disabled={loading}
            style={{ margin: 0 }}
          />
        </View>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>{th('logout.title')}</Dialog.Title>
          <Dialog.Content>
            <Text>{th('logout.message', { username })}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>{th('logout.cancel')}</Button>
            <Button onPress={handleConfirmLogout} loading={loading}>
              {th('logout.confirm')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
