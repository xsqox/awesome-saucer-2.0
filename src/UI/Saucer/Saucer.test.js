import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Saucer from './Saucer';

describe('<Saucer> component', () => {
    let onClick;

    beforeEach(() => {
        onClick = jest.fn();
    });
    it('should render saucer', () => {
        render(<Saucer testId="saucer-1" id={1} onClick={onClick} />);
        expect(screen.getByTestId('saucer-1')).toBeInTheDocument();
    });

    it('should render saucer head', () => {
        render(<Saucer testId="saucer" id={1} onClick={onClick} />);
        const head = screen.getByTestId('saucer-head');
        expect(head).toBeInTheDocument();
        expect(head.classList).toContain('head');
    });

    it('should render saucer body', () => {
        render(<Saucer testId="saucer" id={1} onClick={onClick} />);
        const body = screen.getByTestId('saucer-body');
        expect(body).toBeInTheDocument();
        expect(body.classList).toContain('body');
    });

    it('should render 5 saucer windows', () => {
        render(<Saucer testId="saucer" id={1} onClick={onClick} />);
        expect(screen.getAllByTestId('saucer-window').length).toEqual(5);
    });

    it('should pass its id back when clicked', () => {
        render(<Saucer testId="saucer" onClick={onClick} id={3} />);
        const saucer = screen.getByTestId('saucer');
        fireEvent.click(saucer);
        expect(onClick).toHaveBeenCalledWith(3);
    });
});
