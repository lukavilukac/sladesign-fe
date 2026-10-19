import './globals.css'
import type { ReactNode } from 'react'
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import {getFooterNavigationData} from "@/app/Lang/LangHelper";
import {getNavigationData} from "@/app/api/DataProvider";


export const metadata = {
    title: "Pocetna",
    description: "Otkrijte izvrsne ručno izrađene modne detalje za žene i devojčice na Sladesignshopu. istražite našu odabranu kolekciju jedinstvenih dodataka, pažljivo kreiranih da unaprede vaš stil. Kupujte sada ručno izrađene modne detalje koji dodaju dodir individualnosti svakom odevnom komadu."
}

export const locale = 'sr';

export default async function RootLayoutSrb({
                                                children,
                                            }: {
    children: ReactNode
}) {

    const data = await getNavigationData(locale);


    return (
        <>
            <Navigation navigation={data.navigation} locale={locale}/>

            {children}

            <Footer navigation={getFooterNavigationData(locale)} locale={locale}/>
        </>
    )
}
