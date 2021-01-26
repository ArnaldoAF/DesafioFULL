import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import List from './pages/List';

function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={List} exact/>
                <Route path="/title" component={List} exact/>
                <Route path="/title/:id" component={List} exact/>
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            
        </BrowserRouter>
    )
}

export default Router;
