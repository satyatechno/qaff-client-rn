import { put, takeLatest, select } from 'redux-saga/effects';
import {
    displaySavedPosts,
    displayLikedPosts,
} from 'src/services/http.service';
import { token, savedPosts, likedPosts, } from "src/selectors/Selector";

function* fetchSavedData(action) {
    // console.log('Saved actionData', action.data);
    try {
        const response = yield displaySavedPosts({
            token: yield select(token),
            page: action.data.page,
        });

        yield put({
            type: 'SAVED_DATA',
            savedPosts: response.data.data.posts.data,
            has_more_page: response.data.data.posts.meta.has_more_pages,
        });
        yield put({
            type: 'LOADER',
            data: false
        });
    } catch (err) {
        console.log('myError', err);
        yield put({
            type: 'LOADER',
            data: false
        });
    }
}
function* fetchMoreSavedData(action) {
    const savePost = yield select(savedPosts);
    // console.log('Saved more actionData', action.data);
    try {
        const response = yield displaySavedPosts({
            token: yield select(token),
            page: action.data.page,
        });

        yield put({
            type: 'SAVED_DATA',
            savedPosts: savePost.concat(response.data.data.posts.data),
            has_more_page: response.data.data.posts.meta.has_more_pages,
        });
    } catch (err) {
        console.log('myError', err);
    }
}

function* fetchLikedData(action) {
    // console.log('Liked actionData', action.data);
    try {
        const response = yield displayLikedPosts({
            token: yield select(token),
            page: action.data.page,
        });

        yield put({
            type: 'LIKED_DATA',
            likedPosts: response.data.data.posts.data,
            has_more_page: response.data.data.posts.meta.has_more_pages,
        });
        yield put({
            type: 'LOADER',
            data: false
        });

    } catch (err) {
        console.log('myError', err);
        yield put({
            type: 'LOADER',
            data: false
        });

    }
}
function* fetchMoreLikedData(action) {
    const likePost = yield select(likedPosts);
    // console.log('Liked more actionData', action.data);
    try {
        const response = yield displaySavedPosts({
            token: yield select(token),
            page: action.data.page,
        });

        yield put({
            type: 'LIKED_DATA',
            likedPosts: likePost.concat(response.data.data.posts.data),
            has_more_page: response.data.data.posts.meta.has_more_pages,
        });
    } catch (err) {
        console.log('myError', err);
    }
}


export function* profileActionWatcher() {
    yield takeLatest('FETCH_SAVED_POST', fetchSavedData);
    yield takeLatest('FETCH_MORE_SAVED_POST', fetchMoreSavedData);
    yield takeLatest('FETCH_LIKED_POST', fetchLikedData);
    yield takeLatest('FETCH_MORE_LIKED_POST', fetchMoreLikedData);
}


