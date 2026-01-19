export const remarksColor = (remarks: string) => {
  if (remarks === 'Excellent') return 'bg-emerald-600 text-white';
  if (remarks === 'Very Good') return 'bg-green-500 text-white';
  if (remarks === 'Above Average') return 'bg-teal-500 text-white';
  if (remarks === 'Average') return 'bg-blue-500 text-white';
  if (remarks === 'Passing') return 'bg-yellow-400 text-white';
  if (remarks === 'Conditional') return 'bg-orange-500 text-white';
  if (remarks === 'Failed') return 'bg-red-600 text-white';
}