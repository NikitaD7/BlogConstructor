import React, {useEffect, useState} from 'react';

function LoginForm({userLogin, isLogged, onLogIn, onLogOut}) {
    const [login, setLogin] = useState("user");
    const [password, setPassword] = useState("password");

    useEffect(() => {
        fetch("/get_my_user_name")
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        if (data && data.username) {
                            onLogIn(data.username);
                        }
                    });
                }
            });
    });

    if (isLogged) {
        return (
            <div align="right">
                <label>{userLogin}</label>
                <button onClick={() => {
                    fetch("/logout")
                        .then(response => {
                            if (response.ok) {
                                onLogOut();
                            }
                        });
                }}>
                    Log out
                </button>
            </div>
        );
    } else {
        return (
            <div align="right">
                <div>
                    <label>
                        Login:
                        <input type="text"
                               name="login"
                               value={login}
                               onChange={event => setLogin(event.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>Password:
                        <input type="password"
                               name="password"
                               value={password}
                               onChange={event => setPassword(event.target.value)}/>
                    </label>
                </div>
                <div>
                    <button onClick={() => {
                        const loginWithLogin = login;
                        const loginWithPassword = password;

                        fetch("/login", {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            method: "POST",
                            body: "username=" + encodeURIComponent(loginWithLogin) + "&password=" + encodeURIComponent(loginWithPassword)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    window.alert("Incorrect login or password.");
                                } else {
                                    onLogIn(loginWithLogin);
                                }
                            });
                    }}>
                        Log in
                    </button>
                </div>
            </div>
        );
    }
}

export default LoginForm;