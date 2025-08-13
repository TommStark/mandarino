import React from 'react';
import { Keyboard, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './SearchBar.styles';
import { te } from '../i18n/te';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  const ph = placeholder ?? te('search.placeholder');

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={ph}
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        left={<TextInput.Icon icon="search" />}
        right={
          value ? (
            <TextInput.Icon icon="close" onPress={() => onChange('')} />
          ) : undefined
        }
        returnKeyType="search"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </View>
  );
}
