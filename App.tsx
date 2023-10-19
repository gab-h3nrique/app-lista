
import Layout from './src/components/Layout';
import { NavigationProvider } from './src/context/NavigationProvider';
import Index from './src/screens/Index';
import { ThemeProvider, useTheme } from './src/context/ThemeProvider';

function App(): JSX.Element {


  return (
    
    <ThemeProvider>
      <NavigationProvider>

        <Layout>

          <Index/>

        </Layout>

      </NavigationProvider>
    </ThemeProvider>

  );

}





export default App;
