import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "../pages/StartPage";

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<StartPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;