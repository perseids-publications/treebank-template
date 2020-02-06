import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { publicationMatchType, locationType } from '../../lib/types';

import ArethusaWrapper from '../ArethusaWrapper';
import TreebankService from '../TreebankService';
import EmbeddedTreebank from '../EmbeddedTreebank';

class EmbeddedPublication extends Component {
  constructor(props) {
    super(props);

    this.arethusa = new ArethusaWrapper();
    this.treebankService = new TreebankService(this.arethusa);
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
          treebankService={this.treebankService}
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
