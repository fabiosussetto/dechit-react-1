import React from 'react';
import TransactionCard from '../TransactionCard';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const transaction = {
      id: 1,
      amount: 100,
      category: 'books',
      description: 'test'
  }

  const tree = renderer
    .create(<TransactionCard transaction={transaction} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});