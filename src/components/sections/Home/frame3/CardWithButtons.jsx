import  { useState } from 'react';
import './CardWithButtons.css';

// Componentes de íconos (puedes reemplazarlos con tus SVG o importar una librería como react-icons)
const SunIcon = () => <div className="icon sun-icon"></div>;
const DonutIcon = () => <div className="icon donut-icon"></div>;
const TreeIcon = () => <div className="icon tree-icon"></div>;
const DropIcon = () => <div className="icon drop-icon"></div>;
const MoonIcon = () => <div className="icon moon-icon"></div>;
const DumbbellIcon = () => <div className="icon dumbbell-icon"></div>;
const BrainIcon = () => <div className="icon brain-icon"></div>;
const HourglassIcon = () => <div className="icon hourglass-icon"></div>;

const CardWithButtons = () => {
    // Estado para controlar qué botón está activo y mostrar su info
    const [activeButton, setActiveButton] = useState(null);

    // Datos de los botones
    const buttons = [
        { id: 1, name: "Luz natural", icon: <SunIcon />, description: "Tomar el sol y evitar la luz azul." },
        { id: 2, name: "Nutrición", icon: <DonutIcon />, description: "Información sobre nutrición" },
        { id: 3, name: "Naturaleza", icon: <TreeIcon />, description: "Conexión con la naturaleza" },
        { id: 4, name: "Hidratación", icon: <DropIcon />, description: "Importancia de la hidratación" },
        { id: 5, name: "Sueño", icon: <MoonIcon />, description: "Mejorar la calidad del sueño" },
        { id: 6, name: "Ejercicio", icon: <DumbbellIcon />, description: "Actividad física regular" },
        { id: 7, name: "Salud mental", icon: <BrainIcon />, description: "Cuidar de tu mente" },
        { id: 8, name: "Ayuno", icon: <HourglassIcon />, description: "Beneficios del ayuno intermitente" },
    ];

    // Manejador de clic en botón
    const handleButtonClick = (id) => {
        // Si ya está activo, lo desactiva; si no, lo activa
        setActiveButton(activeButton === id ? null : id);
    };

    return (
        <div className="card-container">
            {/* Contenedor principal de la tarjeta */}
            <div className="card">
                {/* Grid de botones */}
                <div className="buttons-grid">
                    {buttons.map((button) => (
                        <button
                            key={button.id}
                            className={`button ${activeButton === button.id ? 'active' : ''}`}
                            onClick={() => handleButtonClick(button.id)}
                        >
                            {button.icon}
                        </button>
                    ))}
                </div>

                {/* Información del botón activo */}
                {activeButton && (
                    <div className="info-card">
                        <h3>{buttons.find(b => b.id === activeButton)?.name}</h3>
                        <p>{buttons.find(b => b.id === activeButton)?.description}</p>
                        {/* Aquí puedes añadir más contenido para cada tarjeta */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardWithButtons;