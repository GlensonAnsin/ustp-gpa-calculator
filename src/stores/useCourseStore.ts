import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  college: string | null,
  course: string | null,
}

type Action = {
  setCollege: (college: State['college']) => void,
  setCourse: (course: State['course']) => void,
  removeCollege: () => void;
  removeCourse: () => void;
}

export const useCourseStore = create<State & Action>()(
  persist(
    (set) => ({
      college: null,
      course: null,
      setCollege: (college) => set(() => ({ college: college })),
      setCourse: (course) => set(() => ({ course: course })),
      removeCollege: () => set(() => ({ college: null })),
      removeCourse: () => set(() => ({ course: null })),
    }),
    {
      name: 'course-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)