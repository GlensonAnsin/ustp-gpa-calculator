import { CEACourses } from './data/CEACourses';
import { CITCCourses } from './data/CITCCourses';
import { CSMCourses } from './data/CSMCourses';
import { CSTECourses } from './data/CSTECourses';
import { COTCourses } from './data/COTCourses';
import { useCourseStore } from './stores/useCourseStore';
import { NavLink } from 'react-router';
import { CollegeLogo } from './components/ui/colleges-logo';

const COLLEGES = [
  { id: 'CEA', data: CEACourses, hasBg: true },
  { id: 'CITC', data: CITCCourses, hasBg: false },
  { id: 'CSM', data: CSMCourses, hasBg: true },
  { id: 'CSTE', data: CSTECourses, hasBg: false },
  { id: 'COT', data: COTCourses, hasBg: true },
];

const CollegeSection = ({
  id,
  data,
  hasBg,
  onSelect,
}: {
  id: string;
  data: (typeof COLLEGES)[number]['data'];
  hasBg: boolean;
  onSelect: (code: string, program: string) => void;
}) => {
  return (
    <section id={id} className={`mb-10 py-8 ${hasBg ? 'bg-[#FCB316]/80' : ''}`}>
      <div className="flex flex-col items-center justify-center mb-5">
        <div className="mb-4">
          <CollegeLogo college={id} width={200} height={200} />
        </div>
        <h3 className="text-center text-2xl md:text-3xl text-[#333] font-bold px-4">{data.college}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-[10%]">
        {data.programs.map((item, index) => (
          <NavLink
            key={index}
            className="bg-[#16163f] text-white p-4 rounded-md flex items-center justify-center text-center cursor-pointer hover:scale-105 hover:text-[#FCB316] transition-all duration-300 shadow-md"
            onClick={() => onSelect(data.college.split(' ')[0], item.program)}
            to="/select-sem"
          >
            <p className="text-sm md:text-base">{item.program}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

const App = () => {
  const setCollege = useCourseStore((state) => state.setCollege);
  const setCourse = useCourseStore((state) => state.setCourse);

  const handleSelection = (collegeName: string, programName: string) => {
    setCollege(collegeName);
    setCourse(programName);
  };

  return (
    <div className="min-h-screen pb-20">
      <div>
        <h2 className="text-center text-2xl md:text-4xl font-bold text-[#16163f] py-10 px-4">Choose your course</h2>
      </div>

      {COLLEGES.map((college) => (
        <CollegeSection
          key={college.id}
          id={college.id}
          data={college.data}
          hasBg={college.hasBg}
          onSelect={(_code, program) => handleSelection(college.id.toUpperCase(), program)}
        />
      ))}
    </div>
  );
};

export default App;
