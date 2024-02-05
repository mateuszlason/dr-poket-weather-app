import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Layout } from './layout/Layout'
import { WeatherDashboard } from './components/WeatherDashboard'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1h stale time by default
      staleTime: 1000 * 60 * 60,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Layout>
        <WeatherDashboard />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
