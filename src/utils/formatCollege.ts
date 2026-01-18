export const formatCollege = (college: string) => {
  if (college === 'CEA') {
    return 'College of Engineering and Architecture';
  } else if (college === 'CITC') {
    return 'College of Information Technology and Computing';
  } else if (college === 'CSM') {
    return 'College of Science and Mathematics';
  } else if (college === 'CSTE') {
    return 'College of Science and Technology Education';
  } else {
    return 'College of Technology';
  }
};