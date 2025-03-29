import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "react";

export default function HeaderSection() {
    // Data for images to make the code more maintainable
    const images = [
        {
            id: 1,
            src: "",
            alt: "Group",
            className: "absolute w-[818px] h-[818px] top-[30px] left-[237px]",
        },
        {
            id: 2,
            src: "",
            alt: "Vector",
            className: "absolute w-[1282px] h-[1283px] top-[566px] left-[-1557px]",
        },
        {
            id: 3,
            src: "",
            alt: "Clip path group",
            className: "absolute w-[1604px] h-[1435px] top-[203px] left-[324px]",
        },
        {
            id: 4,
            src: "",
            alt: "Vector",
            className: "absolute w-[1004px] h-[1005px] top-[436px] left-[383px]",
        },
        {
            id: 5,
            src: "",
            alt: "Group",
            className: "absolute w-[613px] h-[613px] top-[627px] left-[578px]",
        },
        {
            id: 6,
            src: "",
            alt: "Clip path group",
            className: "absolute w-[1145px] h-[1145px] top-[373px] left-[82px]",
        },
        {
            id: 7,
            src: "",
            alt: "Clip path group",
            className: "absolute w-[935px] h-[1022px] top-[373px] left-[37px]",
        },
        {
            id: 8,
            src: "",
            alt: "Clip path group",
            className: "absolute w-[474px] h-[511px] top-[373px] left-[37px]",
        },
        {
            id: 9,
            src: "",
            alt: "Vector",
            className: "absolute w-[498px] h-[497px] top-0 left-0",
        },
        {
            id: 10,
            src: "",
            alt: "Vector",
            className: "absolute w-[506px] h-[505px] top-[148px] left-[34px]",
        },
        {
            id: 11,
            src: "",
            alt: "Group",
            className: "absolute w-[275px] h-[275px] top-[259px] left-[149px]",
        },
        {
            id: 12,
            src: "",
            alt: "Clip path group",
            className: "absolute w-[474px] h-[511px] top-0 left-0",
        },
        {
            id: 13,
            src: "",
            alt: "Clip path group",
            className: "absolute w-[229px] h-[229px] top-[373px] left-[141px]",
        },
        {
            id: 14,
            src: "",
            alt: "Vector",
            className: "absolute w-[996px] h-[997px] top-0 left-0",
        },
    ];

    return (
        <section className="relative w-full h-[2044px]">
            <div className="relative h-[2044px]">
                <div className="absolute w-full h-[2044px] top-0 left-0">
                    <div className="relative h-[2044px] overflow-hidden">
                        <div className="absolute w-[1982px] h-[1638px] top-[380px] left-[73px]">
                            <div className="absolute w-[1920px] h-[1080px] top-[275px] left-[39px] [background:linear-gradient(122deg,rgba(175,29,245,1)_0%,rgba(87,14,121,1)_20%,rgba(0,0,0,1)_41%,rgba(0,0,0,1)_50%,rgba(0,0,0,1)_60%,rgba(0,0,0,1)_75%,rgba(0,0,0,1)_90%,rgba(0,0,0,1)_100%)]">
                                <div className="relative w-[236px] h-[60px] top-[191px] left-[347px]">
                                    <Button className="relative w-[234px] h-[60px] bg-[#fcf84a] text-[#2e2e2e] text-2xl rounded-[96px] hover:bg-[#fcf84a]/90">
                    <span className="[font-family:'Inter-Regular',Helvetica]">
                      Comenzar
                    </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="absolute w-[1282px] h-[1283px] top-0 left-[699px]">
                                <div className="relative h-[1283px]">
                                    <div className="absolute w-[1262px] h-[1089px] top-[203px] -left-1 bg-[url(/vector.svg)] bg-[100%_100%]">
                                        <img
                                            className={images[0].className}
                                            alt={images[0].alt}
                                            src={images[0].src}
                                        />
                                    </div>

                                    <img
                                        className={images[1].className}
                                        alt={images[1].alt}
                                        src={images[1].src}
                                    />
                                </div>
                            </div>

                            <img
                                className={images[2].className}
                                alt={images[2].alt}
                                src={images[2].src}
                            />

                            <img
                                className={images[3].className}
                                alt={images[3].alt}
                                src={images[3].src}
                            />

                            <img
                                className={images[4].className}
                                alt={images[4].alt}
                                src={images[4].src}
                            />

                            <img
                                className={images[5].className}
                                alt={images[5].alt}
                                src={images[5].src}
                            />

                            <img
                                className={images[6].className}
                                alt={images[6].alt}
                                src={images[6].src}
                            />

                            <img
                                className={images[7].className}
                                alt={images[7].alt}
                                src={images[7].src}
                            />

                            <div className="absolute w-[572px] h-[645px] top-[373px] left-0">
                                <div className="relative h-[645px]">
                                    <div className="absolute w-[498px] h-[497px] top-[714px] left-[-1482px] bg-[url(/vector-5.svg)] bg-[100%_100%]">
                                        <img
                                            className={images[8].className}
                                            alt={images[8].alt}
                                            src={images[8].src}
                                        />
                                    </div>

                                    <div className="absolute w-[540px] h-[653px] top-0 left-[37px]">
                                        <img
                                            className={images[9].className}
                                            alt={images[9].alt}
                                            src={images[9].src}
                                        />

                                        <img
                                            className={images[10].className}
                                            alt={images[10].alt}
                                            src={images[10].src}
                                        />

                                        <img
                                            className={images[11].className}
                                            alt={images[11].alt}
                                            src={images[11].src}
                                        />
                                    </div>
                                </div>
                            </div>

                            <img
                                className={images[12].className}
                                alt={images[12].alt}
                                src={images[12].src}
                            />

                            <div className="h-[72px] top-[203px] left-[39px] bg-black absolute w-[1920px]" />
                        </div>

                        <div className="absolute w-[996px] h-[997px] top-[1383px] left-[-1097px] bg-[url(/vector-3.svg)] bg-[100%_100%]">
                            <img
                                className={images[13].className}
                                alt={images[13].alt}
                                src={images[13].src}
                            />
                        </div>
                    </div>
                </div>

                <Card className="absolute w-[641px] top-[750px] left-[459px] border-none bg-transparent shadow-none">
                    <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#fffbf2] text-[32px] text-center tracking-[0] leading-normal whitespace-nowrap">
            <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#fffbf2] text-[32px] tracking-[0]">
              Descubre la{" "}
            </span>
                        <span className="[font-family:'Inter-SemiBold',Helvetica] font-semibold">
              vida
            </span>
                        <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#fffbf2] text-[32px] tracking-[0]">
              {" "}
                            detrás de la{" "}
            </span>
                        <span className="[font-family:'Inter-Light',Helvetica] font-light">
              enfermedad
            </span>
                        <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#fffbf2] text-[32px] tracking-[0]">
              .
            </span>
                    </p>
                </Card>
            </div>
        </section>
    );
}