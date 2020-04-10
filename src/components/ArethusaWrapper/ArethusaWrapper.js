import { defaultConfig, sidepanelConfig } from './ArethusaConfig';

import './custom.css';

const elementId = 'treebank_container';
const remoteUrl = `${process.env.PUBLIC_URL}/arethusa/`;

const removeToastContainer = ($) => {
  $('#toast-container').remove();
};

const getConfig = (config) => {
  if (config === 'sidepanel') {
    return sidepanelConfig;
  }

  return defaultConfig;
};

class ArethusaWrapper {
  constructor() {
    this.render = this.render.bind(this);
  }

  render(doc, chunk, { config, w }) {
    // eslint-disable-next-line no-undef
    const { Arethusa, $ } = window;

    if (this.widget) {
      if (this.doc === doc && (this.chunk !== chunk || this.word !== w)) {
        this.gotoSentence(chunk,w);
        removeToastContainer($);
      }
    } else {
      this.widget = new Arethusa();

      this.widget
        .on(elementId)
        .from(remoteUrl)
        .with(getConfig(config))
        .start({ doc, chunk, w });
    }

    this.doc = doc;
    this.chunk = chunk;
    this.word = w
  }

  gotoSentence(chunk,words) {
    return this.widget.api().gotoSentence(chunk,words);
  }

  getSubdoc() {
    return this.widget.api().getSubdoc();
  }

  getMorph(sentenceId, wordId) {
    return this.widget.api().getMorph(sentenceId, wordId);
  }

  refreshView() {
    return this.widget.api().refreshView();
  }

  findWord(sentenceId,word,prefix,suffix) {
    console.info(`Find ${word} ${prefix} ${suffix}`);
    return this.widget.api().findWord(sentenceId,word,prefix,suffix);
  }
}

export default ArethusaWrapper;
