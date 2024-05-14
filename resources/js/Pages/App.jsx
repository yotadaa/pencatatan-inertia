
import Root from './provider/Root';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App({ isAuth, mode = true, failed = false, message = "", props, url }) {
    console.log(isAuth, mode)
    return (
        <Root url={url} isAuth={isAuth} mode={mode} failed={failed} message={message} props={props} />
    );
}

export default App;
