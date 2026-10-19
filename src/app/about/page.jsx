import About from "../components/About";
import RootLayoutEng from "../layouteng";

export const metadata = {
    title: "About",
    description: "Discover the story behind the SLA Design brand, where a passion for chemistry meets creativity. Meet Slavica, the founder, born and raised in the beautiful city of Novi Sad. Follow her journey from academic achievements to creating unique fashion pieces, culminating in the creation of the Sladesign brand. Dive into a world where innovation and quality come together to create stunning fashion accessories that captivate with their originality and meticulous craftsmanship. Join us and explore the fusion of science and style at SLA Design."
}

const page = async () => {
    const locale = 'en';

    return <RootLayoutEng>
        <About locale={locale} />
    </RootLayoutEng>
}

export default page;
