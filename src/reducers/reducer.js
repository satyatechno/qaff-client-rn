import AsyncStorage from '@react-native-community/async-storage';

const myReducer = (state, action) => {
  if (!state) {
    return {
      user: [],
      projects: [],
      pastProjects: [],
      draftProjects: [],
      savedPosts: [],
      likedPosts: [],
      newsfeed: [],
      jobs_page_loading: false,
      has_more_jobs_page: false,
      has_more_newsfeed_page: false,
      home_page_loading: false,
      has_more_saved_page: false,
      saved_page_loading: false,
      has_more_liked_page: false,
      liked_page_loading: false,
      freelancers_page_loading: false,
      has_more_freelancers_page: false,
      loading: false,
      modal: {},
      freelancers: [],
      latest: [],
      jobInitialLoading: false,
      homeInitialLoading: false,
      saveDraftLoading: false,
      freelancerByProject: [],
      hasMoreFreelancerProjectPage: false,
    };
  }

  switch (action.type) {
    case 'SAVE_USER':
      console.log('REDUX_USER_DATA', action.data);
      AsyncStorage.setItem('FirstTimeLogin', 'true');
      return {
        ...state,
        user: action.data,
      };

    case 'FETCH_MORE_PROJECT':
      return {
        ...state,
        jobs_page_loading: true,
      };
    case 'PROJECTS_RECEIVED':
      return {
        ...state,
        projects: action.projects,
        has_more_jobs_page: action.has_more_page,
        jobs_page_loading: false,
      };
    case 'PAST_PROJECTS_RECEIVED':
      return {
        ...state,
        pastProjects: action.pastProjects,
        has_more_jobs_page: action.has_more_page,
        jobs_page_loading: false,
      };
    case 'DRAFT_PROJECTS_RECEIVED':
      return {
        ...state,
        draftProjects: action.draftProjects,
        has_more_jobs_page: action.has_more_page,
        jobs_page_loading: false,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          employer_profile: action.data,
        },
      };

    case 'NEWSFEED_DATA':
      return {
        ...state,
        newsfeed: action.newsfeed,
        has_more_newsfeed_page: action.has_more_page,
        home_page_loading: false,
      };
    case 'FETCH_MORE_NEWSFEED':
      return {
        ...state,
        home_page_loading: true,
      };
    case 'UPDATE_SAVE_STATUS':
      let newsFeedData = [...state.newsfeed];
      let savedPostData = [...state.savedPosts];
      let likedPostData = [...state.likedPosts];

      newsFeedData.map((item) => {
        if (item.id === action.data.id) {
          item.is_saved = action.data.value;
        }
      });

      likedPostData.map((item) => {
        if (item.id === action.data.id) {
          item.is_saved = action.data.value;
        }
      });
      if (!action.data.value) {
        savedPostData = savedPostData.filter(
          (item) => item.id !== action.data.id,
        );
      } else {
        let Item = newsFeedData.find((item) => item.id === action.data.id);
        if (Item !== undefined) savedPostData = [Item, ...savedPostData];
      }

      return {
        ...state,
        newsfeed: newsFeedData,
        savedPosts: savedPostData,
        likedPosts: likedPostData,
      };
    case 'UPDATE_LIKE_STATUS':
      newsFeedData = [...state.newsfeed];
      likedPostData = [...state.likedPosts];
      savedPostData = [...state.savedPosts];
      newsFeedData.map((feed) => {
        if (feed.id === action.data.id) {
          feed.is_liked = action.data.value;
        }
      });
      savedPostData.map((saved) => {
        if (saved.id === action.data.id) {
          saved.is_liked = action.data.value;
        }
      });
      if (!action.data.value) {
        likedPostData = likedPostData.filter(
          (data) => data?.id !== action.data.id,
        );
      } else {
        let Item = newsFeedData.find((news) => news.id === action.data.id);
        if (Item !== undefined) likedPostData = [Item, ...likedPostData];
      }
      return {
        ...state,
        newsfeed: newsFeedData,
        savedPosts: savedPostData,
        likedPosts: likedPostData,
      };

    case 'SAVED_DATA':
      return {
        ...state,
        savedPosts: action.savedPosts,
        has_more_saved_page: action.has_more_page,
        saved_page_loading: false,
      };
    case 'FETCH_MORE_SAVED_POST':
      return {
        ...state,
        saved_page_loading: true,
      };

    case 'LIKED_DATA':
      return {
        ...state,
        likedPosts: action.likedPosts,
        has_more_liked_page: action.has_more_page,
        liked_page_loading: false,
      };
    case 'FETCH_MORE_LIKED_POST':
      return {
        ...state,
        liked_page_loading: true,
      };
    case 'FREELANCER_DATA':
      return {
        ...state,
        freelancers: action.freelancers,
        has_more_freelancers_page: action.has_more_page,
        freelancers_page_loading: false,
      };
    case 'FETCH_MORE_FREELANCER':
      return {
        ...state,
        freelancers_page_loading: true,
      };

    case 'SAVE_EDIT_PROJECT':
      return {
        ...state,
        projects: action.projects,
      };
    case 'LOADER':
      return {
        ...state,
        loading: action.data,
      };

    case 'SAVE_DRAFT_LOADING':
      return {
        ...state,
        saveDraftLoading: action.data,
      };
    case 'MODAL_VISIBLE':
      return {
        ...state,
        modal: action.data,
      };
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        projects: action.data,
      };
    case 'UPDATE_EMAIL':
      return {
        ...state,
        user: {
          ...state.user,
          employer_profile: {
            ...state.user.employer_profile,
            email: action.data,
          },
        },
      };
    case 'UPDATE_MOBILE':
      return {
        ...state,
        user: {
          ...state.user,
          employer_profile: {
            ...state.user.employer_profile,
            country_code: action.data[0],
            phone: action.data[1],
          },
        },
      };
    case 'UPDATE_FREELANCER':
      return {
        ...state,
        freelancers: action.freelancers,
      };

    case 'JOB_INITIAL_LOADING':
      return {
        ...state,
        jobInitialLoading: action.data,
      };
    case 'HOME_INITIAL_LOADING':
      return {
        ...state,
        homeInitialLoading: action.data,
      };
    case 'FETCH_FREELANCER_BY_PROJECT':
      return {
        ...state,
        freelancerByProject:
          action?.data?.currentPage == 1
            ? [...action.data?.freelancer]
            : [...state.freelancerByProject, ...action.data?.freelancer],

        hasMoreFreelancerProjectPage: action.data?.hasMorePage,
      };
    case 'UPDATE_FREELANCER_BY_PROJECT':
      return {
        ...state,
        freelancerByProject: action.data,
      };
    default:
      return state;
  }
};

export default myReducer;
