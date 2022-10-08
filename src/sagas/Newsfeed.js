import {put, takeLatest, select} from 'redux-saga/effects';
import {fetchNewsFeedData} from 'src/services/http.service';
import {token, newsfeed} from 'src/selectors/Selector';
// const token = (state) => state.myReducer.user.token;
// const newsfeed = (state) => state.myReducer.newsfeed;
function* fetchNewsFeed(action) {
  console.log('NewsFeed actionData', action.data);
  try {
    const newsfeeds = yield fetchNewsFeedData({
      token: yield select(token),
      page: action.data.page,
      search: action.data.search,
    });
    yield put({
      type: 'NEWSFEED_DATA',
      newsfeed: newsfeeds.data.data.posts.data,
      has_more_page: newsfeeds.data.data.posts.meta.has_more_pages,
    });
    yield put({
      type: 'HOME_INITIAL_LOADING',
      data: false,
    });
  } catch (err) {
    console.log('newsfeedError', err);
    yield put({
      type: 'HOME_INITIAL_LOADING',
      data: false,
    });
  }
}
function* fetchMoreNewsfeed(action) {
  const newsFeed = yield select(newsfeed);
  console.log('more NewsFeed actionData', action.data);
  try {
    const newsfeeds = yield fetchNewsFeedData({
      token: yield select(token),
      page: action.data.page,
      search: action.data.search,
    });

    yield put({
      type: 'NEWSFEED_DATA',
      newsfeed: newsFeed.concat(newsfeeds.data.data.posts.data),
      has_more_page: newsfeeds.data.data.posts.meta.has_more_pages,
    });
  } catch (err) {
    console.log('myError', err);
  }
}

export function* newsfeedActionWatcher() {
  yield takeLatest('FETCH_NEWSFEED', fetchNewsFeed);
  yield takeLatest('FETCH_MORE_NEWSFEED', fetchMoreNewsfeed);
}
