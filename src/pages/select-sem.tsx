import { CEACourses } from '../data/CEACourses';
import { CITCCourses } from '../data/CITCCourses';
import { CSMCourses } from '../data/CSMCourses';
import { CSTECourses } from '../data/CSTECourses';
import { COTCourses } from '../data/COTCourses';
import { useCourseStore } from '../stores/useCourseStore';
import { useSemStore } from '../stores/useSemStore';
import { useMemo } from 'react';
import { formatSemLabel } from '../utils/formatSemLabel';
import { formatCollege } from '../utils/formatCollege';
import { NavLink } from 'react-router';
import { NavBack } from '../components/ui/back-button';
import { CollegeLogo } from '../components/ui/colleges-logo';

const COLLEGE_DATA_MAP = {
  CEA: CEACourses,
  CITC: CITCCourses,
  CSM: CSMCourses,
  CSTE: CSTECourses,
  COT: COTCourses,
};

const SelectSem = () => {
  const college = useCourseStore((state) => state.college);
  const course = useCourseStore((state) => state.course);
  const selectedSem = useSemStore((state) => state.setSem);

  const selectedProgramData = useMemo(() => {
    const collegeData = college ? COLLEGE_DATA_MAP[college as keyof typeof COLLEGE_DATA_MAP] || COTCourses : COTCourses;
    return collegeData.programs.find((p) => p.program === course);
  }, [college, course]);

  if (!selectedProgramData) return <div className="text-center p-10">No data found for this course.</div>;

  return (
    <section className="min-h-screen pb-10">
      <NavBack />
      <div className="px-4 md:px-[10%] pt-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="mb-4">
            <CollegeLogo college={college ?? ''} width={200} height={200} />
          </div>

          <h2 className="text-center text-xl md:text-3xl font-bold text-[#16163f] mb-2 px-2">
            {formatCollege(college ?? '')}
          </h2>
          <h3 className="text-center text-lg md:text-2xl font-bold text-[#333] px-2">{course}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
          {Object.entries(selectedProgramData.curriculum).map(([item, index]) => (
            <NavLink
              key={index}
              className="bg-[#16163f] text-white p-4 rounded-md flex items-center justify-center text-center cursor-pointer hover:scale-[1.02] hover:text-[#FCB316] transition-all duration-300 shadow-md"
              onClick={() => selectedSem(item)}
              to="/calculate-gpa"
            >
              <p className="text-sm md:text-base">{formatSemLabel(item)}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectSem;
