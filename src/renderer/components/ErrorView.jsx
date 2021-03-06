// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016 Yuya Ochiai

// ErrorCode: https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h

import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';

import {SECOND} from 'common/utils/constants';

//import {ipcRenderer} from 'electron';
// import {OPEN_EXTERNAL} from 'common/communication';

export default function ErrorView(props) {
  const classNames = ['container', 'ErrorView'];
  if (!props.active) {
    classNames.push('ErrorView-hidden');
  }

  // function handleClick(event) {
  //   event.preventDefault();
  //   console.log('TODO: send to main');
  //   ipcRenderer.send(OPEN_EXTERNAL, props.url);
  // }

  let retry = null;
  if (props.retry) {
    const seconds = (Date.now() - props.retry) / SECOND;
    retry = <div className='retry-info'><p>{`Trying to load again in ${seconds}`}</p></div>;
  }
  return (
    <Grid
      id={props.id}
      bsClass={classNames.join(' ')}
    >
      <div className='ErrorView-table'>
        <div className='ErrorView-cell'>
          <Row>
            <Col
              xs={0}
              sm={1}
              md={1}
              lg={2}
            />
            <Col
              xs={12}
              sm={10}
              md={10}
              lg={8}
            >
              <h2>{`Cannot connect to ${props.appName}`}</h2>
              <hr/>
              <p>{`We're having trouble connecting to ${props.appName}. If refreshing this page (Ctrl+R or Command+R) does not work please verify that:`}</p>
              <br/>
              <ul className='ErrorView-bullets' >
                <li>{'Your computer is connected to the internet.'}</li>
                <li>{`The ${props.appName} URL `}
                  <a

                    //onClick={handleClick}
                    href={props.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {props.url}
                  </a>{' is correct.'}</li>
                <li>{'You can reach '}
                  <a

                    // onClick={handleClick}
                    href={props.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {props.errorInfo.validatedURL}
                  </a>{' from a browser window.'}</li>
              </ul>
              <br/>
              <div className='ErrorView-techInfo'>
                {props.errorInfo}
              </div>
              {retry}
            </Col>
            <Col
              xs={0}
              sm={1}
              md={1}
              lg={2}
            />
          </Row>
        </div>
      </div>
    </Grid>
  );
}

ErrorView.propTypes = {
  errorInfo: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool,
  retry: PropTypes.number,
  appName: PropTypes.string,
};
