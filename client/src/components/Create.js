import React, {useState} from 'react';
import {CREATE_USER, GET_ALL_USER} from "./QueryAndmutation";
import {useNavigate} from 'react-router-dom';
import {useMutation} from '@apollo/client';

const Create = () => {

// const [createUser,{data,loading,error}] = useMutation(CREATE_USER)
    const [createUser,{error}] = useMutation(CREATE_USER,{
        refetchQueries: [
            {query: GET_ALL_USER},
            'users'
        ],
    });

    const navigate = useNavigate();
    const [field, setField] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-lastName">
                        ADD USER
                    </h3>
                </div>
                <div className="panel-body">
                    <h4><button className="btn btn-primary" onClick={()=>navigate('/')}>User List</button></h4>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        let variables = {
                            firstName: field.firstName,
                            lastName: field.lastName,
                            email: field.email
                        };
                        await createUser({
                            variables: {
                                userNew: variables
                            }
                        });
                        setField({});
                        navigate("/")
                    }}>
                        <div className="form-group">
                            <label htmlFor="firstName">firstName:</label>
                            <input type="text" className="form-control" name="firstName" value={field.firstName}
                                   onChange={(e) => setField({...field, firstName: e.target.value})}
                                   placeholder="firstName" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">lastName:</label>
                            <input type="text" className="form-control" name="lastName" value={field.lastName}
                                   onChange={(e) => setField({...field, lastName: e.target.value})}
                                   placeholder="lastName" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">email:</label>
                            <input type="email" className="form-control" name="email" value={field.email}
                                   onChange={(e) => setField({...field, email: e.target.value})} placeholder="email" required/>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
                {error && `Error! ${error.message}`}
            </div>
        </div>
    );
};


export default Create;
