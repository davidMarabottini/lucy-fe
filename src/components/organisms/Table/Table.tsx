// import Button from '@/components/atoms/Button/Button';
import type {TableProps} from './Table.types';
import styles from './Table.module.scss';

function Table<T extends object>({
  data,
  columns,
  actions,
}: TableProps<T>) {
  return (
    <div className={styles['c-table']}>
      <div className={styles['c-table__inner']}>
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

        <div style={{ display: "table-row-group" }}>
          {data.map((row, i) => (
            <div key={i} className={styles['c-table__row']} >
              
              {columns.map((col) => {
                const content = col.value
                  ? col.value(row)
                  : String(row[col.key] ?? "");

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
                <div
                className={styles['c-table__cell']}>
                  {actions.map((el) => (
                    // (row) => <Button key={name} onClick={() => action(row)} {...opt} />
                    el(row)
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
