import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "react";

export default function GallerySection() {
    // Data for gallery cards
    const galleryCards = [
        {
            id: 1,
            title: "Grounding",
            description: "Descubre los beneficios de pisar descalzo sobre la tierra.",
            backgroundImage: "/pexels-tiana-18128-234273.png",
            buttonColor: "bg-[#07c3f2]",
            textColor: "text-white",
        },
        {
            id: 2,
            title: "Entrenamiento",
            description: "Descubre la importancia de mantenerse activo y entrenar.",
            backgroundImage: "/pexels-victorfreitas-949126-1.png",
            buttonColor: "bg-[#fe2857]",
            textColor: "text-[#fffbf2]",
        },
        {
            id: 3,
            title: "Tomar el sol",
            description:
                "Descubre por qué el Sol es la mayor fuente gratuita de salud.",
            backgroundImage: "/pexels-oripolito-1550913-1.png",
            buttonColor: "bg-[url(/rectangle-48.svg)]",
            textColor: "text-[#2e2e2e]",
        },
        {
            id: 4,
            title: "Meditación",
            description: "Descubre el poder de tu mente y de tus emociones.",
            backgroundImage: "/pexels-pixabay-355863-1-1.png",
            buttonColor: "bg-[#fdb60d]",
            textColor: "text-[#fffbf2]",
        },
        {
            id: 5,
            title: "Animal Based",
            description: "Descubre la dieta que hizo estar sanos a tus ancestros.",
            backgroundImage: "/pexels-pits-riccardo-2615795-11898916-2.png",
            buttonColor: "bg-[#3dea62]",
            textColor: "text-white",
        },
        {
            id: 6,
            title: "Exponerse al frío",
            description: "Descubre la forma de evitar el resfriado.",
            backgroundImage: "/pexels-tilldaling-14232280-1.png",
            buttonColor: "bg-[#ff45ed]",
            textColor: "text-[#2e2e2e]",
        },
    ];

    return (
        <section className="relative w-full bg-[#2e2e2e]">
            {/* Hero section with gradient background */}
            <div className="w-full h-[1189px] [background:linear-gradient(180deg,rgba(107,87,255,1)_0%,rgba(0,0,0,1)_100%)]">
                <div className="relative w-full max-w-[1485px] h-[784px] pt-[202px] mx-auto">
                    <div className="relative w-full h-full">
                        <h1 className="[font-family:'Inter-Bold',Helvetica] font-bold text-[#fffbf2] text-9xl tracking-[0] leading-[normal]">
                            A problemas modernos
                        </h1>

                        <div className="relative w-full h-[629px] mt-[155px]">
                            {/* Main gradient text */}
                            <div className="absolute top-0 left-0 [background:linear-gradient(90deg,rgba(175,29,245,1)_0%,rgba(255,69,237,1)_17%,rgba(255,49,140,1)_34%,rgba(254,40,87,1)_50%,rgba(252,128,29,1)_67%,rgba(253,182,13,1)_84%,rgba(252,248,74,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent text-9xl tracking-[0] leading-[normal]">
                                soluciones ancestrales.
                            </div>

                            {/* Echo effect layers with decreasing opacity */}
                            <div className="absolute top-[104px] left-[46px] [background:linear-gradient(90deg,rgba(175,29,245,1)_0%,rgba(255,69,237,1)_17%,rgba(255,49,140,1)_34%,rgba(254,40,87,1)_50%,rgba(252,128,29,1)_67%,rgba(253,182,13,1)_84%,rgba(252,248,74,1)_100%)] opacity-80 text-[120px] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent tracking-[0] leading-[normal]">
                                soluciones ancestrales.
                            </div>

                            <div className="absolute top-[201px] left-[93px] [background:linear-gradient(90deg,rgba(175,29,245,1)_0%,rgba(255,69,237,1)_17%,rgba(255,49,140,1)_34%,rgba(254,40,87,1)_50%,rgba(252,128,29,1)_67%,rgba(253,182,13,1)_84%,rgba(252,248,74,1)_100%)] opacity-60 text-[112px] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent tracking-[0] leading-[normal]">
                                soluciones ancestrales.
                            </div>

                            <div className="absolute top-[293px] left-[140px] [background:linear-gradient(90deg,rgba(175,29,245,1)_0%,rgba(255,69,237,1)_17%,rgba(255,49,140,1)_34%,rgba(254,40,87,1)_50%,rgba(252,128,29,1)_67%,rgba(253,182,13,1)_84%,rgba(252,248,74,1)_100%)] opacity-40 text-[104px] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent tracking-[0] leading-[normal]">
                                soluciones ancestrales.
                            </div>

                            <div className="absolute top-[379px] left-[186px] [background:linear-gradient(90deg,rgba(175,29,245,1)_0%,rgba(255,69,237,1)_17%,rgba(255,49,140,1)_32%,rgba(254,40,87,1)_50%,rgba(252,128,29,1)_69%,rgba(253,182,13,1)_84%,rgba(252,248,74,1)_100%)] opacity-20 text-8xl [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent tracking-[0] leading-[normal]">
                                soluciones ancestrales.
                            </div>

                            <div className="absolute top-[458px] left-[232px] [background:linear-gradient(90deg,rgba(175,29,245,1)_0%,rgba(255,69,237,1)_17%,rgba(255,49,140,1)_32%,rgba(254,40,87,1)_50%,rgba(252,128,29,1)_69%,rgba(253,182,13,1)_84%,rgba(252,248,74,1)_100%)] opacity-10 text-[88px] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent tracking-[0] leading-[normal]">
                                soluciones ancestrales.
                            </div>

                            <div className="absolute top-[532px] left-[278px] [background:linear-gradient(90deg,rgba(175,29,245,1)_0%,rgba(255,69,237,1)_17%,rgba(255,49,140,1)_32%,rgba(254,40,87,1)_50%,rgba(252,128,29,1)_69%,rgba(253,182,13,1)_84%,rgba(252,248,74,1)_100%)] opacity-5 text-[80px] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter-Bold',Helvetica] font-bold text-transparent tracking-[0] leading-[normal]">
                                soluciones ancestrales.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery grid section */}
            <div className="w-full px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First row */}
                {galleryCards.slice(0, 2).map((card) => (
                    <Card
                        key={card.id}
                        className={`w-full h-[824px] bg-cover bg-center bg-no-repeat`}
                        style={{ backgroundImage: `url(${card.backgroundImage})` }}
                    >
                        <CardContent className="flex flex-col h-full justify-between p-0">
                            <h2 className="w-full mt-[127px] text-center [font-family:'Inter-Bold',Helvetica] font-bold text-[#fffbf2] text-5xl tracking-[0] leading-[normal]">
                                {card.title}
                            </h2>
                            <div className="flex flex-col items-center gap-16 mb-[128px]">
                                <p
                                    className={`${card.textColor} text-center mx-auto max-w-[664px] [font-family:'Inter-Medium',Helvetica] font-medium text-2xl tracking-[0] leading-[normal]`}
                                >
                                    {card.description}
                                </p>
                                <Button
                                    className={`${card.buttonColor} w-[197px] h-[50px] rounded-[111px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#fffbf2] text-xl`}
                                >
                                    Saber más
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Second row */}
                {galleryCards.slice(2, 4).map((card) => (
                    <Card
                        key={card.id}
                        className={`w-full h-[824px] bg-cover bg-center bg-no-repeat`}
                        style={{ backgroundImage: `url(${card.backgroundImage})` }}
                    >
                        <CardContent className="flex flex-col h-full justify-between p-0">
                            <h2
                                className={`w-full mt-[127px] text-center [font-family:'Inter-Bold',Helvetica] font-bold ${card.textColor} text-5xl tracking-[0] leading-[normal]`}
                            >
                                {card.title}
                            </h2>
                            <div className="flex flex-col items-center gap-16 mb-[128px]">
                                <p
                                    className={`${card.textColor} text-center mx-auto max-w-[664px] [font-family:'Inter-Medium',Helvetica] font-medium text-2xl tracking-[0] leading-[normal]`}
                                >
                                    {card.description}
                                </p>
                                <Button
                                    className={`${card.buttonColor} w-[197px] h-[50px] rounded-[111px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#fffbf2] text-xl`}
                                >
                                    Saber más
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Third row */}
                {galleryCards.slice(4, 6).map((card) => (
                    <Card
                        key={card.id}
                        className={`w-full h-[824px] bg-cover bg-center bg-no-repeat`}
                        style={{ backgroundImage: `url(${card.backgroundImage})` }}
                    >
                        <CardContent className="flex flex-col h-full justify-between p-0">
                            <h2
                                className={`w-full mt-[127px] text-center [font-family:'Inter-Bold',Helvetica] font-bold ${card.textColor} text-5xl tracking-[0] leading-[normal]`}
                            >
                                {card.title}
                            </h2>
                            <div className="flex flex-col items-center gap-16 mb-[128px]">
                                <p
                                    className={`${card.textColor} text-center mx-auto max-w-[664px] [font-family:'Inter-Medium',Helvetica] font-medium text-2xl tracking-[0] leading-[normal]`}
                                >
                                    {card.description}
                                </p>
                                <Button
                                    className={`${card.buttonColor} w-[197px] h-[50px] rounded-[111px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#fffbf2] text-xl`}
                                >
                                    Saber más
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}