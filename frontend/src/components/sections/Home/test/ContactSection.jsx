import { Card, CardContent } from "@/components/ui/card";
import {
    Activity,
    Droplets,
    Heart,
    Leaf,
    Moon,
    Sun,
    Utensils,
    X,
} from "lucide-react";
import "react";

export default function ContactSection() {
    // Data for the health principles cards
    const healthPrinciples = [
        { id: 1, icon: <Sun className="w-24 h-24" />, title: "Luz natural" },
        { id: 2, icon: <Utensils className="w-24 h-24" />, title: "Alimentación" },
        {
            id: 3,
            icon: <Leaf className="w-[104px] h-[116px]" />,
            title: "Naturaleza",
        },
        { id: 4, icon: <Droplets className="w-24 h-24" />, title: "Hidratación" },
        { id: 5, icon: <Moon className="w-24 h-24" />, title: "Descanso" },
        {
            id: 6,
            icon: <Activity className="w-24 h-24" />,
            title: "Actividad física",
        },
        {
            id: 7,
            icon: <Heart className="w-[104px] h-[104px]" />,
            title: "Bienestar emocional",
        },
        { id: 8, icon: <X className="w-24 h-24" />, title: "Sustancias nocivas" },
    ];

    // Data for the longevity cards
    const longevityCards = [
        {
            id: 1,
            icon: <Heart className="w-32 h-32" />,
            title: "Colesterol",
            description:
                "Las personas más longevas tienen el colesterol total más elevado que lo que recomiendan los médicos.",
        },
        {
            id: 2,
            icon: <Sun className="w-32 h-[130px]" />,
            title: "Sol",
            description:
                'En las regiones donde más años vive la gente, las denominadas "zonas azules", hay sol casi todo el año.',
        },
        {
            id: 3,
            icon: <Activity className="w-32 h-32" />,
            title: "Movimiento",
            description:
                "Los centenarios son personas que se han mantenido activas toda su vida.",
        },
    ];

    return (
        <div className="relative w-full bg-white overflow-hidden">
            <div className="relative">
                <div className="w-full bg-[#2e2e2e]">
                    <div className="mx-auto max-w-[1606px] bg-black rounded-[32px] p-12">
                        <div className="mb-16">
                            <h1 className="font-bold text-[#fffbf2] text-[64px] mb-6">
                                Salud, Independencia y Libertad
                            </h1>
                            <p className="font-medium text-[#fffbf2] text-[32px]">
                                Claves para una vida libre de fármacos, llena de energía y
                                vitalidad.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {healthPrinciples.map((principle) => (
                                <Card
                                    key={principle.id}
                                    className="bg-transparent rounded-[32px] shadow-[inset_-1px_1px_4px_#00000040]"
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-12">
                                        {principle.icon}
                                        <p className="font-medium text-[#fffbf2] text-xl mt-6 text-center">
                                            {principle.title}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center my-16">
                        <img className="max-w-[1227px] h-auto" alt="Toma el sol" src="" />
                    </div>

                    <div className="mx-auto max-w-[1226px] mt-16">
                        <h2 className="font-semibold text-[#fffbf2] text-5xl mb-12">
                            El secreto de la longevidad
                        </h2>

                        <div className="mb-6">
                            <p className="font-normal text-[#fffbf2] text-xl">
                                ¿Vivir hasta los 100 años con una buena capacidad cognitiva,
                                fuerza, energía y autosuficiencia o morir a los 80 en una
                                residencia rodeado de fármacos y enfermeras, tras una vejez de
                                sufrimiento y dependencia? Depende solo de ti.
                            </p>
                            <div className="text-right">
                <span className="font-medium text-[#ff318c] text-xl">
                  Saber más
                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {longevityCards.map((card) => (
                                <Card key={card.id} className="bg-black rounded-2xl">
                                    <CardContent className="flex flex-col items-center p-6">
                                        <div className="flex justify-center items-center py-8">
                                            {card.icon}
                                        </div>
                                        <h3 className="font-semibold text-[#fffbf2] text-xl mb-6 text-center">
                                            {card.title}
                                        </h3>
                                        <p className="font-normal text-[#fffbf2] text-base">
                                            {card.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}