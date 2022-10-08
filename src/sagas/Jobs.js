import {put, select, takeLatest} from 'redux-saga/effects';
import {
  draftProjects,
  pastProjects,
  projects,
  token,
} from 'src/selectors/Selector';
import {displayJobs, editProject} from 'src/services/http.service';
function* fetchProjects(action) {
  console.log('actionData', action.data?.type);
  yield put({
    type: 'JOB_INITIAL_LOADING',
    data: true,
  });
  try {
    const proj = yield displayJobs({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
      search: action?.data?.search ?? ''
    });
    if (action.data.type === 'progress') {
      yield put({
        type: 'PROJECTS_RECEIVED',
        projects: proj.data.data.projects.data,
        has_more_page: proj.data.data.projects.meta.has_more_pages,
      });
    } else if (action.data.type === 'past') {
      yield put({
        type: 'PAST_PROJECTS_RECEIVED',
        pastProjects: proj.data.data.projects.data,
        has_more_page: proj.data.data.projects.meta.has_more_pages,
      });
    } else if (action.data.type === 'draft') {
      yield put({
        type: 'DRAFT_PROJECTS_RECEIVED',
        draftProjects: proj.data.data.projects.data,
        has_more_page: proj.data.data.projects.meta.has_more_pages,
      });
    }
  } catch (err) {
    console.log('myError', err);
  } finally {
    yield put({
      type: 'JOB_INITIAL_LOADING',
      data: false,
    });
  }
}

function* fetchMoreProjects(action) {
  const project = yield select(projects);
  const pastProject = yield select(pastProjects);
  const draftProject = yield select(draftProjects);
  // console.log('actionDatamore', action.data);
  try {
    const proj = yield displayJobs({
      token: yield select(token),
      type: action.data.type,
      page: action.data.page,
    });

    if (action.data.type === 'progress') {
      yield put({
        type: 'PROJECTS_RECEIVED',
        projects: project.concat(proj.data.data.projects.data),
        has_more_page: proj.data.data.projects.meta.has_more_pages,
      });
    } else if (action.data.type === 'past') {
      yield put({
        type: 'PAST_PROJECTS_RECEIVED',
        pastProjects: pastProject.concat(proj.data.data.projects.data),
        has_more_page: proj.data.data.projects.meta.has_more_pages,
      });
    } else {
      yield put({
        type: 'DRAFT_PROJECTS_RECEIVED',
        draftProjects: draftProject.concat(proj.data.data.projects.data),
        has_more_page: proj.data.data.projects.meta.has_more_pages,
      });
    }
  } catch (err) {
    console.log('myError', err);
  }
}

function* editProjectDetails(action) {
  let project = yield select(projects);
  console.log('more Edit project actionData', action.data?.type);
  try {
    if (action?.data?.type === 'draft') {
      yield put({
        type: 'SAVE_DRAFT_LOADING',
        data: true,
      });
    }
    const res = yield editProject({
      token: yield select(token),
      data: action.data.data,
      id: action.data.id,
    });

    if (action?.data?.type === 'edit') {
      project.map((item, index) => {
        if (item.id === res.data.data.project.id) {
          project[index] = res.data.data.project;
        }
      });
      yield put({
        type: 'FETCH_NEWSFEED',
        data: {page: 1},
      });
      yield put({
        type: 'SAVE_EDIT_PROJECT',
        projects: [...project],
      });
    }
    if (action?.data?.type === 'draft') {
      yield put({
        type: 'SAVE_DRAFT_LOADING',
        data: false,
      });
      // FETCH_PROJECTS({type: type, page: 1})
      yield put({
        type: 'FETCH_PROJECT',
        data: {type: 'draft', page: 1},
      });
    }
    yield put({
      type: 'MODAL_VISIBLE',
      data: {
        visible: true,
        type: 1,
        message: res.data.message,
      },
    });
    action.data.navigation.replace('ProjectDetails', {
      projectId: res.data.data.project.id,
    });
    yield put({
      type: 'LOADER',
      data: false,
    });
    console.log('edit data', res.data.data.project);
  } catch (err) {
    console.log('myError', err);
    yield put({
      type: 'LOADER',
      data: false,
    });
    yield put({
      type: 'SAVE_DRAFT_LOADING',
      data: false,
    });
  }
}

// function* fetchProposals(action) {
//   try {
//     const res = yield getProposals({
//       token: yield select(token),
//       id: action.data.id,
//       page: action.data.page,
//     });
//     yield put({
//       type: 'PROPOSALS',
//       proposals: res.data.data.proposals.data,
//       has_more_page: res.data.data.proposals.meta.has_more_pages,
//     });
//     yield put({
//       type: 'LOADER',
//       data: false,
//     });
//     // console.log('gggg', res.data.data.proposals);
//   } catch (err) {
//     console.log('myError', err);
//     yield put({
//       type: 'LOADER',
//       data: false,
//     });
//   }
// }
// function* fetchMoreProposals(action) {
//   const proposal = yield select(proposals);
//   try {
//     const res = yield getProposals({
//       token: yield select(token),
//       id: action.data.id,
//       page: action.data.page,
//     });
//     yield put({
//       type: 'PROPOSALS',
//       proposals: proposal.concat(res.data.data.proposals.data),
//       has_more_page: res.data.data.proposals.meta.has_more_pages,
//     });
//     // console.log('gggg', res.data.data.proposals);
//   } catch (err) {
//     console.log('myError', err);
//   }
// }
// function* createContracts(action) {
//   try {
//     const res = yield createContract({
//       token: yield select(token),
//       id: action.data.id,
//       data: action.data.data,
//     });
//     yield put({
//       type: 'LOADER',
//       data: false,
//     });

//     action.data.navigation.replace('SentOffer', {
//       freelancer: action.data.freelancer,
//     });
//     console.log('response Create Contracts', res.data);
//   } catch (err) {
//     console.log('myError CreateContract', err.response.data);
//     yield put({
//       type: 'LOADER',
//       data: false,
//     });
//     yield put({
//       type: 'MODAL_VISIBLE',
//       data: {
//         visible: true,
//         type: 2,
//         message: err.response.data.message,
//       },
//     });
//   }
// }

export function* jobsActionWatcher() {
  yield takeLatest('FETCH_PROJECT', fetchProjects);
  yield takeLatest('FETCH_MORE_PROJECT', fetchMoreProjects);
  yield takeLatest('EDIT_PROJECT', editProjectDetails);
  //   yield takeLatest('FETCH_PROPOSALS', fetchProposals);
  //   yield takeLatest('FETCH_MORE_PROPOSALS', fetchMoreProposals);
  //   yield takeLatest('CREATE_CONTRACTS', createContracts);
}
