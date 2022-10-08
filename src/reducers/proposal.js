const proposalReducer = (state, action) => {
  if (!state) {
    return {
      proposals: [],
      has_more_proposals_page: false,
      proposal_page_loading: false,
      shortlistedProposals: [],
      has_more_shortlisted_proposals_page: false,
      shortlist_proposal_page_loading: false,
    };
  }

  switch (action.type) {
    case 'PROPOSALS':
      return {
        ...state,
        proposals: action.proposals,
        has_more_proposals_page: action.has_more_page,
        proposal_page_loading: false,
      };
    case 'SHORTLISTED_PROPOSALS':
      return {
        ...state,
        shortlistedProposals: action.proposals,
        has_more_shortlisted_proposals_page: action.has_more_page,
        shortlist_proposal_page_loading: false,
      };
    case 'FETCH_MORE_PROPOSALS':
      return {
        ...state,
        proposal_page_loading: action.data?.type === 'all' ? true : false,
        shortlist_proposal_page_loading:
          action.data?.type === 'shortlisted' ? true : false,
      };
    default:
      return state;
  }
};

export default proposalReducer;
