import React from 'react';
import SubForm from '../components/SubForm';
import Logo from '../components/Logo';

function Subscriptions(props) {
  let subList = props.subscriptions;
  // console.log(localStorage.subList);

  subList && subList.length
    ? localStorage.setItem('subList', JSON.stringify(subList))
    : (subList = JSON.parse(localStorage.getItem('subList')));
  return (
    <div className='subscriptions container'>
      <Logo />
      <div className='row justify-content-center'>
        <div className='header-font'>
          {subList ? 'Subscriptions' : 'add a subscription to get started...'}
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-10 col-lg-8 subscription form-holder'>
          {/* <SubList subscriptions={props.subscriptions} removeSub={props.removeSub} /> // component removed and added here since it isn't reusable */}
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <ul id='sub-list'>
                {subList
                  ? subList.map(data => {
                      return (
                        <li className='list-group-item' key={data._id}>
                          <strong>{data.name}</strong>
                          <i
                            onClick={() => props.removeSub(data.name, data._id)}
                            className='fas fa-minus-circle'
                          ></i>
                          <div className='details'>
                            ${data.cost} {data.frequency}
                          </div>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
          <SubForm addSub={props.addSub} />
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
