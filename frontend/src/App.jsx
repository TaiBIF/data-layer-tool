import "./styles/base/_animation.scss";
import "./styles/base/_mixin.scss";
import "./styles/base/_reset.scss";
import "./styles/pages/_index.scss";
import "./styles/pages/_main.scss";

import Header from "./components/Header";
import BackgroundAnimation from "./components/BackgroundAnimation";
import FilterSection from "./components/FilterSection";
import DialogPanel from "./components/Dialog/DialogPanel";

function App() {
    return (
        <>
            <BackgroundAnimation />
            <DialogPanel />
            <Header />
            <FilterSection />
        </>
    );
}

export default App;
