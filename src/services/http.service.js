import axios from 'axios';
import {I18nManager} from 'react-native';
import {LOGOUT_ACTION} from 'src/actions/action';
import {store} from 'src/store';
import * as RootNavigation from 'src/utils/Navigation';

const axiosInstance = axios.create({
  baseURL:
    // 'http://qaff-backend-env.eba-gfth7thz.me-south-1.elasticbeanstalk.com/api/',
    // 'http://157.175.79.139/back-dev/api',
    'https://dev.qaff.com/back-dev/api/',
  // 'https://backend.qaff.com/api/',

  headers: {
    Accept: 'application/json',
    'Accept-Language': I18nManager.isRTL ? 'ar' : 'en',
    // Authorization: `Bearer ${token}`
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      RootNavigation.dispatch('Intro', {screen: 'Login'});
      store.dispatch(LOGOUT_ACTION());
      alert(error?.response?.data?.message);
      // EventRegister.emit('UNAUTHORIZED');
      console.log('Unauthorized req', error?.response?.status);
    } else if (error?.response?.status === 500) {
      console.log('error 500', JSON.stringify(error?.response, null, 2));
      alert(error?.response?.data?.message);
    } else if (error?.response?.status === 404) {
      alert(error?.response?.data?.message);
    } else if (error?.response?.status === 406) {
      throw error;
    } else if (error?.response?.status === 422) {
      throw error;
    } else {
      alert('Something went wrong');
      throw error;
    }
  },
);

export const register = (data) => {
  return axiosInstance.post('register/employer', data);
};
export const resendOTP = (data) => {
  return axiosInstance.post(
    'sendEmailVerification',
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const login = (data) => {
  return axiosInstance.post(`login/employer`, data);
};

export const emailVerification = (data) => {
  return axiosInstance.post('verifyEmailOtp', data, {
    params: {account_type: 'employer'},
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const createPassword = (data) => {
  return axiosInstance.post('verifyEmailAndSetPassword', data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const projectFormData = () => {
  return axiosInstance.get('data/project_form_data');
};

export const jobCategory = (data) => {
  return axiosInstance.get('categories/main', {
    params: {q: data?.search},
  });
};

export const jobSubCategory = (id) => {
  return axiosInstance.get(`category/${id}`);
};

export const postProject = (data, token) => {
  return axiosInstance.post('employer/project/create', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const projectDetails = (projectId, token) => {
  return axiosInstance.get(`employer/project/${projectId}/show`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const displayJobs = (data) => {
  return axiosInstance.get('employer/projects', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      type: data.type,
      page: data.page,
      search: data.search,
    },
  });
};
export const recoverPassword = (data) => {
  return axiosInstance.post('reset_password/send_otp', data);
};
export const otpVerification = (data) => {
  return axiosInstance.post('reset_password/check_otp', data);
};
export const createNewPassword = (data) => {
  return axiosInstance.post('reset_password/set_password', data);
};

export const fetchCarouselData = (data) => {
  return axiosInstance.get('employer/banner_images', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const fetchNewsFeedData = (data) => {
  return axiosInstance.get(
    'employer/news_feed',

    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      params: {
        page: data.page,
        search: data.search,
      },
    },
  );
};
export const saveUnsave = (data) => {
  // console.log("hellooo",data)
  return axiosInstance.post(
    `employer/saved_posts/post/${data.id}/${data.status}`,
    {},

    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const likeUnlike = (data) => {
  return axiosInstance.post(
    `employer/liked_posts/post/${data.id}/${data.status}`,
    {},

    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const displaySavedPosts = (data) => {
  return axiosInstance.get('employer/saved_posts', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      page: data.page,
    },
  });
};
export const displayLikedPosts = (data) => {
  return axiosInstance.get('employer/liked_posts', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      page: data.page,
    },
  });
};
export const updateProfile = (data, token) => {
  return axiosInstance.post('employer/profile/update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const fetchPostByCategory = (data) => {
  // console.log("jjj",data)
  return axiosInstance.get(
    'employer/news_feed',

    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      params: {
        page: data.page,
        category_id: data.categoryId,
        search: data?.search,
      },
    },
  );
};
export const fetchFreelancer = (data) => {
  return axiosInstance.get('employer/browse/freelancers', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      page: data.page,
      category_id: data?.category_id,
      search: data?.search,
    },
  });
};
export const viewFreelancerProfile = (data) => {
  return axiosInstance.get(`employer/browse/freelancer/${data.id}/show`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const fetchPortfolio = (data) => {
  return axiosInstance.get(`employer/browse/freelancer/${data.id}/portfolio`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const fetchPortfolioDetails = (data) => {
  return axiosInstance.get(
    `employer/browse/freelancer/${data.freelancerId}/portfolio/${data.portfolioId}/show`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};

export const removeAttachment = (data) => {
  console.log('rma', data);
  return axiosInstance.post(`/employer/project/${data.id}/remove_files`, data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const editProject = (data) => {
  return axiosInstance.post(`/employer/project/${data.id}/update`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const deleteProject = (id, token) => {
  return axiosInstance.delete(`employer/project/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getNotifications = (data) => {
  return axiosInstance.get('employer/notifications', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      page: data?.page,
    },
  });
};
export const getProposals = (data) => {
  return axiosInstance.get(`/employer/project/${data.id}/proposals`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    params: {
      page: data.page,
      type: data.type,
    },
  });
};
export const getProposalDetails = (data) => {
  return axiosInstance.get(
    `/employer/project/${data.projectId}/proposals/${data.id}/show`,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const getMileStoneList = (data) => {
  return axiosInstance.get(`/data/milestone_list`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const logout = (data) => {
  return axiosInstance.get(`logout`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const createContract = (data) => {
  return axiosInstance.post(
    `employer/project/${data.id}/contract/create`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Accept-Language': 'en',
      },
    },
  );
};

export const socialLogin = (data) =>
  axiosInstance.post(`social_login/${data.name}`, data.data);

export const socialSignup = (data) =>
  axiosInstance.post(`social_signup/${data.name}`, data.data);

export const oneSignalPlayerIdRegister = (data) =>
  axiosInstance.post(`employer/update_player_id`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const showContacts = (data) =>
  axiosInstance.get(`employer/contacts`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const addContacts = (data) =>
  axiosInstance.post(`employer/contact/create`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const removeContacts = (data) =>
  axiosInstance.delete(`employer/contact/${data.id}/remove`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const readNotification = (data) =>
  axiosInstance.post(
    `employer/notifications/mark_as_read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
export const polls = () => axiosInstance.get('data/poll/question_list');
export const pollsSubmit = (data) => {
  console.log('polls data', JSON.stringify(data, null, 2));
  return axiosInstance.post('employer/polls/question/create', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const getContractsList = (data) => {
  return axiosInstance.get('employer/contracts', {
    params: {
      page: data.page,
      type: data.type,
      project_id: data.projectId,
    },
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const disputeFile = (data) =>
  axiosInstance.post(`employer/disputes/create`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const createFreelancerProfile = (data) =>
  axiosInstance.post('employer/create_profile', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const getDisputeList = (data) =>
  axiosInstance.get('employer/disputes', {
    params: {
      page: data.page,
    },
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const fetchPaymentCards = (data) =>
  axiosInstance.get('employer/payments/get_saved_methods', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const saveCard = (data) =>
  axiosInstance.post('employer/payments/add_payment_method', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const deleteSavedCard = (data) =>
  axiosInstance.delete(`employer/payments/remove_payment_method/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const sendOtp = (data) =>
  axiosInstance.post(`auth/send_otp`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const updateAuthDetails = (data) =>
  axiosInstance.post(`auth/update/${data.type}`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const fetchUserSettings = (token) => {
  return axiosInstance.get('employer/settings', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserSettings = (data) =>
  axiosInstance.post('employer/settings/update', data.setting, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const TwoStepLogin = (data) =>
  axiosInstance.post('employer/two_step_verification', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const fetchCountriesList = ({search}) =>
  axiosInstance.get('data/country_list', {
    params: {
      search,
    },
  });
export const fetchCityList = ({search, countryId}) =>
  axiosInstance.get('data/city_list', {
    params: {
      country_id: countryId,
      search,
    },
  });

export const shortUnshortProposal = (data) =>
  axiosInstance.post(
    `employer/proposals/${data.id}/shortlist/${data.type}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

export const createInvitation = (data) => {
  return axiosInstance.post('employer/invitation/create', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const fetchSkills = (search, subCategoryIds) =>
  axiosInstance.get('data/skills', {
    params: {search: search, sub_category_ids: subCategoryIds},
  });

export const fetchPredefinedSkills = (token) =>
  axiosInstance.get(`data/skills?type=top`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updateUserPassword = (data) => {
  return axiosInstance.post(`password/change`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const fetchStatistics = (token, projectId) =>
  axiosInstance.get('employer/statics', {
    params: {
      project_id: projectId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchContractDetails = (token, contractId) =>
  axiosInstance.get(`employer/contracts/${contractId}/show`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const browseFreelancerByProject = (token, projectId, page) =>
  axiosInstance.get(`employer/browse/freelancersForProject`, {
    params: {
      project_id: projectId,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const invitationList = (data) => {
  return axiosInstance.get(`employer/invitation`, {
    params: {
      type: data.type,
      page: data.page,
      project_id: data.projectId,
    },
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const paymentWithSavedCard = (data) => {
  return axiosInstance.post('employer/payment_with_saved_card', data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const createOrderToPayment = (data) => {
  return axiosInstance.post(
    `employer/contract/${data?.id}/create_order_to_payment`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const approveMilestone = (data) => {
  return axiosInstance.post(
    `employer/contracts/${data?.id}/approve_milestone_work`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
export const getFreelancerReviews = (data) => {
  return axiosInstance.get(`employer/browse/freelancer/${data.id}/reviews`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const rateFreelancer = (data) => {
  return axiosInstance.post(`employer/ratings/rate_freelancer`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
export const sendChatMessageNotification = (data) =>
  axiosInstance.post(`employer/send_notification`, data?.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
export const updateFirebaseId = (data) => {
  return axiosInstance.post(`employer/update_firebase_user_id`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token ?? ''}`,
    },
  });
};
