import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import config from '../../config.test.json';
import treebanks from '../../treebanks.test.json';

import Embedded from '../../../components/Embedded';
// import TreebankService from '../../../components/TreebankService';

jest.mock('treebank-react');

const server = setupServer(
  rest.get(`${process.env.PUBLIC_URL}/xml/lysias-1-1-50.xml`, (req, res, ctx) => (
    res(ctx.delay(10), ctx.text(treebanks.lysias))
  )),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders an embedded publication', async () => {
  const component = (
    <MemoryRouter initialEntries={['/embed/on-the-murder-of-eratosthenes-1-50/1']}>
      <Embedded config={config} />
    </MemoryRouter>
  );
  const { container, queryByText } = render(component);

  expect(container).toMatchSnapshot();

  await waitForElementToBeRemoved(() => queryByText('Loading...'));

  expect(container).toMatchSnapshot();
});

// it('provides an API to communicate with an embedded publication', () => {
//   const component = (
//     <MemoryRouter initialEntries={['/embed/on-the-murder-of-eratosthenes-1-50/1']}>
//       <Embedded config={config} />
//     </MemoryRouter>
//   );
//   const tree = renderer.create(component);
//   const { instance: { messageHandler } } = tree.root.findByType(TreebankService);
//
//   messageHandler(
//     { ID: 'test', body: { gotoSentence: { sentenceId: '5' } } },
//     () => {},
//   );
//
//   expect(tree).toMatchSnapshot();
// });
//
// it('the API can be used to select words', () => {
//   const component = (
//     <MemoryRouter initialEntries={['/embed/on-the-murder-of-eratosthenes-1-50/1']}>
//       <Embedded config={config} />
//     </MemoryRouter>
//   );
//   const tree = renderer.create(component);
//   const { instance: { messageHandler } } = tree.root.findByType(TreebankService);
//
//   messageHandler(
//     { ID: 'test', body: { gotoSentence: { sentenceId: '5', wordIds: ['12'] } } },
//     () => {},
//   );
//
//   expect(tree).toMatchSnapshot();
// });

it('renders 404 when publication not found', () => {
  const component = (
    <MemoryRouter initialEntries={['/embed/unknown']}>
      <Embedded config={config} />
    </MemoryRouter>
  );
  const { container } = render(component);

  expect(container).toMatchSnapshot();
});
