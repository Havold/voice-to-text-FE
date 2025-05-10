import NavBar from './components/NavBar/NavBar';

import Home from './pages/home/Home';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './styles.scss';

import Experiment from './pages/experiment/Experiment';
import Create from './pages/create/Create';
import History from './pages/history/History';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
    const queryClient = new QueryClient();
    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div>
                    <NavBar />
                    <Outlet />
                </div>
            </QueryClientProvider>
        );
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/experiment',
                    element: <Experiment />,
                },
                {
                    path: '/create',
                    element: <Create />,
                },
                {
                    path: '/history',
                    element: <History />,
                },
            ],
        },
    ]);
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
