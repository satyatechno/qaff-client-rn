import { put, takeLatest, select } from 'redux-saga/effects';
import {
    fetchFreelancer,
} from 'src/services/http.service';
import { token, freelancers, } from "src/selectors/Selector";

function* fetchFreelancerData(action) {
    // console.log('FREELANCER actionData', action.data);
    try {
        const res = yield fetchFreelancer({
            token: yield select(token),
            page: action.data.page,
            search: action.data.search,
            category_id: action.data?.category_id,
        });

        yield put({
            type: 'FREELANCER_DATA',
            freelancers: res.data.data.freelancers.data,
            has_more_page: res.data.data.freelancers.meta.has_more_pages,
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
function* fetchMoreFreelancerdata(action) {
    const freelancer = yield select(freelancers);
    // console.log('more freelancer actionData', action.data);
    try {
        const res = yield fetchFreelancer({
            token: yield select(token),
            page: action.data.page,
            search: action.data.search,
            category_id: action.data?.category_id,
        });
        yield put({
            type: 'FREELANCER_DATA',
            freelancers: freelancer.concat(res.data.data.freelancers.data),
            has_more_page: res.data.data.freelancers.meta.has_more_pages,
        });
    } catch (err) {
        console.log('myError', err);
    }
}


export function* freelancerActionWatcher() {
    yield takeLatest('FETCH_FREELANCER', fetchFreelancerData);
    yield takeLatest('FETCH_MORE_FREELANCER', fetchMoreFreelancerdata);
}
