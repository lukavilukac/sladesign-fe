import Checkout from "../components/Checkout";
import RootLayoutSrb from "../layoutsrb";

const page = async () => {
    const locale = 'sr';

    return <RootLayoutSrb>
        <Checkout locale={locale} />
    </RootLayoutSrb>
}

export default page;