const contractsReducer = (state, action) => {
  if (!state) {
    return {
      myContracts: [],
      has_more_contracts_page: false,
      pendingContracts: [],
      hasMorePendingContracts: false,
      activeContracts: [],
      hasMoreActiveContracts: false,
      rejectedContracts: [],
      hasMoreRejectedContracts: false,
      expiredContracts: [],
      hasMoreExpiredContracts: false,
      offerRefreshing: false,
      hiredRefreshing: false,
      rejectedRefreshing: false,
      expiredRefreshing: false,
      // contractDetails: undefined,
    };
  }

  switch (action.type) {
    case 'MY_CONTRACTS':
      return {
        ...state,
        myContracts: action.contracts,
        has_more_contracts_page: action.has_more_contracts,
      };
    case 'PENDING_CONTRACTS':
      return {
        ...state,
        pendingContracts: action.contract,
        hasMorePendingContracts: action.hasMorePendingContracts,
        offerRefreshing: false,
      };
    case 'ACTIVE_CONTRACTS':
      return {
        ...state,
        activeContracts: action.contract,
        hasMoreActiveContracts: action.hasMoreActiveContracts,
        hiredRefreshing: false,
      };
    case 'REJECTED_CONTRACTS':
      return {
        ...state,
        rejectedContracts: action.contract,
        hasMoreRejectedContracts: action.hasMoreRejectedContracts,
        rejectedRefreshing: false,
      };
    case 'EXPIRED_CONTRACTS':
      return {
        ...state,
        expiredContracts: action.contract,
        hasMoreExpiredContracts: action.hasMoreExpiredContracts,
        expiredRefreshing: false,
      };

    case ' OFFER_REFRESHING':
      return {
        ...state,
        offerRefreshing: action.data,
      };
    case 'HIRED_REFRESHING':
      return {
        ...state,
        hiredRefreshing: action.data,
      };
    case 'REJECTED_REFRESHING':
      return {
        ...state,
        rejectedRefreshing: action.data,
      };
    case 'EXPIRED_REFRESHING':
      return {
        ...state,
        expiredRefreshing: action.data,
      };
    // case 'CONTRACT_DETAILS':
    //   return {
    //     ...state,
    //     contractDetails: action.contract,
    //   };

    default:
      return state;
  }
};

export default contractsReducer;
