import React, { FC, ForwardedRef, forwardRef } from 'react';
import s from './Saucer.module.css';

interface ISaucerProps {
    testId?: string;
    id?: number;
    onClick?: Function;
    scale?: number;
    bodyColor?: string;
}

const Saucer: FC<ISaucerProps> = forwardRef(
    (
        { testId, id, onClick, scale, bodyColor }: ISaucerProps,
        ref: ForwardedRef<unknown>
    ): JSX.Element => {
        const renderWindows = (num: number): JSX.Element[] => {
            const mapper = Array.from(Array(num).keys());
            return mapper.map((m) => (
                <span className={s.window} data-testid={`${testId}-window`} key={m} />
            ));
        };

        return (
            <button
                /* @ts-ignore */
                ref={ref}
                data-testid={testId}
                onClick={() => onClick(id)}
                className={s.wrapper}
                style={scale ? { transform: `scale(${scale})` } : {}}
            >
                <span data-testid={`${testId}-head`} className={s.head} />
                <span
                    data-testid={`${testId}-body`}
                    className={s.body}
                    style={bodyColor ? { background: `${bodyColor}` } : {}}
                />
                <div className={s.windows}>{renderWindows(5)}</div>
            </button>
        );
    }
);

export default Saucer;
