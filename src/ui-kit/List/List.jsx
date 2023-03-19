import {memo} from 'react';
import classes from './List.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
import CircularProgress from '@mui/material/CircularProgress';

function List({
  className = null,
  items,
  nextMethod = null,
  isHasMore = null,
  scrollableTargetId = null,
  itemBuilder,
  noData = null
}) {
  let isNoDataShown = !isHasMore && items.length === 0;
  return (
    <div className={classNames(classes.List, className)}>
      {isNoDataShown 
        ? noData
        : <InfiniteScroll
            dataLength={(items || []).length}
            next={nextMethod}
            hasMore={isHasMore}
            scrollableTarget={scrollableTargetId}
            scrollThreshold='300px'
            loader={
              <div className={classes.List__SpinerContainer}>
                <CircularProgress color='warning' />
              </div>
            } // TODO
            // TODO: endMessage={<div>Все данные загружены</div>}
          >
            {
              items.map(itemBuilder)
            }
          </InfiniteScroll>
      }
    </div>
  );
}

export default memo(List);