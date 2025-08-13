import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HttpLost } from '../../assets/svg';
import color from '../../ui/token/colors';
type Props = {
  title: string;
  message: string;
};

const HttpErrorModal: React.FC<Props> = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{title}</Text>
      <HttpLost height={110} width={120} />
      <Text style={styles.errorTextBottom}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    marginHorizontal: 16,
    color: color.grayTrackOff,
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  errorTextBottom: {
    marginHorizontal: 16,
    color: color.blueGray700,
    fontSize: 19,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HttpErrorModal;
