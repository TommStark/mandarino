import React, { memo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { CryptoMarket } from '../../../types/coingecko';
import CryptoCard from '../../../components/CryptoCard/CryptoCard';
import ListFooterLoading from '../../../components/Shared/ListFooterLoading';
import EmptyState from '../../../components/Shared/EmptyState';
import { styles } from './ResultsList.styles';
import { t } from 'i18next';

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
      contentContainerStyle={styles.content}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      initialNumToRender={12}
      windowSize={5}
      removeClippedSubviews
      ListEmptyComponent={
        !isFetchingList && items.length === 0 ? (
          <EmptyState
            title={t('shared:emptyState.title')}
            subtitle={t('shared:emptyState.message')}
          />
        ) : null
      }
    />
  );
}

export default memo(ResultsListImpl);
