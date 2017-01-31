// ==========================================================================
// Application JavaScript for IMTD?
// ==========================================================================

//
// Imports
// --------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';

//
// Classes
// --------------------------------------------------------------------------
class TrainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.loading = false;
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.toggleDelayInfo = this.toggleDelayInfo.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  componentWillMount() {

  }

  componentDidMount() {

  }

  formatDate(date) {
    let d = '';

    if (date.getHours() > 12) {
      d += date.getHours() - 12 + ':';
    }
    else {
      d += date.getHours().toString() + ':';
    }

    if (date.getMinutes() < 10) {
      d += '0' + date.getMinutes().toString() + ':';
    }
    else {
      d += date.getMinutes().toString() + ':';
    }

    if (date.getSeconds() < 10) {
      d += '0' + date.getSeconds().toString();
    }
    else {
      d += date.getSeconds().toString();
    }

    d += (date.getHours() > 12 ? ' PM' : ' AM');

    return d;
  }

  toggleDelayInfo(event) {
    event.preventDefault();

    if (event.target.parentElement.parentElement.nextSibling.classList.contains('delay-info--show')) {
      event.target.parentElement.parentElement.nextSibling.classList.remove('delay-info--show')
    }
    else {
      event.target.parentElement.parentElement.nextSibling.classList.add('delay-info--show');
    }
  }

  handleRefresh() {
    // Spin the loader
    // document.querySelector('.train-info__actions button svg').classList.add('spin');

    var oReq = new XMLHttpRequest();

    oReq.addEventListener("load", this.handleResponse);
    oReq.addEventListener("error", this.handleResponse);
    oReq.addEventListener("timeout", this.handleResponse);

    oReq.open("GET", "/fetch");
    oReq.send();
  }

  handleResponse(res) {
    var data = JSON.parse(res.target.response);
    if (res.target.status === 200) {
      this.renderData(data);
    }
  }

  renderData(data) {
    ReactDOM.render(<TrainInfo data={data} />, document.getElementById('train-info'));
  }

  render() {
    let trains = this.props.data.trains;
    let retrieveTime = this.formatDate(new Date());

    const trainLines = trains.map((train) =>
      <tbody key={train.name.toString()}>
        <tr>
          <td><span className={'status-circle ' + (train.status === "Delayed" ? "delayed" : "on-time")}></span></td>
          <td>{train.name}</td>
          {train.status === "Delayed" &&
            <td>
              <button type='button' className='delay-info-expand' title='Click to expand and get more information about this delay' onClick={this.toggleDelayInfo}>{train.status} <span className='accessible'>- {train.name}</span></button>
              <span className={"delayed-msg " + (train.status === "On time" ? "delayed-msg--hidden" : undefined)}></span>
            </td>
          }
          {train.status !== "Delayed" &&
              <td>
                {train.status}
                <span className={"delayed-msg " + (train.status === "On time" ? "delayed-msg--hidden" : undefined)}></span>
              </td>
          }
        </tr>
        {train.status === "Delayed" &&
          <TrainDelayRow delays={train.details} />
        }
      </tbody>
    );
    return (
      <main id='train-info' aria-label='Train information'>
        <div className='train-info'>
          <table>
            <caption className='accessible'>Train status information</caption>
            <TrainInfoHeader />
            {trainLines}
          </table>
          <div className='train-info__last-retrieved'>
            <p>
              Last refreshed: {retrieveTime}
            </p>
          </div>
          <div className='train-info__actions'>
            <button type='button' onClick={this.handleRefresh}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve" className="icon icon--refresh">
                <g display="none">
                  <polygon display="inline" points="85.982,15.043 14.018,15.043 41.006,42.031 41.006,84.957 58.996,72.963 58.996,42.031"/>
                </g>
                <g display="none">
                  <path display="inline" d="M76.592,85.935l-11.32-17.052l7.006-6.496V15.922c0-1.024-0.832-1.856-1.859-1.856H29.314   c-1.027,0-1.861,0.832-1.861,1.856v46.465l7.17,6.644L23.408,85.935h6.404l8.775-13.227l0.07,0.064h22.414l0.238-0.221   l8.875,13.383H76.592z M62.004,64.233c-2.355,0-4.266-1.907-4.266-4.27c0-2.356,1.91-4.266,4.266-4.266   c2.357,0,4.27,1.909,4.27,4.266C66.273,62.326,64.361,64.233,62.004,64.233z M43.463,17.634h12.805v4.406H43.463V17.634z    M33.859,26.169h32.012V45.38H33.859V26.169z M38.525,64.233c-2.357,0-4.268-1.907-4.268-4.27c0-2.356,1.91-4.266,4.268-4.266   c2.359,0,4.271,1.909,4.271,4.266C42.797,62.326,40.885,64.233,38.525,64.233z"/>
                </g>
                <g>
                  <path className="refresh-icon-top" d="M77.845,26.948c-6.625-7.896-16.55-12.932-27.689-12.932c-19.975,0-36.138,16.107-36.138,35.984h14.395   c0-11.961,9.765-21.691,21.786-21.691c7.191,0,13.567,3.501,17.538,8.867l-8.464,8.088l26.71-0.012V18.667L77.845,26.948z"/>
                  <path className="refresh-icon-bottom" d="M49.799,71.687c-7.193,0-13.565-3.5-17.539-8.867l8.464-8.086l-26.706,0.012V81.33l8.134-8.281   c6.625,7.896,16.551,12.935,27.69,12.935c19.978,0,36.141-16.11,36.141-35.986H71.584C71.584,61.956,61.819,71.687,49.799,71.687z"/>
                </g>
                <g display="none">
                  <polygon display="inline" points="32.01,14.02 67.99,50.002 32.01,85.98"/>
                </g>
              </svg>
              Refresh
            </button>
          </div>
        </div>
        <SiteInfo />
      </main>
    )
  }
}

class TrainInfoHeader extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <td colSpan='2'>Train Line</td>
          <td>Status</td>
        </tr>
      </thead>
    )
  }
}

class TrainDelayRow extends React.Component {
  render() {
    let delays = this.props.delays;
    let trainLineDelays = delays.map((delay) =>
      <div className='delay' key={delay.toString() + Math.random()}>
        {delay.delayMsg !== undefined &&
          <span className='delayinfo__msg'>
            <a href={delay.delayMsg} title='Opens the GO Transit website to get more information about this delay'>More information</a>
          </span>
        }
        {delay.delayMsg === undefined &&
          <span>
            <span className='delay-info__direction'>{delay.delayDirection}</span>
            <span className='delay-info__train'>{delay.delayedTrain}</span>
            <span className='delay-info__length'>{delay.delayLength}</span>
            <span className='delay-info__status'>Train is {delay.delayStatus.toLowerCase()}</span>
          </span>
        }
      </div>
    );
    return (
      <tr className='delay-info'>
        <td colSpan='3'>
          {trainLineDelays}
        </td>
      </tr>
    );
  }
}

class SiteInfo extends React.Component {
  render() {
    return (
      <div className='site-info' role='contentinfo' aria-label='Information about Is My Train Delayed?'>
        <h2>How does this work?</h2>
        <p>
          This application uses the official GO Transit website to get its data. Whatever the GO
          Transit website shows for train delays is what this site will show.
        </p>

        <h2>So why use this over GO Transit?</h2>
        <p>
          Fair question. The short answer is: impact to your data plan; the longer one is: after the initial
          load of this page, it will cost your data plan ~1.3KB to refresh and get the most up-to-date data.
          Even the first time you load this page costs less data than the GO Transit website.
        </p>

        <h2>Coming Soon</h2>
        <ul>
          <li>
            <strong>Improved Accessibility: </strong>
            Better code to support screen readers, as well as interactions and design that better
            accommodate everyone who may use this application.
          </li>
          <li>
            <strong>Metadata Tagging: </strong>
            Information that will show when searching for train delays using Google. Similar to the
            visuals and info you see in Google search results without clicking on a result.
          </li>
          <li className='goal-complete'>
            <strong>Manual Refresh: </strong>
            Click or touch the Refresh button to get the latest train delays--no more page refreshing.
          </li>
        </ul>

        <h2>Want to Help?</h2>
        <p>
          Please open an issue or pull request on the official <a href='https://github.com/danieldafoe/is-my-train-delayed'>GitHub repo</a>.
        </p>
      </div>
    );
  }
}

//
// Main
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', init);

function init() {
  var trainInfo = document.querySelector('.train-info');
  var refreshBtn = document.querySelector('.train-info__actions button');

  trainInfo.addEventListener('click', function(e) {
    if (e.target.classList.contains('delay-info-expand')) {
      handleDelayInfoClick.call(this, e);
    }
    else {
      return true;
    }
  });
  refreshBtn.addEventListener('click', function(e) {
    handleDataFetch(e);
  });

  function handleDelayInfoClick(event) {
    event.preventDefault();

    // Set button's state to expanded
    var toggleState = event.target.attributes['aria-expanded'].value === 'true' ? 'false' : 'true';
    event.target.setAttribute('aria-expanded', toggleState);

    if (event.target.parentElement.parentElement.nextSibling.classList.contains('delay-info--show')) {
      event.target.parentElement.parentElement.nextSibling.classList.remove('delay-info--show')
    }
    else {
      event.target.parentElement.parentElement.nextSibling.classList.add('delay-info--show');
    }

    this.removeEventListener('click', handleDelayInfoClick);
  };

  function handleDataFetch(event) {
    event.preventDefault();
    handleRefresh();
  };

  function handleRefresh() {
    var oReq = new XMLHttpRequest();

    oReq.addEventListener("load", handleResponse);
    oReq.addEventListener("error", handleResponse);
    oReq.addEventListener("timeout", handleResponse);

    oReq.open("GET", "/fetch");
    oReq.send();
  };

  function handleResponse(res) {
    var data = JSON.parse(res.target.response);
    if (res.target.status === 200) {
      renderData(data);
    }
  };

  function renderData(data) {
    ReactDOM.render(<TrainInfo data={data} />, document.getElementById('train-info'));
  };
}
