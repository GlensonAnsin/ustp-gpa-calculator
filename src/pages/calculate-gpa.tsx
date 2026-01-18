import { CEACourses } from '../data/CEACourses';
import { CITCCourses } from '../data/CITCCourses';
import { CSMCourses } from '../data/CSMCourses';
import { CSTECourses } from '../data/CSTECourses';
import { COTCourses } from '../data/COTCourses';
import { useCourseStore } from '../stores/useCourseStore';
import { useSemStore } from '../stores/useSemStore';
import { useMemo, useState } from 'react';
import { formatSemLabel } from '../utils/formatSemLabel';
import { formatCollege } from '../utils/formatCollege';
import { getRemark } from '../utils/getRemark';

const COLLEGE_DATA_MAP = {
  CEA: CEACourses,
  CITC: CITCCourses,
  CSM: CSMCourses,
  CSTE: CSTECourses,
  COT: COTCourses,
};

const GRADE_OPTIONS = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 5.0];

const CalculateGpa = () => {
  const college = useCourseStore((state) => state.college);
  const course = useCourseStore((state) => state.course);
  const sem = useSemStore((state) => state.sem);

  const [selectedGrades, setSelectedGrades] = useState<Record<number, number>>({});
  const [unitsGradeProducts, setUnitsGradeProducts] = useState<Record<number, number>>({});
  const [average, setAverage] = useState<number>(0);

  const selectedProgramData = useMemo(() => {
    const collegeData = college ? COLLEGE_DATA_MAP[college as keyof typeof COLLEGE_DATA_MAP] || COTCourses : COTCourses;
    const courseData = collegeData.programs.find((p) => p.program === course);
    if (course && sem) {
      return courseData?.curriculum[sem as keyof typeof courseData.curriculum];
    }
  }, [college, course, sem]);

  const totalUnits: number = selectedProgramData?.reduce((sum, item) => sum + item.units, 0) ?? 0;

  const handleGradeChange = (index: number, value: string) => {
    const grade = parseFloat(value);
    setSelectedGrades((prev) => ({
      ...prev,
      [index]: grade,
    }));
  };

  const handleMultiplyUnitsGrade = (index: number, units: number, value: string) => {
    const grade = parseFloat(value);
    const product = units * grade;
    setUnitsGradeProducts((prev) => ({
      ...prev,
      [index]: product,
    }));
  };

  const unitsGradeProductsSum = useMemo(() => {
    const unitsGradeProductArray = Object.values(unitsGradeProducts);
    const sum = unitsGradeProductArray.reduce((total, grade) => total + grade, 0);
    return sum;
  }, [unitsGradeProducts]);

  const calculateAverage = (totalUnits: number, unitsGradeProductsSum: number) => {
    setAverage(totalUnits / unitsGradeProductsSum);
  };

  if (!selectedProgramData) return <div>No data found for this course.</div>;

  return (
    <section>
      <div>
        <h2 className="text-center text-3xl font-bold text-[#16163f] pt-10 mb-10">{formatCollege(college ?? '')}</h2>
        <h3 className="text-center text-2xl font-bold text-[#333]">{course}</h3>
        <h4 className="text-center text-xl font-bold text-[#333] mb-10">{formatSemLabel(sem ?? '')}</h4>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white mx-[10%]">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th className="text-[#333] text-base">Subject</th>
              <th className="text-[#333] text-base">Units</th>
              <th className="text-[#333] text-base">Grade</th>
              <th className="text-[#333] text-base">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {selectedProgramData.map((item, index) => (
              <tr key={index}>
                <th className="text-[#333] text-base">{index + 1}</th>
                <td className="text-[#333] text-base">{item.subject}</td>
                <td className="text-[#333] text-base">{item.units}</td>
                <td className="text-[#333] text-base">
                  <select
                    name="grades"
                    id="grades"
                    onChange={(e) => {
                      handleGradeChange(index, e.target.value);
                      handleMultiplyUnitsGrade(index, item.units, e.target.value);
                      calculateAverage(totalUnits, unitsGradeProductsSum);
                    }}
                  >
                    <option selected disabled>
                      0.00
                    </option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-[#333] text-base">
                  {selectedGrades[index] ? getRemark(selectedGrades[index]) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-[#333] text-base">{average}</p>
      </div>
    </section>
  );
};

export default CalculateGpa;
