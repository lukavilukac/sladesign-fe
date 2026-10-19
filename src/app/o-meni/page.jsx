import RootLayoutSrb from "../layoutsrb";
import About from "../components/About";

export const metadata = {
    title: "O Meni",
    description: "Upoznajte priču iza brenda SLA Design, gde se strast prema hemiji sreće sa kreativnošću. Upoznajte Slavicu, osnivača, rođenu i odraslu u prelepom Novom Sadu. Pratite njen put od akademskih dostignuća do stvaranja jedinstvenih modnih komada, što je kulminiralo stvaranjem brenda Sladesign. Zaronite u svet gde se inovacija i kvalitet susreću kako bi stvorili prelepe modne dodatke koji očaravaju svojom originalnošću i pažljivom izradom. Pridružite nam se i istražite spoj nauke i stila kod SLA Design-a."
}

const page = async () => {
    const locale = 'sr';

    return <RootLayoutSrb>
        <About locale={locale} />
    </RootLayoutSrb>
}

export default page;
