import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 初始翻譯內容，後續會擴充
const resources = {
    en: {
        translation: {
            "app.title": "Alien's Freelance Website",
            "hero.title": "Alien's Freelance Website",
            "hero.subtitle": "In this digital age, a professional and attractive corporate website is the cornerstone of your brand's success.",
            "services.static.title": "Static Web",
            "services.vue.title": "Vue.js Development",
            "services.react.title": "React.js Development",
            "services.seo.title": "SEO Optimization",
            "why.title": "Why Choose Us?",
            "cta.title": "Start Your Digital Success Journey!",
            "footer.rights": "© 2026 Alien's Freelance Website. All rights reserved."
        }
    },
    'zh-TW': {
        translation: {
            "app.title": "Alien接案網站",
            "hero.title": "Alien接案網站",
            "hero.subtitle": "在這個數位時代，一個專業且具吸引力的形象網站是您品牌成功的基石。您是否正在尋找一個能完美呈現品牌故事，並有效觸及目標客戶的解決方案？",
            "services.onestop.title": "一條龍架站服務",
            "services.static.title": "靜態網頁 (Static Web)",
            "services.vue.title": "Vue.js 網站開發",
            "services.react.title": "React.js 網站開發",
            "services.seo.title": "搜尋引擎優化 (SEO)",
            "why.title": "為什麼選擇我們？",
            "cta.title": "立即行動，開啟您的數位成功之路！",
            "footer.rights": "© 2026 Alien接案網站. All rights reserved."
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'zh-TW', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
