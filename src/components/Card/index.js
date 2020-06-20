// @flow

import React, { Component } from 'react';

// importing the style from the external css file
import './card.css';

// importing necessary images to be displayed
import IconRent from '../../images/rent.svg';
import IconBills from '../../images/bills.svg';
import IconShopping from '../../images/shopping.svg';

// declaring the type of props and states used in this component
type Props = {
};

class Card extends Component<Props> {
  render() {
    // extracting the necessary values from the object
    // and modifying the data in a presentable format
    const { item } = this.props;
    let ts = new Date(parseInt(item.date));
    let displayDate = ts.toDateString();
    const name = Object.keys(item)[0];
    let icon = IconRent;
    let iconBackground = '#ff7e87';
    if(name === 'Shopping') {
      icon = IconShopping;
      iconBackground = '#00d793';
    }
    if(name === 'Bills') {
      icon = IconBills;
      iconBackground = '#bed700';
    }
    return (
      <div className="card">
        <div className="card-data-section">
          <img alt="icon" className="card-data-image" src={icon} style={{background: iconBackground}} />
          <div>
            <div className="card-name">{name}</div>
            <div className="card-date">{displayDate}</div>
          </div>
        </div>
        <div className="card-amount">
          - $ {Object.values(item)[0]}
        </div>
      </div>
    );
  }
}

export default Card;
