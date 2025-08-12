import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActionButton } from '../ActionButton';
import { Icon } from 'react-native-paper';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const ActionNav = () => {
  const actions = [
    { icon: 'add', label: 'Buy' },
    { icon: 'arrow-down', label: 'Sell' },
    { icon: 'arrow-up', label: 'Send' },
    { icon: 'download', label: 'Receive' },
  ];

  const sounds = useMemo(
    () => ({
      Buy: new Sound('note_buy_g5.mp3', Sound.MAIN_BUNDLE),
      Sell: new Sound('note_sell_b5.mp3', Sound.MAIN_BUNDLE),
      Send: new Sound('note_send_c6.mp3', Sound.MAIN_BUNDLE),
      Receive: new Sound('note_receive_g6.mp3', Sound.MAIN_BUNDLE),
    }),
    [],
  );

  const handlePress = (label: keyof typeof sounds) => {
    const sound = sounds[label];
    if (sound?.isLoaded()) {
      sound.stop(() => sound.play());
    } else {
      sound.play();
    }
  };

  return (
    <View style={styles.row}>
      {actions.map(({ icon, label }) => (
        <ActionButton
          key={label}
          icon={<Icon source={icon} size={20} color="#0d0c0cff" />}
          label={label}
          onPress={() => handlePress(label as keyof typeof sounds)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 8,
  },
});
