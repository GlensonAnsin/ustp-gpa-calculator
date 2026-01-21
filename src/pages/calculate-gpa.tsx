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

      const enterTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      const exitTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

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
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 700);
    }
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  useEffect(() => {
    if (
      Object.keys(selectedGrades).length === selectedProgramData.length &&
      !hasFailingGrade &&
      parseFloat(finalGpa.toFixed(2)) <= 1.75
    )
      ConfettiFireworks();
  }, [finalGpa]);

  if (!selectedProgramData.length) return <div>No data found for this course.</div>;

  return (
    <section>
      <NavBack />
      {shouldRender && (
        <div
          role="alert"
          className={`fixed top-25 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${isVisible ? 'opacity-100 max-h-40 translate-y-0' : 'opacity-0 max-h-0 -translate-y-10'}`}
        >
          <div className="bg-[#16163f] text-white p-4 rounded-lg shadow-2xl border-l-4 border-yellow-400">
            {(sem === 'fourthYearSecondSem' && course !== 'Architecture') ||
            (sem === 'fifthYearSecondSem' && course === 'Architecture') ? (
              <span>
                Congratulations! You are on track to graduate{' '}
                {parseFloat(finalGpa.toFixed(2)) <= 1.25
                  ? 'Summa Cum Laude'
                  : parseFloat(finalGpa.toFixed(2)) <= 1.5
                    ? 'Magna Cum Laude'
                    : 'Cum Laude'}
                ! 🎉
              </span>
            ) : (
              <span>
                Congratulations! You achieved{' '}
                {parseFloat(finalGpa.toFixed(2)) <= 1.25
                  ? 'First Honors'
                  : parseFloat(finalGpa.toFixed(2)) <= 1.5
                    ? 'Second Honors'
                    : 'Third Honors'}{' '}
                this semester! Keep up the great work! 🎉
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mx-[10%]">
        <div>
          <CollegeLogo college={college ?? ''} width={200} height={200} />
          <h2 className="text-center text-3xl font-bold text-[#16163f] mb-5">{formatCollege(college ?? '')}</h2>
          <h3 className="text-center text-2xl font-bold text-[#333]">{course}</h3>
          <h4 className="text-center text-xl font-bold text-[#333] mb-5">{formatSemLabel(sem ?? '')}</h4>

          {(sem === 'firstYearFirstSem' || sem === 'firstYearSecondSem') && (
            <div className="place-self-center flex items-center justify-center gap-1 mb-5 bg-white p-2 rounded-xl shadow-xl">
              <FontAwesomeIcon icon={faCircleInfo} color="#555" />
              <p className="text-[#555] text-sm">
                NSTP is excluded from this table as it is not included in the GPA calculation, in accordance with the
                USTP Student Handbook.
              </p>
            </div>
          )}

          {((sem === 'fourthYearSecondSem' && course !== 'Architecture') ||
            (sem === 'fifthYearSecondSem' && course === 'Architecture')) && (
            <div className="place-self-center mb-5 bg-white p-2 rounded-xl shadow-xl">
              <p className="text-center text-sm text-gray-500 italic">
                Showing cumulative subjects for graduation calculation.
              </p>
            </div>
          )}
        </div>

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white shadow-xl">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="text-[#333] text-base text-center">Subject</th>
                <th className="text-[#333] text-base text-center">Units</th>
                <th className="text-[#333] text-base text-center">Grade</th>
                <th className="text-[#333] text-base text-center">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {selectedProgramData.map((item: any, index: number) => (
                <tr key={index}>
                  <th className="text-[#333] text-base">{index + 1}</th>
                  <td className="text-[#333] text-base">{item.subject}</td>
                  <td className="text-[#333] text-base text-center">{item.units}</td>
                  <td className="text-[#333] text-base text-center">
                    <select
                      name="grades"
                      className="select select-bordered select-base text-base w-full max-w-[100px] bg-white"
                      onChange={(e) => handleGradeChange(index, e.target.value)}
                      value={selectedGrades[index] || 0}
                    >
                      <option value={0.0} disabled>
                        0.00
                      </option>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-base">
                    <div
                      className={`${remarksColor(selectedGrades[index] ? getRemark(selectedGrades[index]) : '-')} w-full text-center p-1 rounded-md`}
                    >
                      {selectedGrades[index] ? getRemark(selectedGrades[index]) : ''}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div ref={averageRef} className="place-self-center bg-white p-5 my-10 rounded-md shadow-xl">
          <p className="text-[#333] text-2xl font-bold text-center mb-1">Grade Point Average</p>
          <p className="text-[#333] text-2xl text-center mb-1">{finalGpa.toFixed(2)}</p>
          {Object.keys(selectedGrades).length === selectedProgramData.length &&
          !hasFailingGrade &&
          parseFloat(finalGpa.toFixed(2)) <= 1.75 ? (
            <SparklesText className="text-[#333] text-2xl text-center">
              {(sem === 'fourthYearSecondSem' && course !== 'Architecture') ||
              (sem === 'fifthYearSecondSem' && course === 'Architecture')
                ? getHonorTitle(parseFloat(finalGpa.toFixed(2)), true)
                : getHonorTitle(parseFloat(finalGpa.toFixed(2)), false)}
            </SparklesText>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CalculateGpa;
