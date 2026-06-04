export function Pagination({ page, totalPages, baseUrl }: { page: number; totalPages: number; baseUrl: string }) {
  return (
    <div className="flex justify-between items-center mt-6">
      {page > 1 ? <a href={`${baseUrl}?page=${page-1}`} className="px-4 py-2 bg-gray-200 rounded">← Previous</a> : <span className="px-4 py-2 bg-gray-100 rounded text-gray-400">Previous</span>}
      <span>Page {page} of {totalPages}</span>
      {page < totalPages ? <a href={`${baseUrl}?page=${page+1}`} className="px-4 py-2 bg-gray-200 rounded">Next →</a> : <span className="px-4 py-2 bg-gray-100 rounded text-gray-400">Next</span>}
    </div>
  );
}