import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { publicationMatchType, locationType } from '../../lib/types';

import ArethusaWrapper from '../ArethusaWrapper';
import EmbeddedTreebank from '../EmbeddedTreebank';

class EmbeddedPublication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subDoc: '',
    };

    this.arethusa = new ArethusaWrapper();
    this.arethusaSubDocFun = this.arethusaSubDocFun.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.arethusaSubDocFun = this.arethusaSubDocFun;
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    window.arethusaSubDocFun = undefined;
  }

  arethusaSubDocFun(subDoc) {
    this.setState({ subDoc });
  }

  render() {
    const {
      xml,
      match,
      location,
    } = this.props;

    return (
      <div>
        <EmbeddedTreebank
          xml={xml}
          location={location}
          match={match}
          arethusa={this.arethusa}
        />
      </div>
    );
  }
}

EmbeddedPublication.propTypes = {
  xml: PropTypes.string.isRequired,
  match: publicationMatchType.isRequired,
  location: locationType.isRequired,
};

export default EmbeddedPublication;
