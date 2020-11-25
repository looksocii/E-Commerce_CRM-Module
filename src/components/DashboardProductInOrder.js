import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import history from './../history';
import axios from 'axios';

function DashboardProductInOrder() {
    let { id_user, id_order } = useParams();
    const [allOder, setAllOder] = useState([]);
    const [allReview, setAllReview] = useState([]);
    const [allProduct, setAllProduct] = useState([]);

    const getAllOrder = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/review')
            .then(res => {
                const reviews = res.data;
                setAllReview(reviews);
            })

        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/order')
            .then(res => {
                const orders = res.data;
                setAllOder(orders.filter(o => o.id == id_order));
            })
    }

    useEffect(() => {
        getAllOrder();
    }, []);

    return (
        <div class="container mt-5">
            <div class="row shadow-lg p-5 bg-white rounded">
                <div class="col-12 mb-3">
                    <h2 class="display-4">All Product in Oder id : {id_order}</h2>
                </div>
                <div class="col-12 ml-4">
                    <div class="row mb-4">
                        {
                            allOder.map(o => (
                                (o.product.map(p => (
                                    <div class="col-3 shadow p-1 m-4 bg-white rounded">
                                        <img src="https://urangfurniture.com/img/product-img/pro-big-1.jpg" class="card-img-top" />
                                        <div class="card-body text-center">
                                            <p class="card-text">{p}</p>
                                            {
                                                allReview.find(r => r.user_id == id_user && r.product_id == p)
                                                    ?
                                                    <div class="text-center">
                                                        <br />
                                                        <button type="button" class="btn btn-outline-secondary btn-lg btn-block">Reviewed</button>
                                                    </div>
                                                    :
                                                    <div class="text-center">
                                                        <br />
                                                        <button type="button" class="btn btn-info btn-lg btn-block" onClick={() => history.push('/ReviewPage/' + id_user + '/' + id_order + '/' + p)}>Review</button>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                )))
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardProductInOrder;