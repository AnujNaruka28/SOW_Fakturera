import { useState } from 'react';
import '../../../styles/login.css';
import {useForm} from 'react-hook-form';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from '../../../context/TranslationContext';
import { Spin } from 'antd';

const Login = () => {

    const {register,handleSubmit,formState: {errors}} = useForm({
        defaultValues:{
            email: "",
            password: ""
        }
    });
    const [hidePassword,setHidePassword] = useState(true);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const submitAction = async (data) => {

        setLoading(true);
        try {

            const response = await apiService.login(data.email, data.password);

            if(response?.data) {
                localStorage.setItem("access_token", response.data);
                apiService.setToken(response.data);
            }
            toast.success('Login Successful')
            navigate('/dashboard/pricelist');
            
        } catch (error) {
            console.log(error)
            toast.error('Login Failed');
        } finally {
            setLoading(false);
        }
    }
    const {t} = useTranslation();
    const toggleViewPass = () => setHidePassword((prev) => (!prev)); 
    return (
        <main className='login-box'>
            <div className='login-form'>
                <form method="post" onSubmit={handleSubmit(submitAction)}>
                    <header className='login-header'>
                        {t("auth.login")}
                    </header>
                    <section className='login-section'>
                        <div className='login-email'>
                            <label htmlFor='email'>
                                {t("auth.email.label")}
                            </label>
                            <input type="email" placeholder={t("auth.email.placeholder")} autoComplete='on' name='email' id='email' className='login-input-email' 
                            {...register('email',{required:true})}/>
                            {errors.email && <span className='error-login'>{t("auth.email.error")}</span>}
                        </div>
                        <div className='login-password'>
                            <label htmlFor='password'>
                                {t("auth.password.label")}
                            </label>
                            <div id='password-input-box'>
                                <input name='password' id='password' placeholder={t("auth.password.placeholder")} className='login-input-password' 
                                {...register('password',{required:true})} type={hidePassword ? 'password' : 'text' }/>
                                {
                                    (hidePassword) ?  
                                    <VscEye className='eye-icon' onClick={() => toggleViewPass()}/> 
                                        : 
                                    <VscEyeClosed className='eye-icon'onClick={() => toggleViewPass()}/>
                                }
                            </div>
                            {errors.password && <span className='error-login'>{t("auth.password.error")}</span>}
                        </div>
                    </section>
                    <div className='form-login-btn-container'>
                        <button className='login-btn' type='submit'>
                            {
                                loading ? <Spin size='small'/> : t("auth.login")
                            }
                        </button>
                    </div>
                </form>

                <section id='footer-login'>
                    <Link to={'/register'} className='login-anchor'>
                        {t("auth.register")}
                    </Link>
                    <Link to={'/forgot-password'} className='login-anchor'>
                        {t("auth.forgotPassword")}?
                    </Link>
                </section>
            </div>
        </main>
    )

}

export default Login;