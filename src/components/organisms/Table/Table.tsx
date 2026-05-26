import type {TableProps} from './Table.types';
import styles from './Table.module.scss';
import type { CSSProperties } from 'react';
import { Fragment } from 'react/jsx-runtime';

function Table<T extends object>({ data, columns, actions, getRowKey, additionalContainer }: TableProps<T>) {
  return (
    <div className={styles['c-table']}>
      <div
        className={styles['c-table__inner']}
        style={{ '--c-table-cols': columns.length + (actions ? 1 : 0) } as CSSProperties}
      >
        <div className={styles['c-table__header']}>
          <div  className={styles['c-table__row']}>
            {columns.map((col) => (
              <div key={String(col.key)} className={styles['c-table__cell']}>
                {col.header}
              </div>
            ))}

            {actions && (
              <div className={styles['c-table__cell']}>
                Azioni
              </div>
            )}
          </div>
        </div>

        <div className={styles['c-table__body']}>
          {data.map((row, i) => {
            const curKey = getRowKey?.(row) ?? i
            return (
              <Fragment key={curKey}>
                <div className={styles['c-table__row']} >
                  {columns.map((col) => {
                    const content = col.value ? (typeof col.value === 'function' ? col.value(row) : col.value) : String(row[col.key as keyof T] ?? "");

                    return (
                      <div
                        key={String(col.key)}
                        className={styles['c-table__cell']}
                        data-label={col.header}  
                      >
                        {content}
                      </div>
                    );
                  })}
                  {actions && (
                    <div className={styles['c-table__cell']}>
                      {actions.map((el) => <Fragment key={String(el)}>{el(row)}</Fragment>)}
                    </div>
                  )}
                </div>
              {additionalContent && (
                <div className={styles['c-table__sub-row']}>
                  <div className={styles['c-table__sub-cell']}>
                    {additionalContent}
                  </div>
                </div>
              )}
            </Fragment>
            );
          }) }
        </div>
      </div>
    </div>
  );
}

export default Table;
