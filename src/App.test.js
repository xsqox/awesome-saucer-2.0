import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App>', () => {
    it('should render 3 saucers', () => {
        render(<App />);
        expect(screen.getByTestId('saucer-1')).toBeInTheDocument();
        expect(screen.getByTestId('saucer-2')).toBeInTheDocument();
        expect(screen.getByTestId('saucer-3')).toBeInTheDocument();
    });
});
