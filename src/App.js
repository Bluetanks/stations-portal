// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";
// ----------------------------------------------------------------------

const queryClient = new QueryClient({
})
export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
              </PersistGate>
          </Provider>
      </QueryClientProvider>
  );
}
