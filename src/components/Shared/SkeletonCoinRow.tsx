import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SkeletonCoinRow = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      alignItems="center"
      padding={16}
    >
      <SkeletonPlaceholder.Item width={36} height={36} borderRadius={18} />
      <SkeletonPlaceholder.Item marginLeft={12} flex={1}>
        <SkeletonPlaceholder.Item width={140} height={14} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={8}
          width={90}
          height={12}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item alignItems="flex-end">
        <SkeletonPlaceholder.Item width={80} height={14} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={8}
          width={60}
          height={12}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const SkeletonCoinList = ({ count = 8 }: { count?: number }) => (
  <View>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCoinRow key={i} />
    ))}
  </View>
);
