// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

// importing necessary action for retriving th data and resetting the whole state
import { getData } from "../../actions/dataAction";

// importing necessary sub-components
import Loader from "../Loader";
import Graph from "../Graph";
import Card from "../Card";

// importing the style from the external css file
import "./home.css";

// importing necessary images to be displayed
import IconLogOut from '../../images/logout.png';
import IconPositive from '../../images/uparrow.png';
import IconNegative from '../../images/downarrow.png';


const stateMap = store => ({
  dataReducer: store.dataReducer
});

// declaring the type of props and states used in this component
type Props = {
  dataReducer: {
    quiz_data: Array<Object>,
    get_data_in_progress: boolean,
  }
};
type State = {
  selectedValue: number,
};

class Home extends Component<Props, State> {
  constructor(props) {
    super(props);
    //  initialising necessary states
    this.state = {
      selectedValue: 9,
    };
    //  binding all the necessary functions to perform state operations
    (this: any).getValue = this.getValue.bind(this);
  }

  componentDidMount() {
    // calling getdata Action to retrive necessary data
    this.props.dispatch(getData({}));
  }

  // changing the values (beside current balance) of income and expense on click of the graph nodes
  getValue(value) {
    this.setState(prevState=>({
      selectedValue: value,
    }));
  }

  render() {
    return (
      <div className="container">
        {this.props.dataReducer.get_data_in_progress ? (
          <Loader />
        ) : (
          <div className="display-section">
            <div className="expenses-and-meta-section">
              <div className="expenses-section">
                <div className="expenses-title">
                  Expenses
                </div>
                <div className="logout-container">
                  <img alt="logout" src={IconLogOut} className="logout-icon" />
                </div>
              </div>
              <div className="meta-data-section">
                <div>
                  <div className="card-balance-placeholder">
                    Card Balance
                  </div>
                  <div className="card-balance-data">
                    ${this.props.dataReducer.card_balance}
                  </div>
                </div>
                <div>
                  <div className="card-balance-positive">
                    <img alt="inc" src={IconPositive} className="card-balance-positive-icon" />
                    ${this.props.dataReducer.graph_data_1[this.state.selectedValue]}
                  </div>
                  <div className="card-balance-negative">
                  <img alt="dec" src={IconNegative} className="card-balance-negative-icon" />
                    ${this.props.dataReducer.graph_data_2[this.state.selectedValue]}
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-section">
              <div className="graph-meta-data">
                <select id="Monthly" className="graph-option">
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <div className="month-list">
                  {
                    this.props.dataReducer.month.map((item, index)=>
                        <div key={item + index} className={index === 0 ? "individual-month selected" : "individual-month"}>
                          {item}
                        </div>)
                  }
                </div>
              </div>
              <Graph
                getValue={this.getValue}
                graph_data_1={this.props.dataReducer.graph_data_1}
                graph_data_2={this.props.dataReducer.graph_data_2}
                graph_color_1={this.props.dataReducer.graph_color_1}
                graph_color_2={this.props.dataReducer.graph_color_2}
              />
            </div>
            <div className="breakdown-section">
              <div className="breakdown-title">Spending Breakdown</div>
              {
                this.props.dataReducer.spending.map((item, index)=>
                  <Card
                    key={index}
                    item={item}
                  />
                  )
            }
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(stateMap)(Home);
