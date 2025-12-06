import { Link } from 'react-router-dom';
import '../../../styles/terms.css';
import { useTranslation } from '../../../context/TranslationContext';

const Terms = () => {

    const {t,translations} = useTranslation();
    const termKeys = Object.keys(translations)
                     .filter(k => k.startsWith("terms.p"))
                     .sort((a, b) => {
                        // extract numbers to sort properly
                        const numA = Number(a.split("p")[1]);
                        const numB = Number(b.split("p")[1]);
                        return numA - numB;
                    });
    const termsText = [...termKeys.map((key) => t(key))];

    return (
        <main className="terms-main">
            <div className='terms-inner'>
                <header className='terms-header'>
                    {t("terms.title")}
                </header>
                <Link to={'/'} className='terms-close'>
                    {t("terms.button.back")}
                </Link>
                <section className='terms-text'>
                    {
                        termsText.map((txt,i) => (
                            <p key={i} className={`${(i == 3) && 'top-margin-p-term'} ${(i == 4) && 'bottom-margin-p-term'}`}>
                                {txt}
                            </p>
                        ))
                    }
                </section>
                <Link to={'/'} className='terms-close-bottom'>
                    {t("terms.button.back")}
                </Link>
            </div>
        </main>
    );
}

export default Terms;