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

function DashboardStore() {

    let { id_user } = useParams();

    const [allStore, setAllStore] = useState([]);

    const getAllStore = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/shop')
        .then(res => {
            const stores = res.data;
            setAllStore(stores);
        })
    }

    useEffect(() => {
        getAllStore();
    }, []);

    return (
        <div class="container mt-5">
            <div class="row shadow-lg p-5 bg-white rounded">
                <div class="col-12 mb-3">
                    <h2 class="display-4">Shop</h2>
                </div>
                <div class="col-12 ml-3 mb-4">
                    <div class="row ml-5">
                    {
                        allStore.map(o => (
                            <div class="col-3 shadow p-3 m-4 bg-white rounded">
                                <div class="card-body">
                                    <h6>{o.shopName}</h6>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <button type="button" class="btn btn-info" onClick={() => history.push('/Chatuser/'+id_user+'/'+o.shop_id)}>Chat</button>
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

  export default DashboardStore;