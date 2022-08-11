import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '../App';

test('...', async () => {
    render(<App />)
    expect(screen.getAllByText('Upload hier je CSV'));
    expect(screen.findByLabelText('Upload bestand')).not.toBeFalsy();
});
