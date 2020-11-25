import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Dashboard from './components/Dashboard';
import DashboardOrderUser from './components/DashboardOrderUser';
import DashboardProductInOrder from './components/DashboardProductInOrder';
import ReviewPage from './components/ReviewPage';
import DashboardStore from './components/DashboardStore';
import DashboardQuestionUser from './components/DashboardQuestionUser';
import DashboardQuestionStore from './components/DashboardQuestionStore';
import Chat from './components/Chat';
import ProductDetail from './components/ProductDetail';
import Question from './components/Question';
import Comment from './components/Comment';
import history from './history';
import Chatuser from './components/Chatuser';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/DashboardOrderUser/:id_user" component={DashboardOrderUser} />
                    <Route path="/DashboardProductInOrder/:id_user/:id_order" component={DashboardProductInOrder} />
                    <Route path="/ReviewPage/:id_user/:id_order/:id_product" component={ReviewPage} />
                    <Route path="/DashboardStore/:id_user" component={DashboardStore} />
                    <Route path="/DashboardQuestionUser/:id_user" component={DashboardQuestionUser} />
                    <Route path="/DashboardQuestionStore/:id_store" component={DashboardQuestionStore} />
                    <Route path="/Chat/:id_store" component={Chat} />
                    <Route path="/Chatuser/:id_user/:id_store" component={Chatuser} />
                    <Route path="/ProductDetail/:id_product" component={ProductDetail} />
                    <Route path="/Question/:id_user/:id_product" component={Question} />
                    <Route path="/Comment/:id_store/:id_product" component={Comment} />
                </Switch>
            </Router>
        )
    }
};