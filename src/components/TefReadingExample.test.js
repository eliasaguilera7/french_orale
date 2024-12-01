import React from 'react';
import { render, screen } from '@testing-library/react';
import TefReadingExample from './TefReadingExample';

test('renders TefReadingExample component', () => {
    render(<TefReadingExample />);
    const element = screen.getByText(/some text/i);
    expect(element).toBeInTheDocument();
});