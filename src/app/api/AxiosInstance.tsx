import axios from 'axios';

const AxoisInstance = axios.create({
    timeout: 10000,
    baseURL: (typeof window === 'undefined' && process.env.API_BASE_URL)
        || 'https://admin.sladesignshop.com/api',
    headers: {
        Locale: 'sr'
    }
});

export default AxoisInstance;
