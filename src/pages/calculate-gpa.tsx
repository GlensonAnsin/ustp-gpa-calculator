/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CEACourses } from '../data/CEACourses';
import { CITCCourses } from '../data/CITCCourses';
import { CSMCourses } from '../data/CSMCourses';
import { CSTECourses } from '../data/CSTECourses';
import { COTCourses } from '../data/COTCourses';
import { useCourseStore } from '../stores/useCourseStore';
import { useSemStore } from '../stores/useSemStore';
import { useEffect, useMemo, useState, useRef } from 'react';
import { formatSemLabel } from '../utils/formatSemLabel';
import { formatCollege } from '../utils/formatCollege';
import { getRemark } from '../utils/getRemark';
import { remarksColor } from '../utils/remarksColor';
import { SparklesText } from '../components/ui/sparkles-text';
import { getHonorTitle } from '../utils/getHonorTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NavBack } from '../components/ui/back-button';
import { ConfettiFireworks } from '../components/ui/confetti-fireworks';
import { CollegeLogo } from '../components/ui/colleges-logo';

const COLLEGE_DATA_MAP = {
  CEA: CEACourses,
  CITC: CITCCourses,
  CSM: CSMCourses,
  CSTE: CSTECourses,
  COT: COTCourses,
};

const GRADE_OPTIONS = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 5.0];

const SEMESTER_KEYS = [
  'firstYearFirstSem',
  'firstYearSecondSem',
  'firstYearMidYear',
  'secondYearFirstSem',
  'secondYearSecondSem',
  'secondYearMidYear',
  'thirdYearFirstSem',
  'thirdYearSecondSem',
  'thirdYearMidYear',
  'fourthYearFirstSem',
  'fourthYearSecondSem',
  'fourthYearMidYear',
  'fifthYearFirstSem',
  'fifthYearSecondSem',
  'fifthYearMidYear',
];

const CalculateGpa = () => {
  const averageRef = useRef<HTMLDivElement>(null);
  const college = useCourseStore((state) => state.college);
  const course = useCourseStore((state) => state.course);
  const sem = useSemStore((state) => state.sem);

  const [selectedGrades, setSelectedGrades] = useState<Record<number, number>>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState(false);

  const selectedProgramData = useMemo(() => {
    const collegeData = college ? COLLEGE_DATA_MAP[college as keyof typeof COLLEGE_DATA_MAP] || COTCourses : COTCourses;
    const courseData = collegeData.programs.find((p) => p.program === course);

    if (!courseData || !sem) return [];

    if (
      (sem === 'fourthYearSecondSem' && course !== 'Architecture') ||
      (sem === 'fifthYearSecondSem' && course === 'Architecture')
    ) {
      return SEMESTER_KEYS.flatMap((key) => {
        const subjects = (courseData.curriculum as any)[key];
        return subjects || [];
      });
    }
    return (courseData.curriculum as any)[sem] || [];
  }, [college, course, sem]);

  const { totalUnits, unitsGradeProductsSum, hasFailingGrade } = useMemo(() => {
    let tUnits = 0;
    let tProducts = 0;
    let fail = false;

    selectedProgramData.forEach((item: any, index: number) => {
      tUnits += item.units;
      const grade = selectedGrades[index];
      if (grade) {
        tProducts += grade * item.units;
        if (grade >= 3.75) fail = true;
      }
    });

    return {
      totalUnits: tUnits,
      unitsGradeProductsSum: tProducts,
      hasFailingGrade: fail,
    };
  }, [selectedProgramData, selectedGrades]);

  const finalGpa = totalUnits > 0 ? unitsGradeProductsSum / totalUnits : 0;

  const handleGradeChange = (index: number, value: string) => {
    setSelectedGrades((prev) => ({
      ...prev,
      [index]: parseFloat(value),
    }));
  };

  const isWithHonor = useMemo(() => {
    if (
      Object.keys(selectedGrades).length === selectedProgramData.length &&
      !hasFailingGrade &&
      sem !== 'secondYearMidYear' &&
      sem !== 'thirdYearMidYear' &&
      parseFloat(finalGpa.toFixed(2)) <= 1.75
    )
      return true;
    return false;
  }, [finalGpa]);

  useEffect(() => {
    const isComplete =
      selectedProgramData.length > 0 && Object.keys(selectedGrades).length === selectedProgramData.length;

    if (isComplete) {
      setTimeout(() => {
        averageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedGrades, selectedProgramData.length]);

  useEffect(() => {
    if (isWithHonor) {
      setShouldRender(true);
      const enterTimer = setTimeout(() => setIsVisible(true), 10);
      const exitTimer = setTimeout(() => setIsVisible(false), 10000);
      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [isWithHonor]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (!isVisible) {
      timeoutId = setTimeout(() => setShouldRender(false), 700);
    }
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  useEffect(() => {
    if (
      Object.keys(selectedGrades).length === selectedProgramData.length &&
      !hasFailingGrade &&
      sem !== 'secondYearMidYear' &&
      sem !== 'thirdYearMidYear' &&
      parseFloat(finalGpa.toFixed(2)) <= 1.75
    )
      ConfettiFireworks();
  }, [finalGpa]);

  if (!selectedProgramData.length) return <div className="text-center p-10">No data found for this course.</div>;

  return (
    <section className="min-h-screen pb-10 relative">
      <NavBack />

      {shouldRender && (
        <div
          role="alert"
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-lg transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
            isVisible ? 'opacity-100 max-h-48 translate-y-0' : 'opacity-0 max-h-0 -translate-y-10'
          }`}
        >
          <div className="bg-[#16163f] text-white p-4 rounded-lg shadow-2xl border-l-4 border-yellow-400 text-center md:text-left">
            {(sem === 'fourthYearSecondSem' && course !== 'Architecture') ||
            (sem === 'fifthYearSecondSem' && course === 'Architecture') ? (
              <span className="text-sm md:text-base">
                Congratulations! You are on track to graduate{' '}
                <span className="font-bold text-[#FCB316]">
                  {parseFloat(finalGpa.toFixed(2)) <= 1.25
                    ? 'Summa Cum Laude'
                    : parseFloat(finalGpa.toFixed(2)) <= 1.5
                      ? 'Magna Cum Laude'
                      : 'Cum Laude'}
                </span>
                ! 🎉
              </span>
            ) : (
              <span className="text-sm md:text-base">
                Congratulations! You achieved{' '}
                <span className="font-bold text-[#FCB316]">
                  {parseFloat(finalGpa.toFixed(2)) <= 1.25
                    ? 'First Honors'
                    : parseFloat(finalGpa.toFixed(2)) <= 1.5
                      ? 'Second Honors'
                      : 'Third Honors'}
                </span>{' '}
                this semester! Keep up the great work! 🎉
              </span>
            )}
          </div>
        </div>
      )}

      <div className="px-4 md:px-[10%] pt-6">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <CollegeLogo college={college ?? ''} width={150} height={150} />
          </div>
          <h2 className="text-center text-xl md:text-3xl font-bold text-[#16163f] mb-2">
            {formatCollege(college ?? '')}
          </h2>
          <h3 className="text-center text-lg md:text-2xl font-bold text-[#333] mb-1">{course}</h3>
          <h4 className="text-center text-base md:text-xl font-medium text-[#555] mb-5">{formatSemLabel(sem ?? '')}</h4>

          {(sem === 'firstYearFirstSem' || sem === 'firstYearSecondSem') && (
            <div className="flex items-start md:items-center justify-center gap-3 bg-white p-3 rounded-xl shadow-md max-w-2xl">
              <FontAwesomeIcon icon={faCircleInfo} className="text-[#555] mt-1 md:mt-0" />
              <p className="text-[#555] text-xs md:text-sm text-left md:text-center">
                NSTP is excluded from this table as it is not included in the GPA calculation, in accordance with the
                USTP Student Handbook.
              </p>
            </div>
          )}

          {((sem === 'fourthYearSecondSem' && course !== 'Architecture') ||
            (sem === 'fifthYearSecondSem' && course === 'Architecture')) && (
            <div className="mb-5 bg-white p-3 rounded-xl shadow-md">
              <p className="text-center text-xs md:text-sm text-gray-500 italic">
                Showing cumulative subjects for graduation calculation.
              </p>
            </div>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-base-content/5 bg-white shadow-xl mb-10">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-2 md:px-4"></th>
                <th className="text-[#333] text-sm md:text-base text-left py-3 px-2 md:px-4">Subject</th>
                <th className="text-[#333] text-sm md:text-base text-center py-3 px-2 md:px-4">Units</th>
                <th className="text-[#333] text-sm md:text-base text-center py-3 px-2 md:px-4">Grade</th>
                <th className="text-[#333] text-sm md:text-base text-center py-3 px-2 md:px-4">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {selectedProgramData.map((item: any, index: number) => (
                <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <th className="text-[#333] text-xs md:text-base py-2 px-2 md:px-4">{index + 1}</th>
                  <td className="text-[#333] text-xs md:text-base font-medium py-2 px-2 md:px-4 min-w-[150px]">
                    {item.subject}
                  </td>
                  <td className="text-[#333] text-xs md:text-base text-center py-2 px-2 md:px-4">{item.units}</td>
                  <td className="text-center py-2 px-2 md:px-4">
                    <select
                      name="grades"
                      className="select select-sm md:select-md text-[#333] text-xs md:text-base w-20 md:w-full max-w-[100px] bg-white"
                      onChange={(e) => handleGradeChange(index, e.target.value)}
                      value={selectedGrades[index] || 0}
                    >
                      <option value={0.0} disabled>
                        0.0
                      </option>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-center py-2 px-2 md:px-4 min-w-[100px]">
                    <div
                      className={`${remarksColor(selectedGrades[index] ? getRemark(selectedGrades[index]) : '-')} 
                        w-full text-center py-1 px-2 rounded-md text-xs md:text-sm font-semibold`}
                    >
                      {selectedGrades[index] ? getRemark(selectedGrades[index]) : '-'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          ref={averageRef}
          className="flex flex-col items-center justify-center bg-white p-6 md:p-8 mb-10 rounded-xl shadow-xl max-w-md mx-auto"
        >
          <p className="text-[#333] text-xl md:text-2xl font-bold text-center mb-2">Grade Point Average</p>
          <div className="bg-gray-100 px-6 py-2 rounded-lg mb-2">
            <p className="text-[#16163f] text-3xl md:text-4xl font-extrabold text-center">{finalGpa.toFixed(2)}</p>
          </div>

          {Object.keys(selectedGrades).length === selectedProgramData.length &&
            !hasFailingGrade &&
            sem !== 'secondYearMidYear' &&
            sem !== 'thirdYearMidYear' &&
            parseFloat(finalGpa.toFixed(2)) <= 1.75 && (
              <div className="mt-2">
                <SparklesText className="text-[#FCB316] text-xl md:text-2xl text-center font-bold">
                  {(sem === 'fourthYearSecondSem' && course !== 'Architecture') ||
                  (sem === 'fifthYearSecondSem' && course === 'Architecture')
                    ? getHonorTitle(parseFloat(finalGpa.toFixed(2)), true)
                    : getHonorTitle(parseFloat(finalGpa.toFixed(2)), false)}
                </SparklesText>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default CalculateGpa;
