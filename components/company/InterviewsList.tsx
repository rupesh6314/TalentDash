export function InterviewsList({ interviews }: { interviews: any[] }) {
  if (!interviews.length) return <p>No interview experiences yet.</p>;
  return (
    <div className="space-y-4">
      {interviews.map(i => (
        <div key={i.id} className="border p-4 rounded">
          <div className="font-bold">{i.role}</div>
          <div>Difficulty: {i.difficulty} · Outcome: {i.outcome}</div>
          <p className="mt-2">{i.experience}</p>
        </div>
      ))}
    </div>
  );
}