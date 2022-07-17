import React from 'react';

const Login = (props) => {
    const { 
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        register,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        username,
        setUsername,
        isCompany,
        setIsCompany
    } = props

    const handleChange = event => {
        if(event.target.checked) {
            setIsCompany(true)
        } else {
            setIsCompany(false)
        }
    }


    return (
        <section className = "login">
            <div className = "loginContainer">
                {hasAccount ? (
                    <>
                        <label>Email</label>
                        <input
                            type = "text"
                            autoFocus
                            required
                            value = {email}
                            onChange = {(event)=> setEmail(event.target.value)}>
                        </input>
                        <p className = "errorMsg">{emailError}</p>
                        <label>Password</label>
                        <input 
                            type = "password"
                            required
                            value = {password}
                            onChange = {(event) => setPassword(event.target.value)}>
                        </input>
                        <p className = "errorMsg">{passwordError}</p>
                    </>
                ) : (
                    <>
                        <label>Email</label>
                        <input
                            type = "text"
                            autoFocus
                            required
                            value = {email}
                            onChange = {(event)=> setEmail(event.target.value)}>
                        </input>
                        <p className = "errorMsg">{emailError}</p>
                        <label>Username</label>
                        <input
                            type = "text"
                            autoFocus
                            required
                            value = {username}
                            onChange = {(event)=> setUsername(event.target.value)}>
                        </input>
                        <label>Password</label>
                        <input 
                            type = "password"
                            required
                            value = {password}
                            onChange = {(event) => setPassword(event.target.value)}>
                        </input>
                        <p className = "errorMsg">{passwordError}</p>
                        <label>Check box if you are a company
                            <input type = "checkbox" value = {isCompany} onChange = {handleChange}></input>
                        </label>
                    </>
                )}
                <div className = "btnContainer">
                    {hasAccount ? (
                        <>
                        <button onClick = {handleLogin}>Sign in</button>
                        <p>Don't have an account? <span onClick = {() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick = {register}>Sign up</button>
                        <p>Have an account? <span onClick = {() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;