import { useState } from 'react';
import Table from '../Table/Table';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TablePaginated.module.scss';
import { useDebounce } from '@/hooks/useDebounce';
import type { PaginatedData, TablePaginatedProps } from './TablePaginated.types';

function isPaginatedData<T>(data: T[] | PaginatedData<T>): data is PaginatedData<T> {
  return data != null && !Array.isArray(data);
}

function TablePaginated<T extends object>({
  useQueryHook,
  columns,
  actions,
  initialPerPage = 10,
  filterConfig = [],
}: TablePaginatedProps<T>) {
  const [page, setPage] = useState(1);

  const baseFilter = filterConfig.reduce(
    (acc, f) => f.value ? ({ ...acc, [f.key]: f.value || '' }): acc, {} as Record<string, string>
  );
  
  const [filters, setFilters] = useState<Record<string, string>>(baseFilter);
  
  const nonHiddenFilters = filterConfig.filter(f => f.type !== 'hidden');
  const debouncedFilters = useDebounce(filters, 500);

  const { data, isLoading, isPlaceholderData } = useQueryHook({
    page,
    per_page: initialPerPage,
    ...debouncedFilters,
  });

  const paginated = data && isPaginatedData(data);
  const items = paginated ? data.items : (data || []);
  const totalPages = paginated ? data.pages : 1;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  if (isLoading) return <div>Caricamento...</div>;

  return (
    <div className={styles['c-table-paginated']}>
      {nonHiddenFilters.length > 0 && (
        <div className={styles['c-table-paginated__filters-grid']}>
          {nonHiddenFilters.map((filter) => (
            <Input
              key={filter.key}
              label={filter.label}
              placeholder={filter.placeholder}
              value={filters[filter.key] || ''}
              onValueChange={(val) => handleFilterChange(filter.key, val)}
            />
          ))}
        </div>
      )}

      <div style={{ opacity: isPlaceholderData ? 0.6 : 1, transition: 'opacity 0.2s' }}>
        <Table data={items} columns={columns} actions={actions} />
      </div>

      {paginated && totalPages > 1 && (
        <div className={styles['c-table-paginated__footer']}>
          <div className={styles['c-table-paginated__pagination']}>
            <Button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={20} />
            </Button>
            
            <span className={styles['c-table-paginated__page-info']}>
              Pagina <strong>{page}</strong> di <strong>{totalPages}</strong>
            </span>

            <Button
              onClick={() => setPage((old) => old + 1)}
              disabled={page >= totalPages || isPlaceholderData}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablePaginated;
