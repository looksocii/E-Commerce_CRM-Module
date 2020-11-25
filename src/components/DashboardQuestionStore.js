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

function DashboardQuestionStore() {
    let { id_store} = useParams();

    const [allProduct, setAllProduct] = useState([]);

    const getAllProduct = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/product')
        .then(res => {
            const products = res.data;
            setAllProduct(products.filter(p => p.shop_id == id_store));
        })
    }

    useEffect(() => {
        getAllProduct();
    }, []);


    return (
        <div class="container mt-5">
            <div class="row shadow-lg p-5 bg-white rounded">
                <div class="col-12 mb-3">
                <h2 class="display-4">All Product</h2>
                </div>
                <div class="col-12 ml-4">
                    <div class="row mb-4">
                    {
                        allProduct.map(p => (

                                <div class="col-3 shadow p-1 m-4 bg-white rounded">
                                    <img src={p.picture} class="card-img-top"/>
                                    <div class="card-body text-center">
                                        <p class="card-text">{ p.productName }</p>
                                            <div class="text-center">
                                                <br/>
                                                <button type="button" class="btn btn-info btn-lg btn-block" onClick={() => history.push('/Comment/'+ id_store +'/'+p.product_id)}>Answer</button>
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

export default DashboardQuestionStore;