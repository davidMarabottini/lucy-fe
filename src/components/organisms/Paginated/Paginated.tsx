import { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Paginated.module.scss';
import { useDebounce } from '@/hooks/useDebounce';
import type { PaginatedData, PaginatedProps } from './Paginated.types';

function isPaginatedData<T>(data: T[] | PaginatedData<T>): data is PaginatedData<T> {
  return data != null && !Array.isArray(data);
}

function Paginated<T extends object>({
  useQueryHook,
  initialPerPage = 10,
  filterConfig = [],
  children,
}: PaginatedProps<T>) {
  const [page, setPage] = useState(1);

  const baseFilter = filterConfig.reduce(
    (acc, f) => (f.value ? ({ ...acc, [f.key]: f.value || '' }) : acc),
    {} as Record<string, string>
  );

  const [filters, setFilters] = useState<Record<string, string>>(baseFilter);

  const nonHiddenFilters = filterConfig.filter((f) => f.type !== 'hidden');
  const debouncedFilters = useDebounce(filters, 1200);

  useEffect(() => {
    setPage(1);
  }, [debouncedFilters]);

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
  };

  if (isLoading) return <div>Caricamento...</div>;

  return (
    <div className={styles['c-paginated']}>
      {nonHiddenFilters.length > 0 && (
        <div className={styles['c-paginated__filters-grid']}>
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
        {children(items)}
      </div>

      {paginated  && (
        <div className={styles['c-paginated__footer']}>
          <div className={styles['c-paginated__pagination']}>
            <Button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={20} />
            </Button>

            <span className={styles['c-paginated__page-info']}>
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

export default Paginated;
