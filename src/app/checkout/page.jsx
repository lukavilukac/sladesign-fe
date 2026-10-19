import RootLayoutEng from "../layouteng";
import Checkout from "../components/Checkout";

const page = async () => {
    const locale = 'en';

    return <RootLayoutEng>
        <Checkout locale={locale} />
    </RootLayoutEng>
}

export default page;