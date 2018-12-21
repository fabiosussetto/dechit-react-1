import { getFilteredTransactions } from '../selectors'

test('returns same transaction list if no filter set', () => {
    const transactions = [
        { id: 1, amount: 50 },
        { id: 2, amount: 100 }
    ]

    const testState = {
        transactions: {
            list: transactions
        },
        filters: {
            amount: 0
        },
    }
    expect(getFilteredTransactions(testState)).toBe(transactions);
});


test('returns new transaction list with filtered items', () => {
    const transactions = [
        { id: 1, amount: 50 },
        { id: 2, amount: 100 }
    ]

    const testState = {
        transactions: {
            list: transactions
        },
        filters: {
            amount: 50
        },
    }

    const expected = [
        { id: 1, amount: 50 },
        { id: 2, amount: 100 }
    ]

    const result = getFilteredTransactions(testState)
    
    expect(result).toEqual(expected);
    expect(result).not.toBe(expected);
});