import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "../pages/StartPage";
import ContentPage from "../pages/ContentPage";
import SingleBriefPage from "../pages/SingleBriefPage";

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<StartPage/>}/>
                <Route path="/start" element={<StartPage/>}/>
                <Route path="/briefs" element={<ContentPage/>}/>
                <Route path="/single-brief" element={<SingleBriefPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;