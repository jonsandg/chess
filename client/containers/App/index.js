import React from 'react';
import { Link, IndexLink } from 'react-router';

import { Grid, Row, Col } from 'react-bootstrap';

import Header from 'components/Header';
import Sidemenu from 'containers/Sidemenu';
import Chatmenu from 'containers/Chatmenu';

import { root } from 'baobab-react/higher-order';
import tree from 'state';

class App extends React.Component {
  render() {
    console.log(this.props.tree.get());
    
    return (
      <div>
        <Header />
        <Grid>
          <Row className="layout-row">
            <Col xs={2} className="no-float sidemenu">
              <Sidemenu />
            </Col>
            <Col xs={7} className="no-float">
              {this.props.children}
            </Col>
            <Col xs={3} className="no-float chatmenu">
              <Chatmenu />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

export default root(tree, App);

