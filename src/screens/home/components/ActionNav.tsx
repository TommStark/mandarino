import React, { useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { ActionButton } from './ActionButton';
import { Icon } from 'react-native-paper';
import Sound from 'react-native-sound';
import { isIOS } from '../../../utils/openAppSettings';
import color from '../../../ui/token/colors';
import { styles } from './ActionNav.styles';
import { th } from '../i18n/t';

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

  const labelKey: Record<Label, 'buy' | 'sell' | 'send' | 'receive'> = {
    Buy: 'buy',
    Sell: 'sell',
    Send: 'send',
    Receive: 'receive',
  };

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
    const currentSounds: Record<Label, Sound | null> = {
      Buy: null,
      Sell: null,
      Send: null,
      Receive: null,
    };

    const soundsRefCurrent = soundsRef.current;
    const loadedRefCurrent = loadedRef.current;

    (Object.keys(files) as Label[]).forEach(label => {
      const sound = new Sound(files[label], Sound.MAIN_BUNDLE, err => {
        if (err) return;
        loadedRefCurrent[label] = true;
      });
      soundsRefCurrent[label] = sound;
      currentSounds[label] = sound;
    });

    return () => {
      (Object.keys(currentSounds) as Label[]).forEach(label => {
        currentSounds[label]?.release();
        soundsRefCurrent[label] = null;
        loadedRefCurrent[label] = false;
      });
    };
  }, [files]);

  const handlePress = (label: Label) => {
    const sound = soundsRef.current[label];
    if (!sound) return;
    if (loadedRef.current[label] || sound.isLoaded()) {
      sound.stop(() => {
        sound.setCurrentTime(0);
        sound.play();
      });
    } else {
      sound.setNumberOfLoops(0);
      const tryPlay = setInterval(() => {
        if (sound.isLoaded()) {
          clearInterval(tryPlay);
          sound.setCurrentTime(0);
          sound.play();
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
          icon={<Icon source={icon} size={20} color={color.black} />}
          label={th(`actions.${labelKey[label]}`)}
          onPress={() => handlePress(label)}
        />
      ))}
    </View>
  );
};
