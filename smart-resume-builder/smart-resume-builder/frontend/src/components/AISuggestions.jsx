export default function AISuggestions({ suggestions, loading }) {
  if (!loading && !suggestions) return null;

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <h2 className="font-semibold text-indigo-900 mb-2">AI Suggestions</h2>
      {loading ? (
        <p className="text-sm text-indigo-700">Generating suggestions…</p>
      ) : (
        <p className="text-sm text-indigo-900 whitespace-pre-line">{suggestions}</p>
      )}
    </div>
  );
}
