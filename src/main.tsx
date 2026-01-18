import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import App from './App.tsx';
import SelectSem from './pages/select-sem.tsx';
import CalculateGpa from './pages/calculate-gpa.tsx';
import WebLayout from './components/layout/WebLayout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'select-sem',
        element: <SelectSem />,
      },
      {
        path: 'calculate-gpa',
        element: <CalculateGpa />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
