import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('When loading then title is Circuit Trainer Timer', () => {
	const { getByText } = render(<App />);
	const titleElement = getByText('Circuit Trainer Timer');
	expect(titleElement).toBeInTheDocument();
});
