// src/components/ScreenWrapper.tsx
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
// import { Feather } from '@expo/vector-icons';

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
      {title && (
        <View style={styles.header}>
          {showBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              {/* <Feather name="arrow-left" size={22} /> */}
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
          {showBack ? <View style={styles.backArrowPlaceholder} /> : null}
        </View>
      )}

      <Wrapper contentContainerStyle={[styles.content, style]}>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
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
