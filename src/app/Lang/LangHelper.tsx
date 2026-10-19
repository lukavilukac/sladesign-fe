import {LangContent} from "@/app/Lang/LangContent";
import {Locale} from "@/app/interfaces/locale";

interface response {
    data: []
}

export const getFooterNavigationData = (locale: Locale) => {
    return LangContent[locale].footerNavigation;
}

export const buildMainNavigationObject = (locale: Locale, response: response) => {
    const getHrefPrefix = () => {
        if (locale === 'en') {
            return /categories/;
        }
        return '/kategorije/';
    }

    LangContent[locale].mainNavigation.categories[0].featured = response.data.map((category: any) => ({
        ...category,
        href: getHrefPrefix() + category.slug
    })) as any;

    return LangContent[locale].mainNavigation;
}

export const getWelcomeMessage = (locale: Locale) => {
    return LangContent[locale].welcomeMessage;
}

export const getShoppingCart = (locale: Locale) => {
    return LangContent[locale].shoppingCart;
}

export const getItemsInYourShoppingCart = (locale: Locale) => {
    return LangContent[locale].itemsInYourShoppingCart;
}

export const getQuantity = (locale: Locale) => {
    return LangContent[locale].quantity;
}

export const getClose = (locale: Locale) => {
    return LangContent[locale].close;
}

export const getRemove = (locale: Locale) => {
    return LangContent[locale].remove;
}

export const getOrderTotal = (locale: Locale) => {
    return LangContent[locale].orderTotal;
}

export const getOrderSummary = (locale: Locale) => {
    return LangContent[locale].orderSummary;
}

export const getContinueToPayment = (locale: Locale) => {
    return LangContent[locale].continueToPayment;
}

export const getCheckoutPageLink = (locale: Locale) => {
    return LangContent[locale].checkoutPageLink;
}

export const getShipping = (locale: Locale) => {
    return LangContent[locale].shipping;
}

export const getSubtotal = (locale: Locale) => {
    return LangContent[locale].subtotal;
}

export const getAddToCartString = (locale: Locale) => {
    return LangContent[locale]?.addToCard;
}

export const getAddProductSuccess = (locale: Locale) => {
    return LangContent[locale].addProductSuccess;
}

export const shopByCategoryString = (locale: Locale) => {
    return LangContent[locale].shopByCategory;
}

export const getSeeMoreTitle = (locale: Locale) => {
    return LangContent[locale].seeMore;
}

export const getLandingPhrase = (locale: Locale) => {
    return LangContent[locale].landingPhrase;
}

export const getRightsReserved = (locale: Locale) => {
    return LangContent[locale].rightsReserved;
}

export const getBenefits = (locale: Locale) => {
    return LangContent[locale].benefits;
}

export const getContactInformation = (locale: Locale) => {
    return LangContent[locale].contactInformation;
}

export const getEmailAddress = (locale: Locale) => {
    return LangContent[locale].emailAddress;
}

export const getPhoneNumber = (locale: Locale) => {
    return LangContent[locale].phoneNumber;
}

export const getFirstName = (locale: Locale) => {
    return LangContent[locale].firstName;
}

export const getLastName = (locale: Locale) => {
    return LangContent[locale].lastName;
}

export const getAddress = (locale: Locale) => {
    return LangContent[locale].address;
}

export const getApartment = (locale: Locale) => {
    return LangContent[locale].apartment;
}

export const getCountry = (locale: Locale) => {
    return LangContent[locale].country;
}

export const getCity = (locale: Locale) => {
    return LangContent[locale].city;
}

export const getPostalCode = (locale: Locale) => {
    return LangContent[locale].postalCode;
}

export const getShippingAddress = (locale: Locale) => {
    return LangContent[locale].shippingAddress;
}

export const getWillBeCharged = (locale: Locale) => {
    return LangContent[locale].willBeCharged;
}

export const getCheckout = (locale: Locale) => {
    return LangContent[locale].checkout;
}

export const getInvalidField = (locale: Locale) => {
    return LangContent[locale].invalidField;
}

export const getConfirmationTitle = (locale: Locale) => {
    return LangContent[locale].confirmationTitle;
}

export const getConfirmationDescription = (locale: Locale) => {
    return LangContent[locale].confirmationDescription;
}

export const getConfirmationPageButton = (locale: Locale) => {
    return LangContent[locale].confirmationPageButton;
}

export const getGoToCheckoutPageButton = (locale: Locale) => {
    return LangContent[locale].proceedToConfirmation;
}

export const getAboutPageImgText1 = (locale: Locale) => {
    return LangContent[locale].aboutPage.imgText1;
}
export const getAboutPageImgText2 = (locale: Locale) => {
    return LangContent[locale].aboutPage.imgText2;
}
export const getAboutPageP1 = (locale: Locale) => {
    return LangContent[locale].aboutPage.p1;
}
export const getAboutPageP2 = (locale: Locale) => {
    return LangContent[locale].aboutPage.p2;
}
export const getAboutPageP3 = (locale: Locale) => {
    return LangContent[locale].aboutPage.p3;
}

export const getAbout = (locale: Locale) => {
    return LangContent[locale].about;
}



