import { Card, CardContent } from "@/components/ui/card";
import "react";

export default function TestimonialsSection() {
    return (
        <div className="relative w-full py-24 bg-gradient-to-b from-black to-[#2e2e2e]">
            <Card className="mx-auto max-w-4xl bg-transparent border-none shadow-none">
                <CardContent className="p-0">
                    <h2 className="text-center font-['Inter-Bold',Helvetica] font-bold text-8xl tracking-normal leading-normal">
                        <span className="text-[#fffbf2]">Convierte tu</span>
                        <span className="text-white">&nbsp;</span>
                        <span className="text-[#3dea62]">salud</span>
                        <span className="text-white">&nbsp;</span>
                        <span className="text-[#fffbf2]">en tu nueva </span>
                        <span className="text-[#fc801d]">normalidad</span>
                        <span className="text-[#fffbf2]">.</span>
                    </h2>
                </CardContent>
            </Card>
        </div>
    );
}