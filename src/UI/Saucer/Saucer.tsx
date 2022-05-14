import React, { FC, ForwardedRef, forwardRef } from 'react';
import s from './Saucer.module.css';

interface ISaucerProps {
    testId: string;
    id: number;
    onClick: Function;
}

const Saucer: FC<ISaucerProps> = forwardRef(
    ({ testId, id, onClick }: ISaucerProps, ref: ForwardedRef<unknown>): JSX.Element => {
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
            >
                <span data-testid={`${testId}-head`} className={s.head} />
                <span data-testid={`${testId}-body`} className={s.body} />
                <div className={s.windows}>{renderWindows(5)}</div>
            </button>
        );
    }
);

export default Saucer;
