import TextField from "components/form/TextField";
import { PaginationMeta } from "types/meta";
import { useMemo, useRef, useState } from "react";

type ListMetaProps = {
  pagination: PaginationMeta;
  onSearchTermChange: (newTerm: string) => void;
  debounce?: number;
}

const ListMeta = ({ pagination, onSearchTermChange, debounce=500 }: ListMetaProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>();
  
  const handleValueChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => onSearchTermChange(newTerm), debounce);
  }

  const numberShowing = useMemo(() => {
    if (pagination.numberOfPages === pagination.page && pagination.total % pagination.perPage !== 0) {
      return pagination.total % pagination.perPage;
    } else {
      return pagination.perPage;
    }
  }, [pagination]);

  const startingNumber = useMemo(() => {
    return ((pagination.perPage * pagination.page) + 1) - (pagination.perPage);
  }, [pagination]);

  return (
    <div className="flex justify-between items-center px-2 pb-4">
      <div className="text-white">
        { pagination.total !== 0 && 
          <p>Showing {startingNumber} - {startingNumber + (numberShowing - 1)} of {pagination.total} results</p>
        }
      </div>
      <div className="">
        <TextField
          value={searchTerm}
          onChange={handleValueChange}
          name="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default ListMeta;
