import { CEACourses } from './data/CEACourses';
import { CITCCourses } from './data/CITCCourses';
import { CSMCourses } from './data/CSMCourses';
import { CSTECourses } from './data/CSTECourses';
import { COTCourses } from './data/COTCourses';
import { useCourseStore } from './stores/useCourseStore';
import { NavLink } from 'react-router';
import { CollegeLogo } from './components/ui/colleges-logo';

const App = () => {
  const selectedCollege = useCourseStore((state) => state.setCollege);
  const selectedCourse = useCourseStore((state) => state.setCourse);

  return (
    <div>
      <div>
        <h2 className="text-center text-3xl font-bold text-[#16163f] p-10">Choose your course</h2>
      </div>

      <section id="cea" className="mb-10 bg-[#FCB316]/80 py-[2%]">
        <CollegeLogo college="CEA" width={200} height={200} />
        <h3 className="text-center text-2xl mb-5 text-[#333] font-bold">{CEACourses.college}</h3>
        <div className="grid grid-cols-2 gap-4 px-[10%]">
          {CEACourses.programs.map((item, index) => (
            <NavLink
              key={index}
              className="bg-[#16163f] text-white p-3 rounded-md flex items-center justify-center cursor-pointer hover:scale-101 hover:text-[#FCB316] transition ease-in-out"
              onClick={() => {
                selectedCollege('CEA');
                selectedCourse(item.program);
              }}
              to="/select-sem"
            >
              <p>{item.program}</p>
            </NavLink>
          ))}
        </div>
      </section>

      <section id="citc" className="mb-10">
        <CollegeLogo college="CITC" width={200} height={200} />
        <h3 className="text-center text-2xl mb-5 text-[#333] font-bold">{CITCCourses.college}</h3>
        <div className="grid grid-cols-2 gap-4 px-[10%]">
          {CITCCourses.programs.map((item, index) => (
            <NavLink
              key={index}
              className="bg-[#16163f] text-white p-3 rounded-md flex items-center justify-center cursor-pointer hover:scale-101 hover:text-[#FCB316] hover:text-[#FCB316] transition ease-in-out"
              onClick={() => {
                selectedCollege('CITC');
                selectedCourse(item.program);
              }}
              to="/select-sem"
            >
              <p>{item.program}</p>
            </NavLink>
          ))}
        </div>
      </section>

      <section id="csm" className="mb-10 bg-[#FCB316]/80 py-[2%]">
        <CollegeLogo college="CSM" width={200} height={200} />
        <h3 className="text-center text-2xl mb-5 text-[#333] font-bold">{CSMCourses.college}</h3>
        <div className="grid grid-cols-2 gap-4 px-[10%]">
          {CSMCourses.programs.map((item, index) => (
            <NavLink
              key={index}
              className="bg-[#16163f] text-white p-3 rounded-md flex items-center justify-center cursor-pointer hover:scale-101 hover:text-[#FCB316] transition ease-in-out"
              onClick={() => {
                selectedCollege('CSM');
                selectedCourse(item.program);
              }}
              to="/select-sem"
            >
              <p>{item.program}</p>
            </NavLink>
          ))}
        </div>
      </section>

      <section id="cste" className="mb-10">
        <CollegeLogo college="CSTE" width={200} height={200} />
        <h3 className="text-center text-2xl mb-5 text-[#333] font-bold">{CSTECourses.college}</h3>
        <div className="grid grid-cols-2 gap-4 px-[10%]">
          {CSTECourses.programs.map((item, index) => (
            <NavLink
              key={index}
              className="bg-[#16163f] text-white p-3 rounded-md flex items-center justify-center cursor-pointer hover:scale-101 hover:text-[#FCB316] transition ease-in-out"
              onClick={() => {
                selectedCollege('CSTE');
                selectedCourse(item.program);
              }}
              to="/select-sem"
            >
              <p>{item.program}</p>
            </NavLink>
          ))}
        </div>
      </section>

      <section id="cot" className="bg-[#FCB316]/80 py-[2%]">
        <CollegeLogo college="COT" width={200} height={200} />
        <h3 className="text-center text-2xl mb-5 text-[#333] font-bold">{COTCourses.college}</h3>
        <div className="grid grid-cols-2 gap-4 px-[10%]">
          {COTCourses.programs.map((item, index) => (
            <NavLink
              key={index}
              className="bg-[#16163f] text-white p-3 rounded-md flex items-center justify-center cursor-pointer hover:scale-101 hover:text-[#FCB316] transition ease-in-out"
              onClick={() => {
                selectedCollege('COT');
                selectedCourse(item.program);
              }}
              to="/select-sem"
            >
              <p>{item.program}</p>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
