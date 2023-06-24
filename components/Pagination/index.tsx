import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, ReactNode, useMemo } from "react";

type PaginationButtonProps = {
  disabled: boolean;
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}

const PageSpacer = () => {
  return (
    <span className="px-3 py-1 text-white">&hellip;</span>
  )
}

const PaginationButton = ({ disabled, children, onClick, active }: PaginationButtonProps): ReactElement => {
  return (
    <button
      className={`px-3 py-2 text-white ${active ? 'border-b-2 border-white' : 'hover:bg-white hover:bg-opacity-5'} cursor-pointer`}
      disabled={disabled}
      onClick={onClick}
    >
      { children }
    </button>
  )
}

type PaginationProps = {
  totalCount: number;
  perPage: number;
  currentPage: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
}

const PADDING_AROUND_CURRENT = 5;

const Pagination = ({
  totalCount,
  perPage,
  currentPage,
  onPageChange,
  numberOfPages,
}: PaginationProps): ReactElement => {
  const pagesToDisplay = useMemo<(number | 'spacer')[]>(() => {
    if (totalCount < perPage) {
      return [1];
    } else if (numberOfPages <= PADDING_AROUND_CURRENT * 2) {
      return Array.from({ length: numberOfPages }).map((_, index) => index + 1);
    } else if (currentPage <= PADDING_AROUND_CURRENT) {
      return [
        ...Array.from({ length: PADDING_AROUND_CURRENT * 2 }).map((_, index) => index + 1),
        'spacer',
        numberOfPages,
      ];
    } else if (currentPage > (numberOfPages - PADDING_AROUND_CURRENT)) {
      return [
        1,
        'spacer',
        ...Array.from({ length: (PADDING_AROUND_CURRENT * 2) }).map((_, index) => numberOfPages - ((PADDING_AROUND_CURRENT * 2) - (index + 1)))
      ];
    } else {
      return [
        1,
        'spacer',
        ...Array.from({ length: PADDING_AROUND_CURRENT - 2 }).map((_, index) => currentPage - ((PADDING_AROUND_CURRENT) - (index + 2))),
        currentPage,
        ...Array.from({ length: PADDING_AROUND_CURRENT - 2 }).map((_, index) => (index + 1) + currentPage),
        'spacer',
        numberOfPages,
      ];
    }
  }, [currentPage, numberOfPages, perPage, totalCount]);

  return (
    <div className="mx-auto border-t-2 border-primary-300">
      <div className="flex justify-between">
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: 8 }} />
          Prev
        </PaginationButton>
        
        <div>
          {pagesToDisplay.map((page) => (
            page === 'spacer' ?
            <PageSpacer key={`pagination_${page}`} />
            :
            <PaginationButton
              key={`pagination_${page}`}
              disabled={page === currentPage}
              onClick={() => onPageChange(page)}
              active={page === currentPage}
            >
              { page }
            </PaginationButton>
          ))}
        </div>

        <PaginationButton
          disabled={currentPage === numberOfPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: 8 }} />
        </PaginationButton>
      </div>
    </div>
  );
}

export default Pagination;