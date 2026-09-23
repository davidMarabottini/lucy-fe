import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Paginated.module.scss';
import { useDebounce } from '@/hooks/useDebounce';
import { usePaginationStore } from '@/zustand/usePaginationStore';
import type { PaginatedData, PaginatedProps } from './Paginated.types';
import { useTranslation } from 'react-i18next';

function isPaginatedData<T>(data: T[] | PaginatedData<T>): data is PaginatedData<T> {
  return data != null && !Array.isArray(data);
}

function Paginated<T extends object>({
  area,
  useQueryHook,
  initialPerPage = 10,
  filterConfig = [],
  children,
  additionalButtons,
}: PaginatedProps<T>) {
  const baseFilter = filterConfig.reduce(
    (acc, f) => (f.value ? ({ ...acc, [f.key]: f.value || '' }) : acc),
    {} as Record<string, string>
  );
  const {t} = useTranslation('common');

  const { lists, setPage, setFilter, resetList } = usePaginationStore();
  const page = lists[area]?.page ?? 1;
  const filters = lists[area]?.filters ?? baseFilter;

  const nonHiddenFilters = filterConfig.filter((f) => f.type !== 'hidden');
  const debouncedFilters = useDebounce(filters, 1200);

  const { data, isLoading, isPlaceholderData } = useQueryHook({
    page,
    per_page: initialPerPage,
    ...debouncedFilters,
  });

  const paginated = data && isPaginatedData(data);
  const items = paginated ? data.items : (data || []);
  const totalPages = paginated ? data.pages : 1;

  const handleFilterChange = (key: string, value: string) => {
    setFilter(area, key, value);
  };

  if (isLoading) return <div>{t('loading')}</div>;

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
          <Button
            onClick={() => resetList(area)}
            disabled={page === 1 && Object.keys(filters).length === 0}
          >
            {t('reset')}
          </Button>
        </div>
      )}

      <div style={{ opacity: isPlaceholderData ? 0.6 : 1, transition: 'opacity 0.2s' }}>
        {children(items)}
      </div>

      <div className={styles['c-paginated__footer-container']}>
        {paginated  && (
          <div className={styles['c-paginated__footer']}>
            <div className={styles['c-paginated__pagination']}>
              <Button
                onClick={() => setPage(area, Math.max(page - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={20} />
              </Button>

              <span className={styles['c-paginated__page-info']}>
                Pagina <strong>{page}</strong> di <strong>{totalPages}</strong>
              </span>

              <Button
                onClick={() => setPage(area, page + 1)}
                disabled={page >= totalPages || isPlaceholderData}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        )}
        {additionalButtons && additionalButtons.length > 0 && (
          <div className={styles['c-paginated__additional-buttons']}>
            {additionalButtons(page, filters).map((button, index) => (
              <div key={index}>{button}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Paginated;
