import './globals.css'
import type { ReactNode } from 'react'
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import {getFooterNavigationData} from "@/app/Lang/LangHelper";
import {getNavigationData} from "@/app/api/DataProvider";


export const metadata = {
    title: "Home",
    description: "Discover exquisite handcrafted fashion details for women and girls at Sladesignshop. Explore our curated collection of unique accessories, meticulously created to elevate your style. Shop now for handmade fashion accents that add a touch of individuality to every outfit."
}

export const locale = 'en';

export default async function RootLayoutEng({
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
