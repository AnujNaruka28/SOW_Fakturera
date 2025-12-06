class TranslationService{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.cache = null;
        this.defaultHeaders = {
            "Content-Type": "application/json"
        };
    }

    async loadTranslations(){
        if(this.cache) return this.cache;

        const res = await fetch(`${this.baseUrl}/translations`,{
            method: "GET",
            headers: this.defaultHeaders
        });
        if(!res.ok) throw new Error("Failed to fetch translations");

        const translations = await res.json();
        const grouped = translations.data.reduce((acc, item) => {
            if(!acc[item.lang]) acc[item.lang] = {};
            acc[item.lang][item.key] = item.value;
            return acc;
        }, {});

        this.cache = grouped;
        return grouped;
    }
    async getLanguage(lang="en"){
        const data = await this.loadTranslations();
        return data[lang] || {};
    }
}

export const translationService = new TranslationService(import.meta.env.VITE_BASE_API_URL);