import { useState } from 'react';
import './OutputPage.scss';
import AppFooter from '../views/AppFooter';
import AppHeader from '../views/AppHeader';

const OutputPage = () => {
    const [data] = useState(() => {
        const raw = sessionStorage.getItem("output");
        return raw ? JSON.parse(raw) : null;
    });

    return (
        <div className="OutputPage">
            <AppHeader />
            <h4 style={{ textAlign: "center" }}>Output</h4>
            <div className="OutputArea">
                <pre>{data ? JSON.stringify(data, null, 2) : 'No data available.'}</pre>
            </div>
            <AppFooter />
        </div>
    );
};

export default OutputPage;