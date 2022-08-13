import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './App.css';
import {GET_ALL_USER, DELETE_USER} from "./components/QueryAndmutation";
import {useMutation, useLazyQuery} from '@apollo/client';


export default function Home() {

    const navigate=useNavigate();
    // const {loading,error,data} = useQuery(GET_USER);
    const [loadUsers, {loading, error, data}] = useLazyQuery(GET_ALL_USER);
    // const [deleteUser] = useMutation(DELETE_USER, {
    //     refetchQueries: [
    //         {query: GET_ALL_USER},
    //         'users'
    //     ], fetchPolicy: "no-cache"
    // });

    const [deleteUser] = useMutation(DELETE_USER, {
        update(cache, {data: {deleteUser}}) {
            const {users} = cache.readQuery({query: GET_ALL_USER});
            cache.writeQuery({
                query: GET_ALL_USER,
                data: {users: users.filter(user => user.id !== deleteUser.id)}
            });
        },fetchPolicy: "no-cache"
    });

    const handleClick = async (user) => {
        let variables = {
            id: user.id
        };
        await deleteUser({
            variables: {
                removeUser: variables
            }
        })
    };

    useEffect(() => {
        loadUsers();
    }, [deleteUser]);

    return (
        <div className="container">
            <h5 className="text-primary" onClick={()=>navigate('/login')}>
              {!localStorage.getItem("token") && "Click here to Log in .."}
            </h5>
            {(!data || loading) ? "Loading...":
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        LIST OF USERS
                    </h3>
                    <div className='button-container'>
                    <h4><Link to="/create">Add User</Link></h4>
                    <h5><button className='btn btn-danger' onClick={()=> {localStorage.clear(); navigate('/login')}}>Log Out</button></h5>
                </div>
                </div>
                <div className="panel-body">
                    <table className="table table-stripe">
                        <thead>
                        <tr>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && (data.users||[]).map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td><button className="btn btn-primary">Edit</button></td>
                                <td>
                                    <div className="btn btn-primary" onClick={() => handleClick(user)}>Delete</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
            {error && `Error! ${error.message}`}
        </div>
    )
        ;
}

