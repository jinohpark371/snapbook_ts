import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AuthRedirectPage from './pages/AuthRedirectPage';
import SignupGatePage from './pages/SignupGatePage';
import SignupPage from './pages/SignupPage';
import GlobalStyle from './styles/GlobalStyled';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes /> {/* AuthProvider 내부로 분리 */}
          </BrowserRouter>
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </>
  );
}

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      {/* 로그인 여부에 따라 분기 */}
      <Route path="/" element={auth ? <HomePage /> : <LoginPage />} />
      <Route path="/auth" element={<AuthRedirectPage />} />
      <Route path="/signup" element={<SignupGatePage />} />
      <Route path="/signup/customer" element={<SignupPage userType="CUSTOMER" />} />
      <Route path="/signup/owner" element={<SignupPage userType="OWNER" />} />
    </Routes>
  );
}

export default App;
