import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import CrosswordLanding from './pages/CrosswordLanding.jsx'
import GridPage from './pages/GridPage.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import RoundScoreCard from './pages/RoundScoreCard.jsx'

import ScoreDetails from './pages/ScoreDetails';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/landing"
        element={
          <RequireAuth>
            <CrosswordLanding />
          </RequireAuth>
        }
      />
      <Route
        path="/grid"
        element={
          <RequireAuth>
            <GridPage />
          </RequireAuth>
        }
      />
      <Route
        path="/score"
        element={
        <RequireAuth>
         <RoundScoreCard />
          </RequireAuth>
            }
          />

      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route path="/score-details" element={<ScoreDetails />} />

    </Routes>
  )
}

export default App
