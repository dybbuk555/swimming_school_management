import actions from 'src/modules/widget/totalPaymentPerMonth/totalPaymentPerMonthActions';

const initialData = {
  loading: false,
  total: [],
  income: '',
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.LOADING_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.LOADING_SUCCESS) {
    return {
      ...state,
      loading: false,
      total: payload.total,
      income: payload.income,
    };
  }

  if (type === actions.LOADING_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
