import {
    getAboutPageImgText1,
    getAboutPageImgText2,
    getAboutPageP1,
    getAboutPageP2,
    getAboutPageP3
} from "../Lang/LangHelper";

const About = ({locale}) => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-4 relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
                        <div className="absolute inset-0 bg-gray-900 opacity-20" />
                        <img
                            className="h-auto w-full object-cover shadow-lg opacity-50"
                            src="https://admin.sladesignshop.com/images/front/about/slavica-babic.jpg"
                            alt="Slavica Babic - Sla Design"
                        />
                        {/* Moved part for mobile */}
                        <div className="absolute inset-0 hidden lg:flex flex-col justify-center items-center text-center">
                            <h1 className="text-white text-4xl font-bold opacity-60">SLA Design</h1>
                            <p className="mt-2 text-white text-xl opacity-60">{getAboutPageImgText1(locale)}</p>
                        </div>
                        {/* Original part */}
                        <div className="absolute bottom-4 right-4">
                            <p className="text-white text-l italic p-3">{getAboutPageImgText2(locale)}</p>
                        </div>
                    </div>

                    <div>
                        <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                            <h1 className="font-semibold leading-7 text-pink-400 text-3xl">SLA Design</h1>
                            <div className="max-w-xl mt-10">
                                <p className="mt-6">
                                    {getAboutPageP1(locale)}
                                </p>
                                <p className="mt-8">
                                    {getAboutPageP2(locale)}
                                </p>
                                <p className="mt-8">
                                    {getAboutPageP3(locale)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
