import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar nombre',
}: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
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
const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, paddingTop: 8 },
  input: { backgroundColor: 'white' },
});
