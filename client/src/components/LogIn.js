import React, {useState, useEffect} from 'react';
import {CHECK_ADMIN} from "./QueryAndmutation";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();
    const [field, setField] = useState({});
    const logincheck = () => {
        localStorage.getItem("token")
        return navigate("/")
    };
    const [logIn, setLogIn] = useState(false);

    const [checkAdmin, {error}] = useMutation(CHECK_ADMIN, {onCompleted: logincheck});


    useEffect(() => {
    }, [checkAdmin]);

    return (
        <div className="container">
            <h6 className="text-primary" onClick={()=>setLogIn(true)}>
               {!logIn && " Click here to create admin .."}
            </h6>
            <div className="panel panel-default">
                {logIn ?
                    <div className="panel-body">
                        <h4>Register</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">email:</label>
                                <input type="email" className="form-control" name="email" value={field.email}
                                       onChange={(e) => setField({...field, email: e.target.value})}
                                       placeholder="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">password:</label>
                                <input type="password" className="form-control" name="password" value={field.password}
                                       onChange={(e) => setField({...field, password: e.target.value})}
                                       placeholder="password" required/>
                            </div>
                            <button type="submit" className="btn btn-success">Register</button>
                        </form>
                    </div>
                    :
                    <div className="panel-body">
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            let variables = {
                                email: field.email,
                                password: field.password
                            };
                            await checkAdmin({
                                variables: {
                                    newAdmin: variables
                                }
                            }).then(res => localStorage.setItem("token", res.data.checkAdmin.token))
                        }}>
                            <div className="form-group">
                                <label htmlFor="email">email:</label>
                                <input type="text" className="form-control" name="email" value={field.email}
                                       onChange={(e) => setField({...field, email: e.target.value})}
                                       placeholder="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">password:</label>
                                <input type="password" className="form-control" name="password" value={field.password}
                                       onChange={(e) => setField({...field, password: e.target.value})}
                                       placeholder="password" required/>
                            </div>
                            <button type="submit" className="btn btn-success">LogIn</button>
                        </form>
                        {error && `Error! ${error.message}`}
                    </div>
                }
            </div>
        </div>
    )
}
