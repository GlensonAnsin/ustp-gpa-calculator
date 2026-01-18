export const getRemark = (grade: number) => {
  if (grade === 1.0) return 'Excellent';
  if (grade >= 1.25 && grade <= 1.5) return 'Very Good';
  if (grade >= 1.75 && grade <= 2.0) return 'Above Average';
  if (grade >= 2.25 && grade <= 2.5) return 'Average';
  if (grade >= 2.75 && grade <= 3.0) return 'Passing';
  if (grade >= 3.25 && grade <= 3.5) return 'Conditional';
  if (grade >= 3.75) return 'Failed';
  return 'Failed';
};