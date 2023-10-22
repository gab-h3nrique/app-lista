
import { ThemeProvider } from './src/context/ThemeProvider';
import { StorageDataProvider } from './src/context/StorageDataProvider';
import { UserProvider } from './src/context/UserProvider';
import Index from './src/screens/Index';

function App(): JSX.Element {
  
  return (
    
    <ThemeProvider>
      <StorageDataProvider>
        <UserProvider>

            
          <Index/>


        </UserProvider>
      </StorageDataProvider>
    </ThemeProvider>

  );

}


export default App;

