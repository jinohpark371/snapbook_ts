import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
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
    </Routes>
  );
}

export default App;
