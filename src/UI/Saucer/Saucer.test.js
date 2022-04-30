import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Saucer from './Saucer';

describe('<Saucer> component', () => {
    it('should render saucer', () => {
        render(<Saucer testId="saucer-1" />);
        expect(screen.getByTestId('saucer-1')).toBeInTheDocument();
    });

    it('should render saucer head', () => {
        render(<Saucer testId="saucer" />);
        expect(screen.getByTestId('saucer-head')).toBeInTheDocument();
    });

    it('should render saucer body', () => {
        render(<Saucer testId="saucer" />);
        expect(screen.getByTestId('saucer-body')).toBeInTheDocument();
    });

    it('should render 5 saucer windows', () => {
        render(<Saucer testId="saucer" />);
        expect(screen.getAllByTestId('saucer-window').length).toEqual(5);
    });

    it('should pass its id back when clicked', () => {
        const onClick = jest.fn();
        render(<Saucer testId="saucer" onClick={onClick} id={3} />);
        const saucer = screen.getByTestId('saucer');
        fireEvent.click(saucer);
        expect(onClick).toHaveBeenCalledWith(3);
    });
});
