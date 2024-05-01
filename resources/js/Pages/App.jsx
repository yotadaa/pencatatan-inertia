
import Root from './provider/Root';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App({ isAuth, mode = true, failed = false, message = "" }) {
    console.log(isAuth, mode)
    return (
        <Root isAuth={isAuth} mode={mode} failed={failed} message={message} />
    );
}

export default App;
