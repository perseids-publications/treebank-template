import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alignment as AL,
  Comments,
  Segment,
  Sentence,
} from 'alignment-react';
import fetch from 'cross-fetch';

import { publicationMatchType } from '../../lib/types';

import styles from './EmbeddedAlignment.module.css';

class EmbeddedAlignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedXml: false,
    };
  }

  componentDidMount() {
    const { xml } = this.props;

    fetch(`${process.env.PUBLIC_URL}/xml/${xml}`)
      .then((response) => response.text())
      .then((loadedXml) => {
        this.setState({ loadedXml });
      });
  }

  render() {
    const { match, l1, l2 } = this.props;
    const { loadedXml } = this.state;

    const { params: { publication, chunk } } = match;

    if (!loadedXml) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div className={styles.alignmentContainer}>
        <AL alignment={loadedXml}>
          <Sentence n={chunk}>
            <div className={styles.text}>
              <div className={styles.segment}>
                <Segment lnum={l1} />
              </div>
              <div className={styles.segment}>
                <Segment lnum={l2} />
              </div>
            </div>
            <Comments />
          </Sentence>
        </AL>
        <div className={styles.links}>
          <p>
            <a href={`${process.env.PUBLIC_URL}/${publication}/${chunk}`} target="_blank" rel="noopener noreferrer">
              Credits and more information
            </a>
          </p>
        </div>
      </div>
    );
  }
}

EmbeddedAlignment.propTypes = {
  match: publicationMatchType.isRequired,
  xml: PropTypes.string.isRequired,
  l1: PropTypes.string.isRequired,
  l2: PropTypes.string.isRequired,
};

export default EmbeddedAlignment;
