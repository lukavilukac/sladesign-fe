export const LangContent = {
    sr: {
        footerNavigation: {
            main: [
                { name: 'O meni', href: '/o-meni' }
            ],
            social: [
                {
                    name: 'Facebook',
                    href: 'https://www.facebook.com/slasladesign/',
                    icon: (props: any) => (
                        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                            <path
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ),
                },
                {
                    name: 'Instagram',
                    href: 'https://www.instagram.com/sla_design_/',
                    icon: (props: any) => (
                        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                            <path
                                fillRule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ),
                },
                // {
                //     name: 'Twitter',
                //     href: '#',
                //     icon: (props) => (
                //         <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                //             <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                //         </svg>
                //     ),
                // },
                // {
                //     name: 'GitHub',
                //     href: '#',
                //     icon: (props) => (
                //         <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                //             <path
                //                 fillRule="evenodd"
                //                 d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                //                 clipRule="evenodd"
                //             />
                //         </svg>
                //     ),
                // },
                // {
                //     name: 'YouTube',
                //     href: '#',
                //     icon: (props) => (
                //         <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                //             <path
                //                 fillRule="evenodd"
                //                 d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                //                 clipRule="evenodd"
                //             />
                //         </svg>
                //     ),
                // },
            ]
        },
        mainNavigation: {
            categories: [
                {
                    name: 'Katalog',
                    featured: []
                }
            ],
            pages: [
                { name: 'Company', href: '#' },
                { name: 'Stores', href: '#' },
            ],
        },
        about: 'O meni',
        addToCard: 'Dodaj u Korpu',
        welcomeMessage: 'Dobrodošli u',
        seeMore: 'Pogledaj Više',
        landingPhrase: '...gde se moda i ljubav spajaju. Pronađite svoj jedinstveni modni detalj s nama.',
        rightsReserved: 'Sva prava zadržana.',
        shopByCategory: 'Kupujte po kategorijama',
        shoppingCart : 'Korpa za Kupovinu',
        itemsInYourShoppingCart : 'Proizvodi u vašoj korpi za kupovinu',
        quantity: 'Količina',
        close: 'Zatvori',
        remove: 'Izbaci',
        continueToPayment: 'Nastavi na Plaćanje',
        checkoutPageLink: 'porudzbina',
        orderTotal : 'Ukupan iznos porudžbine',
        shipping: 'Dostava',
        subtotal: 'Iznos porudžbine',
        orderSummary: 'Pregled porudžbine',
        addProductSuccess: 'Uspešno ste dodali: ',
        contactInformation: "Kontakt Informacije",
        emailAddress: "Email addresa",
        phoneNumber: "Broj Telefona",
        firstName: "Ime",
        lastName: "Prezime",
        address: "Addresa",
        apartment: "Stan, sprat, itd.",
        country: "Država",
        city: "Grad",
        postalCode: "Poštanski kod",
        shippingAddress: "Adresa za dostavu",
        willBeCharged: "Naplata će se izvršiti pri preuzimanju, pouzećem.",
        checkout: "Poruči",
        invalidField: "Polje nije validno!",
        confirmationTitle: "Uspešna porudžbina!",
        confirmationDescription: "Hvala vam na porudžbini! Primili smo vašu porudžbinu i uskoro ćemo je obraditi.",
        confirmationPageButton: "Nazad na početnu stranu",
        proceedToConfirmation: "Poručivanje",
        benefits: [
            {
                name: 'Besplatna dostava',
                imageSrc: '/icon-delivery-light.svg',
                description:
                    "Naručite sada i dostava je besplatna za sve porudžbine u vrednosti od 5000 dinara ili više na teritoriji Srbije. Za porudžbine ispod tog iznosa, primenjuje se najpovoljnija cena dostave dostavljača.",
            },
            {
                name: 'Garantovan kvalitet',
                imageSrc: '/icon-warranty-light.svg',
                description:
                    "Sa višegodišnjim iskustvom u industriji, ponosno nudimo visokokvalitetne proizvode koji dolaze sa izuzetno dugoročnom garancijom, pružajući vam sigurnost i pouzdanost u svakoj kupovini.",
            },
            {
                name: 'Garancija zadovoljstva',
                imageSrc: '/icon-returns-light.svg',
                description:
                    'Razumemo da kada vam proizvod stigne, možda vam se neće posebno svideti, ili ste naručili pogrešan proizvod. U takvim slučajevima, nudimo mogućnost povraćaja.',
            },
            {
                name: 'Prirodna Elegancija',
                imageSrc: '/icon-planet-light.svg',
                description:
                    "Sa ponosom ističemo da se u našem procesu proizvodnje koriste isključivo visokokvalitetni prirodni materijali, kako bismo osigurali ekološku održivost i pružili vam proizvode vrhunskog kvaliteta.",
            },
        ],
        aboutPage: {
            imgText1: 'Kreacija sa dušom biohemičara.',
            imgText2: 'Moda sa srcem, za život sa stilom...',
            p1: 'Zdravo! Moje ime je Slavica i želela bih da podelim sa vama svoju priču. Rođena sam i odrasla u prelepom Novom Sadu, gde sam pohađala Svetinu gimnaziju. Bila sam uvek znatiželjna i strastvena prema hemiji i prirodnim naukama, i taj interes me je doveo do studiranja na Matematičkom fakultetu, sa posebnim fokusom na biohemiju.',
            p2: 'Sticanje diplome iz biohemije bilo je veliko dostignuće za mene, ali moj život nije bio ograničen samo na akademske uspehe. Oduvek sam bila kreativna duša, sa strašću prema umetnosti i dizajnu. Kako bih ispunila svoje kreativne ambicije, počela sam da se bavim pravljenjem modnih detalja iz hobija.',
            p3: "Vremenom, moj hobi je prerastao u nešto više. Rodio se brend Sladesign, u kojem se ističu inovativni i jedinstveni modni detalji koje sama dizajniram i izrađujem. Ono što me posebno ispunjava jeste sposobnost da svoju strast pretvorim u posao. Sladesign se razlikuje po svojoj originalnosti i kvalitetu. Moji proizvodi privlače pažnju svojim jedinstvenim dizajnom i pažljivom izradom.",
        }
    },
    en: {
        footerNavigation: {
            main: [
                { name: 'About', href: '/about' },
            ],
            social: [
                {
                    name: 'Facebook',
                    href: 'https://www.facebook.com/slasladesign/',
                    icon: (props: any) => (
                        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                            <path
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ),
                },
                {
                    name: 'Instagram',
                    href: 'https://www.instagram.com/sla_design_/',
                    icon: (props: any) => (
                        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                            <path
                                fillRule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ),
                },
                // {
                //     name: 'Twitter',
                //     href: '#',
                //     icon: (props) => (
                //         <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                //             <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                //         </svg>
                //     ),
                // },
                // {
                //     name: 'GitHub',
                //     href: '#',
                //     icon: (props) => (
                //         <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                //             <path
                //                 fillRule="evenodd"
                //                 d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                //                 clipRule="evenodd"
                //             />
                //         </svg>
                //     ),
                // },
                // {
                //     name: 'YouTube',
                //     href: '#',
                //     icon: (props) => (
                //         <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                //             <path
                //                 fillRule="evenodd"
                //                 d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                //                 clipRule="evenodd"
                //             />
                //         </svg>
                //     ),
                // },
            ]
        },
        mainNavigation: {
            categories: [
                {
                    name: 'Catalog',
                    featured: []
                }
            ],
            pages: [
                { name: 'Company', href: '#' },
                { name: 'Stores', href: '#' },
            ],
        },
        about: 'About',
        addToCard: 'Add to Cart',
        welcomeMessage: 'Welcome to the',
        seeMore: 'See More',
        landingPhrase: '...where fashion and love come together. Find your unique fashion detail with us.',
        rightsReserved: 'All rights reserved.',
        shopByCategory: 'Shop by category',
        shoppingCart : 'Shopping Cart',
        itemsInYourShoppingCart : 'Items in your shopping cart',
        quantity: 'Quantity',
        close: 'Close',
        remove: 'Remove',
        continueToPayment: 'Continue to Payment',
        checkoutPageLink: 'checkout',
        orderTotal : 'Order total',
        shipping: 'Shipping',
        subtotal: 'Subtotal',
        orderSummary: 'Order summary',
        addProductSuccess: 'Successfully added: ',
        contactInformation: "Contact Information",
        emailAddress: "Email address",
        phoneNumber: "Phone Number",
        firstName: "First Name",
        lastName: "Last Name",
        address: "Address",
        apartment: "Apartment, suite, etc.",
        country: "Country",
        city: "City",
        postalCode: "Postal code",
        shippingAddress: "Shipping address",
        willBeCharged: "You will be charged on delivery.",
        checkout: "Checkout",
        invalidField: "Field is invalid!",
        confirmationTitle: "Successful order!",
        confirmationDescription: "Thank you for your order! We've received your order, and we'll process it shortly.",
        confirmationPageButton: "Back to home page",
        proceedToConfirmation: "Checkout",
        benefits: [
            {
                name: 'Free shipping',
                imageSrc: '/icon-delivery-light.svg',
                description:
                    "Order now and delivery is free for all orders worth 5000 dinars or more within the territory of Serbia. For orders below that amount, the best shipping price of the delivery company is applied. Free shipping applies only to the territory of Serbia",
            },
            {
                name: 'Guaranteed quality',
                imageSrc: '/icon-warranty-light.svg',
                description:
                    "With years of experience in the industry, we proudly offer high-quality products that come with an exceptionally long-term warranty, providing you with security and reliability in every purchase.",
            },
            {
                name: 'Satisfaction guarantee.',
                imageSrc: '/icon-returns-light.svg',
                description:
                    'We understand that when your product arrives, you might not particularly like it, or you may have ordered the wrong item. In such cases, we offer a return option.',
            },
            {
                name: 'Natural Elegance',
                imageSrc: '/icon-planet-light.svg',
                description:
                    "With pride, we emphasize that only high-quality natural materials are used in our manufacturing process to ensure environmental sustainability and provide you with top-quality products.",
            },
        ],
        aboutPage: {
            imgText1: 'Creation with the soul of a biochemist.',
            imgText2: 'Fashion with heart, for a life with style...',
            p1: 'Hello! My name is Slavica, and I would like to share my story with you. I was born and raised in the beautiful city of Novi Sad, where I attended Gymnasium. I have always been curious and passionate about chemistry and natural sciences, and this interest led me to study at the Faculty of Mathematics, with a special focus on biochemistry.',
            p2: 'Obtaining a degree in biochemistry was a great achievement for me, but my life was not limited to academic success alone. I have always been a creative soul, with a passion for art and design. To fulfill my creative ambitions, I started making fashion accessories as a hobby.',
            p3: "Over time, my hobby evolved into something more. The Sladesign brand was born, featuring innovative and unique fashion accessories that I design and create myself. What particularly fulfills me is the ability to turn my passion into a profession. Sladesign stands out for its originality and quality. My products attract attention with their unique design and meticulous craftsmanship.",
        }
    }
}