// Legacy code to replicate
// https://github.com/alpheios-project/arethusa/blob/0a82a2ad9cc7468ea781bfa023a1dddbd77130c6/app/js/arethusa.core/services/api.js#L59

const getLang = (treebank) => {
  try {
    return treebank.$['xml:lang'];
  } catch {
    return '';
  }
};

const getForm = (word) => {
  try {
    return word.$.form;
  } catch {
    return '';
  }
};

const getLemma = (word) => {
  try {
    return word.$.lemma;
  } catch {
    return '';
  }
};

const getMood = (deconstructed) => {
  for (let ii = 0; ii < deconstructed.length; ii += 1) {
    if (deconstructed[ii][0].key === 'mood') {
      return deconstructed[ii][1].long;
    }
  }

  return '';
};

// From https://github.com/alpheios-project/arethusa/blob/0a82a2ad9cc7468ea781bfa023a1dddbd77130c6/app/js/arethusa.core/factories/api_outputter.js#L15
const attributeToAlpheios = (key, long, mood) => {
  let newKey = key;
  let newLong = long;

  if (newKey === 'pos') {
    newKey = 'pofs';

    if (newLong === 'verb' && mood === 'participle') {
      newLong = 'verb participle';
    }

    if (newLong === 'adposition') {
      newLong = 'preposition';
    }
  }

  if (newKey === 'degree') {
    newKey = 'comp';
  }

  if (newKey === 'tense' && newLong === 'plusquamperfect') {
    newLong = 'pluperfect';
  }

  if (newKey === 'voice' && newLong === 'medio-passive') {
    newLong = 'mediopassive';
  }

  return [
    newKey,
    { $: newLong },
  ];
};

const convertPostag = ({
  deconstructed, treebank, word,
}) => {
  const lang = getLang(treebank);
  const form = getForm(word);
  const lemma = getLemma(word);
  const mood = getMood(deconstructed);

  const infl = {
    term: { form: { $: form } },
  };

  deconstructed.forEach(([{ key }, { long }]) => {
    const [k, v] = attributeToAlpheios(key, long, mood);

    infl[k] = v;
  });

  return {
    RDF: {
      Annotation: {
        about: '',
        creator: {
          Agent: { about: '' },
        },
        created: { $: '' },
        rights: { $: '' },
        hasTarget: {
          Description: { about: '' },
        },
        hasBody: { resource: '' },
        Body: {
          about: '',
          type: { resource: 'cnt:ContentAsXML' },
          rest: {
            entry: {
              dict: {
                hdwd: {
                  lang,
                  $: lemma,
                },
              },
              infl,
            },
          },
        },
      },
    },
  };
};

const alpheiosAnnotation = ({
  treebank, configuration, sentenceId, wordId,
}) => {
  try {
    const sentenceIdString = String(sentenceId);
    const sentence = treebank.treebank.sentence.find(
      ({ $: { id } }) => id === sentenceIdString,
    );

    const wordIdString = String(wordId);
    const word = sentence.word.find(({ $: { id } }) => id === wordIdString);
    const deconstructed = configuration.deconstructPostag(word.$.postag);

    return convertPostag({ deconstructed, treebank: treebank.treebank, word });
  } catch {
    return {};
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  alpheiosAnnotation,
};
