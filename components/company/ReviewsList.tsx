export function ReviewsList({ reviews }: { reviews: any[] }) {
  if (!reviews.length) return <p>No reviews yet.</p>;
  return (
    <div className="space-y-4">
      {reviews.map(r => (
        <div key={r.id} className="border p-4 rounded">
          <div className="flex gap-2 items-center"><span className="font-bold">Rating: {r.rating}/5</span></div>
          <p><strong>Pros:</strong> {r.pros}</p>
          <p><strong>Cons:</strong> {r.cons}</p>
          {r.advice && <p><strong>Advice:</strong> {r.advice}</p>}
        </div>
      ))}
    </div>
  );
}