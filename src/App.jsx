import { InvoiceProvider } from './context/InvoiceContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <HomePage />
        </div>
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
