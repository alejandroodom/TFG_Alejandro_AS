import "react";

const FeaturesSection = () => {
    return (
        <section className="w-full py-32 bg-gradient-to-b from-[#2e2e2e] via-black to-[#2e2e2e]">
            <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center gap-8">
                <h2 className="font-bold text-[#fffbf2] text-6xl md:text-7xl lg:text-8xl max-w-6xl">
                    No importa cual sea tu objetivo
                </h2>

                <div className="flex flex-col gap-6 max-w-6xl">
                    <p className="font-bold text-[#3dea62] text-6xl md:text-7xl lg:text-8xl">
                        revertir una enfermedad crónica
                    </p>

                    <p className="font-bold text-[#fffbf2] text-6xl md:text-7xl lg:text-8xl">
                        tenemos la solución.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;