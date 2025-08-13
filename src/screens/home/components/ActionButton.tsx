import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';
import { styles } from './ActionButton.styles';

type Props = {
  icon?: React.ReactNode;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export const ActionButton = ({ icon, label, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};
