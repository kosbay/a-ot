import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ itemsPerPage, count, onPageChange }: {
  itemsPerPage: number;
  count: number;
  onPageChange: (page: number) => void;
}) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(itemsPerPage);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(count / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    console.log('selected', event.selected)
    const newOffset = (event.selected * itemsPerPage) % count;
    onPageChange(event.selected + 1);
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="my-4 flex justify-between items-center"
        activeClassName="text-primary p-2 border border-primary rounded"
      />
    </>
  );
}

export default Pagination;