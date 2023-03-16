import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alignment as AL,
  Collapse,
  Comments,
  Segment,
  Sentence,
  Xml,
} from 'alignment-react';
import fetch from 'cross-fetch';

import { chunksType, publicationMatchType } from '../../lib/types';

import styles from './Alignment.module.css';

import ControlPanel from '../ControlPanel';

class Alignment extends Component {
  constructor(props) {
    super(props);

    this.state = { loadedXml: false };
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
    const {
      chunks, match, l1, l2,
    } = this.props;
    const { params: { chunk } } = match;

    const { loadedXml } = this.state;

    if (!loadedXml) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <>
        <ControlPanel
          match={match}
          chunks={chunks}
        />
        <div className="mb-4">
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
              <Collapse title="XML">
                <Xml />
              </Collapse>
            </Sentence>
          </AL>
        </div>
      </>
    );
  }
}

Alignment.propTypes = {
  chunks: chunksType.isRequired,
  match: publicationMatchType.isRequired,
  xml: PropTypes.string.isRequired,
  l1: PropTypes.string.isRequired,
  l2: PropTypes.string.isRequired,
};

export default Alignment;
