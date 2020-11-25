import history from './../history';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
  } from "react-router-dom";
import axios from 'axios';

function DashboardOrderUser() {
    let { id_user } = useParams();

    const [allOder, setAllOder] = useState([]);

    const getAllOrder = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/order')
        .then(res => {
            const order = res.data;
            console.log(order);
            setAllOder(order);
        })
    }

    useEffect(() => {
        getAllOrder();
    }, []);

    return (
        <div class="container mt-5">
            <div class="row shadow-lg p-5 bg-white rounded">
                <div class="col-12 mb-3">
                    <h2 class="display-4">All Order</h2>
                </div>
                <div class="col-12 ml-4">
                    <div class="row mb-4">
                    {
                        allOder.filter(order => order.user_id == id_user).map(o => (
                            <div class="col-11 shadow p-3 ml-4 mr-4 mb-4 mt-3 bg-white rounded">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <h5>Order id : {o.id}</h5>
                                            <p class="card-text">by User id : {id_user}</p>
                                        </div>
                                        <div class="col-6 mt-2 text-right">
                                            <button type="button" class="btn btn-info" onClick={() => history.push('/DashboardProductInOrder/'+id_user+'/'+o.id)}>info</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardOrderUser;