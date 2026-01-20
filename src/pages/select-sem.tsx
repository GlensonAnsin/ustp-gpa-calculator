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

  if (!selectedProgramData) return <div>No data found for this course.</div>;

  return (
    <section>
      <div>
        <h2 className="text-center text-3xl font-bold text-[#16163f] pt-10 mb-10">{formatCollege(college ?? '')}</h2>
        <h3 className="text-center text-2xl font-bold text-[#333] mb-10">{course}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 px-[10%]">
        {Object.entries(selectedProgramData.curriculum).map(([item, index]) => (
          <NavLink
            key={index}
            className="bg-[#16163f] text-white p-3 rounded-md flex items-center justify-center cursor-pointer hover:scale-101 hover:text-[#FCB316] transition ease-in-out"
            onClick={() => {
              selectedSem(item);
            }}
            to="/calculate-gpa"
          >
            <p>{formatSemLabel(item)}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default SelectSem;
