const initialState = {
  get_data_in_progress: false,
  get_data_success: false,
  card_balance: 0,
  month: [],
  spending: [],
  graph_data_1: [],
  graph_color_1: '',
  graph_data_2: [],
  graph_color_2: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DATA_IN_PROGRESS": {
      return {
        ...state,
        get_data_in_progress: true,
        get_data_success: false
      };
    }

    case "GET_DATA_IN_SUCCESS": {
      const { data } = action.payload;
      let card_balance = 0;
      let month = [];
      let spending = [];
      let graph_data_1 = [];
      let graph_color_1 = '';
      let graph_data_2 = [];
      let graph_color_2 = '';
      card_balance = data.cardBalance;
      month = data.month;
      spending = data.spending;
      graph_data_1 = data.data.datasets[0].data;
      graph_color_1 = data.data.datasets[0].borderColor;
      graph_data_2 = data.data.datasets[1].data;
      graph_color_2 = data.data.datasets[1].borderColor;
      return {
        ...state,
        card_balance,
        month,
        spending,
        graph_data_1,
        graph_color_1,
        graph_data_2,
        graph_color_2,
        get_data_in_progress: false,
        get_data_success: true
      };
    }

    case "GET_DATA_IN_FAILURE": {
      return {
        ...state,
        get_data_in_progress: false,
        get_data_success: false
      };
    }

    default:
  }
  return state;
}
