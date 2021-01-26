import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserHeader from './components/UserHeader';


import List from './pages/List'; 
import Title from './pages/Title'; 

function Router() {
    return(
        <>
        <UserHeader />
        <BrowserRouter>
            <Switch>
                <Route path="/" component={List} exact/>
                <Route path="/title" component={Title} exact/>
                <Route path="/title/:id" component={Title} exact/>
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            
        </BrowserRouter>
        </>
    )
}

export default Router;
