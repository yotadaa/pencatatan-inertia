
import Root from './provider/Root';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App({ isAuth, mode = true }) {
    console.log(isAuth, mode)
    return (
        <Root isAuth={isAuth} mode={mode} />
    );
}

export default App;