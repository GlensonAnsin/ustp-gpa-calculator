export const getHonorTitle = (gpa: number, isGraduating: boolean) => {
  if (gpa <= 1.25) {
    if (isGraduating) return 'Summa Cum Laude';
    return 'First Honor';
  } else if (gpa <= 1.50) {
    if (isGraduating) return 'Magna Cum Laude';
    return 'Second Honor';
  } else if (gpa <= 1.75) {
    if (isGraduating) return 'Cum Laude';
    return 'Third Honor';
  };
};