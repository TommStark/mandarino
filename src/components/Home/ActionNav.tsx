import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActionButton } from '../ActionButton';
import { Icon } from 'react-native-paper';
import Sound from 'react-native-sound';
import { isIOS } from '../../utils/openAppSettings';

Sound.setCategory(isIOS ? 'Ambient' : 'Playback', true);

type Label = 'Buy' | 'Sell' | 'Send' | 'Receive';

export const ActionNav = () => {
  const actions: Array<{ icon: string; label: Label }> = useMemo(
    () => [
      { icon: 'add', label: 'Buy' },
      { icon: 'arrow-down', label: 'Sell' },
      { icon: 'arrow-up', label: 'Send' },
      { icon: 'download', label: 'Receive' },
    ],
    [],
  );

  const files: Record<Label, string> = useMemo(
    () => ({
      Buy: 'note_buy_g5.mp3',
      Sell: 'note_sell_b5.mp3',
      Send: 'note_send_c6.mp3',
      Receive: 'note_receive_g6.mp3',
    }),
    [],
  );

  const soundsRef = useRef<Record<Label, Sound | null>>({
    Buy: null,
    Sell: null,
    Send: null,
    Receive: null,
  });
  const loadedRef = useRef<Record<Label, boolean>>({
    Buy: false,
    Sell: false,
    Send: false,
    Receive: false,
  });

  useEffect(() => {
    (Object.keys(files) as Label[]).forEach(label => {
      const s = new Sound(files[label], Sound.MAIN_BUNDLE, err => {
        if (err) {
          console.warn(`[sound] load error ${label}:`, err);
          return;
        }
        loadedRef.current[label] = true;
      });
      soundsRef.current[label] = s;
    });

    return () => {
      (Object.keys(soundsRef.current) as Label[]).forEach(label => {
        soundsRef.current[label]?.release();
        soundsRef.current[label] = null;
        loadedRef.current[label] = false;
      });
    };
  }, [files]);

  const handlePress = (label: Label) => {
    const s = soundsRef.current[label];
    if (!s) return;
    if (loadedRef.current[label] || s.isLoaded()) {
      s.stop(() => {
        s.setCurrentTime(0);
        s.play(success => {
          if (!success) console.warn(`[sound] playback fail ${label}`);
        });
      });
    } else {
      s.setNumberOfLoops(0);
      const tryPlay = setInterval(() => {
        if (s.isLoaded()) {
          clearInterval(tryPlay);
          s.setCurrentTime(0);
          s.play();
        }
      }, 50);
      setTimeout(() => clearInterval(tryPlay), 2000);
    }
  };

  return (
    <View style={styles.row}>
      {actions.map(({ icon, label }) => (
        <ActionButton
          key={label}
          icon={<Icon source={icon} size={20} color="#0d0c0cff" />}
          label={label}
          onPress={() => handlePress(label)}
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
