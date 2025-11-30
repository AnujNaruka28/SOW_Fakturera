import { useState } from 'react';
import '../../../styles/login.css';
import {useForm} from 'react-hook-form';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link } from 'react-router-dom';

const Login = () => {

    const {register,handleSubmit,formState: {errors}} = useForm({
        defaultValues:{
            email: "",
            password: ""
        }
    });
    const [hidePassword,setHidePassword] = useState(true);
    const submitAction = (data) => console.log(data); 

    const toggleViewPass = () => setHidePassword((prev) => (!prev)); 
    return (
        <main className='login-box'>
            <div className='login-form'>
                <form method="post" onSubmit={handleSubmit(submitAction)}>
                    <header className='login-header'>
                        Log In
                    </header>
                    <section className='login-section'>
                        <div className='login-email'>
                            <label htmlFor='email'>
                                Enter your email address
                            </label>
                            <input type="email" placeholder='Email address' autoComplete='on' name='email' id='email' className='login-input-email' 
                            {...register('email',{required:true})}/>
                            {errors.email && <span className='error-login'>Please enter a valid email address</span>}
                        </div>
                        <div className='login-password'>
                            <label htmlFor='password'>
                                Enter your password
                            </label>
                            <div id='password-input-box'>
                                <input name='password' id='password' placeholder='Password' className='login-input-password' 
                                {...register('password',{required:true})} type={hidePassword ? 'password' : 'text' }/>
                                {
                                    (hidePassword) ?  
                                    <VscEye className='eye-icon' onClick={() => toggleViewPass()}/> 
                                        : 
                                    <VscEyeClosed className='eye-icon'onClick={() => toggleViewPass()}/>
                                }
                            </div>
                            {errors.password && <span className='error-login'>This field cannot be empty</span>}
                        </div>
                    </section>
                    <div className='form-login-btn-container'>
                        <button className='login-btn' type='submit'>
                            Log In
                        </button>
                    </div>
                </form>

                <section id='footer-login'>
                    <Link to={'/register'} className='login-anchor'>
                        Register
                    </Link>
                    <Link to={'/forgot-password'} className='login-anchor'>Forgot Password?</Link>
                </section>
            </div>
        </main>
    )

}

export default Login;