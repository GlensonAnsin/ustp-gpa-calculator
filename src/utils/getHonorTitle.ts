export const getHonorTitle = (gpa: number) => {
  if (gpa <= 1.25) return 'First Honor';
  if (gpa <= 1.50) return 'Second Honor';
  if (gpa <= 1.75) return 'Third Honor';
};