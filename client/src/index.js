import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Create from './components/Create';
import LogIn from "./components/LogIn";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache({
        typePolicies: {
            User: {
                fields: {
                    firstName: {
                        read(firstName) {
                            return firstName.toUpperCase();
                        }
                    }
                }
            }
        }
    })
});
//The field policy above defines a read function that specifies what the cache returns whenever User.firstName is queried.

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/' element={<App/>}/>
                <Route path='/create' element={<Create/>}/>
            </Routes>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
