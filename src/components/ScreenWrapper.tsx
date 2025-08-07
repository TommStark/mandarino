import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { ScreenBackground } from './ScreenBackground';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  title?: string;
  showBack?: boolean;
};
export const ScreenWrapper = ({
  children,
  scroll = false,
  style,
  title,
  showBack = false,
}: Props) => {
  const navigation = useNavigation();
  const Wrapper = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenBackground />
      {title && (
        <View style={styles.header}>
          {showBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon source="arrow-back" size={22} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
          {showBack ? <View style={styles.backArrowPlaceholder} /> : null}
        </View>
      )}
      <Wrapper
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: 5,
          },
          style,
        ]}
        keyboardShouldPersistTaps="handled"
        bounces={true}
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  backArrow: {
    fontSize: 22,
    color: '#FF6600',
  },
  backArrowPlaceholder: {
    width: 22,
  },
});
