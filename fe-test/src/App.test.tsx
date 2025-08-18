import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render', () => {
        const { getByText } = render(<App />);

        expect(getByText('From')).toBeInTheDocument();
        expect(getByText('To')).toBeInTheDocument();
        expect(getByText('From Amount')).toBeInTheDocument();
        expect(getByText('To Amount')).toBeInTheDocument();
        expect(getByText('To Amount (OFX)')).toBeInTheDocument();
    });
});
