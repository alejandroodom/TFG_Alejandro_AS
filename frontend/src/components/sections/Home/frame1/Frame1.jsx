import 'react';
import './Frame1.css';
import Back from './Frame1.svg';
import Suns from './Suns.svg';
import ComenzarButton from "../../../buttons/Comenzar.jsx";

const Main = () => {
    return (
        <>

                <div className="frame1">
                    <div className="background">
                        <img src={Back} alt="Back" className="back" />
                    </div>
                    <div className="Suns">
                        <img src={Suns} alt="Suns" className="suns" />
                    </div>
                    <div className="text-container">
                        <h1 className="frame-text">Descubre la vida detrás de la enfermedad.</h1>
                        <div>
                            {/* Otros componentes */}
                            <ComenzarButton />
                        </div>
                    </div>
                </div>

        </>
    );
};

export default Main;