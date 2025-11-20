import AppRouter from "./router/AppRouter";
import "./App.scss";
import { useEffect, useRef } from "react";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {

    const appRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = appRef.current;
        if (!el) return;

        const onScroll = () => {
            const header = document.querySelector("header");
            if (!header) return;

            if (el.scrollTop > 0) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div ref={appRef} className="App">
            <header className="AppHeader">
                <div className="Logo"/>
                <DarkModeToggle/>
            </header>
            <AppRouter/>
            <footer className="AppFooter">
                <div className="FooterText">Apollo MedFlight — Internal Tool &nbsp;℗ 2025</div>
            </footer>
        </div>
    )
}

export default App;