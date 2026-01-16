import { CEACourses } from '../data/CEACourses';
import { CITCCourses } from '../data/CITCCourses';
import { CSMCourses } from '../data/CSMCourses';
import { CSTECourses } from '../data/CSTECourses';
import { COTCourses } from '../data/COTCourses';
import { useCourseStore } from '../stores/useCourseStore';
import { useSemStore } from '../stores/useSemStore';
import { useEffect, useState } from 'react';

const SelectSem = () => {
  const college = useCourseStore((state) => state.college);
  const course = useCourseStore((state) => state.course);
  const selectedSem = useSemStore((state) => state.setSem);

  const [nonAbbCollege, setNonAbbCollege] = useState<string>('');
  const [selectedCollegeObj, setSelectedCollegeObj] = useState<object>({});

  useEffect(() => {
    (async () => {
      console.log(college);
      if (college === 'CEA') {
        setNonAbbCollege(CEACourses.college);
        setSelectedCollegeObj(CEACourses);
      } else if (college === 'CITC') {
        setNonAbbCollege(CITCCourses.college);
        setSelectedCollegeObj(CITCCourses);
      } else if (college === 'CSM') {
        setNonAbbCollege(CSMCourses.college);
        setSelectedCollegeObj(CSMCourses);
      } else if (college === 'CSTE') {
        setNonAbbCollege(CSTECourses.college);
        setSelectedCollegeObj(CSTECourses);
      } else {
        setNonAbbCollege(COTCourses.college);
        setSelectedCollegeObj(COTCourses);
      }
    })();
  }, [college]);

  return (
    <section>
      <div>
        <h2 className="text-center text-3xl font-bold text-[#16163f] p-10">{nonAbbCollege}</h2>
        <h3 className="text-center text-xl font-bold text-[#333] p-10">{course}</h3>
      </div>
    </section>
  );
};

export default SelectSem;
