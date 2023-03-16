import React from 'react';
import PropTypes from 'prop-types';

import { publicationMatchType, locationType } from '../../lib/types';

import EmbeddedTreebank from '../EmbeddedTreebank';
import EmbeddedAlignment from '../EmbeddedAlignment';

const EmbeddedPublication = ({
  xml, match, location, type, l1, l2,
}) => (
  <div>
    {type === 'alignment' && (
      <EmbeddedAlignment
        xml={xml}
        match={match}
        l1={l1}
        l2={l2}
      />
    )}
    {type === 'treebank' && (
      <EmbeddedTreebank
        xml={xml}
        location={location}
        match={match}
      />
    )}
  </div>
);

EmbeddedPublication.propTypes = {
  xml: PropTypes.string.isRequired,
  match: publicationMatchType.isRequired,
  location: locationType.isRequired,
  type: PropTypes.string,
  l1: PropTypes.string,
  l2: PropTypes.string,
};

EmbeddedPublication.defaultProps = {
  type: 'treebank',
  l1: 'L1',
  l2: 'L2',
};

export default EmbeddedPublication;
