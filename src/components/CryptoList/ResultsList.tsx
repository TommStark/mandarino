import React, { memo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { CryptoCard } from '../../components/CryptoCard';
import ListFooterLoading from '../../components/Shared/ListFooterLoading';
import EmptyState from '../../components/Shared/EmptyState';
import type { CryptoMarket } from '../../types/crypto';

type Props = {
  items: CryptoMarket[];
  isFetchingList: boolean;
  isFetchingNext: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
  onMomentumBegin: () => void;
  showSkeleton: boolean;
  SkeletonComponent: React.ReactElement | null;
};

function ResultsListImpl({
  items,
  isFetchingList,
  isFetchingNext,
  onLoadMore,
  onRefresh,
  onMomentumBegin,
  showSkeleton,
  SkeletonComponent,
}: Props) {
  if (showSkeleton) return SkeletonComponent;

  const contentContainerStyle = { paddingBottom: 16 };

  return (
    <FlatList
      data={items}
      keyExtractor={it => it.id}
      renderItem={({ item }) => <CryptoCard coin={item} />}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      onMomentumScrollBegin={onMomentumBegin}
      ListFooterComponent={isFetchingNext ? <ListFooterLoading /> : null}
      refreshControl={
        <RefreshControl
          refreshing={isFetchingList}
          onRefresh={onRefresh}
          progressViewOffset={64}
        />
      }
      contentContainerStyle={contentContainerStyle}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      initialNumToRender={12}
      windowSize={5}
      removeClippedSubviews
      ListEmptyComponent={
        !isFetchingList && items.length === 0 ? <EmptyState /> : null
      }
    />
  );
}
export default memo(ResultsListImpl);
