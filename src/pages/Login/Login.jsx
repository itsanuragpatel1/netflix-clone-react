import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {auth, login,signup} from '../../firebase.js'
import { onAuthStateChanged } from 'firebase/auth/cordova'
import { useNavigate } from 'react-router-dom'
import netflix_spinner from '../../assets/netflix_spinner.gif'



const Login = () => {

    const navigate=useNavigate();


    useEffect(()=>{
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                console.log('logged in');
                navigate('/');
            }else{
                console.log('log out');
                navigate('/login');
            }
        })
    },[])

    const [signState,setSignState]=useState("Sign In");
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);

    const user_auth=async (e)=>{
        e.preventDefault();
        setLoading(true);
        if(signState==='Sign In'){
            await login(email,password);
        }else{
            await signup(fullName,email,password);
        }
        setLoading(false);
    };

  return (
    loading? <div className='login-spinner'> <img src={netflix_spinner} alt="" /> </div> :
    <div className='login'>
        <img src={logo} alt="" className='login-logo' />
        <div className="login-form">
            <h1>{signState}</h1>
            <form action="">
                {signState==='Sign Up'?<input type="text" placeholder='Your Name' value={fullName} onChange={(e)=>{setFullName(e.target.value)}} />:<></>} 
                <input type="email" placeholder='your Email' value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
                <input type="password" name="" id="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <button onClick={(e)=>{user_auth(e)}} type='submit'> {signState} </button>
                <div className="form-help">
                    <div className="remember">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Remember</label>
                    </div>
                    <p>Need Help?</p>
                </div>
            </form>
            <div className="form-switch">
                {signState==='Sign In'? <p>New to Netflix?  <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span> </p> : 
                <p>Already Have account? <span onClick={()=>{setSignState('Sign In')}}>Sign In now</span> </p>
                }
                
                
            </div>
        </div>
    </div>
  )
}

export default Login