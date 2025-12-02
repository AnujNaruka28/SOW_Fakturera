import { Link } from 'react-router-dom';
import '../../../styles/terms.css';

const Terms = () => {

    const termsText = [
        <>
            <b>BY</b> clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.
        </>,
        '',
        '',
        '',

    ];

    return (
        <main className="terms-main">
            <div className='terms-inner'>
                <header className='terms-header'>
                    Terms
                </header>
                <Link to={'/'} className='terms-close'>
                    Close and Go Back
                </Link>
                <section className='terms-text'>
                    {
                        termsText.map((txt,i) => (
                            <p key={i}>
                                {txt}
                            </p>
                        ))
                    }
                </section>
            </div>
        </main>
    );
}

export default Terms;