import "react";
import Header from "../components/sections/Home/header/Header.jsx";
import Frame1 from "../components/sections/Home/frame1/Frame1.jsx";

function Home() {
    return (
        <div>
            <Header />
            <Frame1 />
            {/* Resto del contenido del Home */}
        </div>
    );
}

export default Home;