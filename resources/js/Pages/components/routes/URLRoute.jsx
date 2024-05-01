import { Route, Routes } from "react-router-dom";
import { menu } from '../../assets/nav/identity';
import RegisterPage from "../AuthPage/FormRegister";
import Main from "../main/Main";


export default function URLRoute() {
    return (
        <Routes>
            {menu.map((item, index) => (
                <Route key={index} path={item.path} element={<Main Element={item.element} />} />
            ))}
            <Route path='/register' element={<RegisterPage mode={true} />} />
            <Route path='/login' element={<RegisterPage mode={false} />} />
        </Routes>
    )
}
