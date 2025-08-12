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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenBackground />

      {title && (
        <View style={styles.header}>
          {showBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon source="arrow-back" size={22} />
            </TouchableOpacity>
          )}

          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.content, styles.paddingBottom, style]}
          keyboardShouldPersistTaps="handled"
          bounces={true}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, style]}>{children}</View>
      )}
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
  paddingBottom: {
    paddingBottom: 5,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
});
