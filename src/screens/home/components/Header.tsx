import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Portal, Dialog, Button } from 'react-native-paper';
import { useAuth } from '../../../context/AuthContext';
import color from '../../../ui/token/colors';

type Props = {
  username: string;
};

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
          <Text style={styles.title}>Mandarino</Text>
          <Text style={styles.subtitle}>
            Buenos dias, <Text style={styles.name}>{username}</Text>
          </Text>
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
          <Dialog.Title>Cerrar sesión</Dialog.Title>
          <Dialog.Content>
            <Text>¿Querés cerrar la sesión de {username}?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={handleConfirmLogout} loading={loading}>
              Cerrar sesión
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: color.brand,
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: color.brandBorder,
    marginTop: 2,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
  },
});
