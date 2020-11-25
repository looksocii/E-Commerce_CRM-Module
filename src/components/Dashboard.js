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

function Dashboard() {
    const [allUser, setAllUser] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [allShop, setAllShop] = useState([]);

    const getAllUser = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/user')
            .then(res => {
                const persons = res.data;
                setAllUser(persons);
            })
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/product')
            .then(res => {
                const products = res.data;
                setAllProduct(products);
            })

        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/shop')
            .then(res => {
                const shops = res.data;
                setAllShop(shops);
            })
    }


    useEffect(() => {
        getAllUser();
    }, []);

    return (

        <div class="container">
            <div class="row mt-5">
                <div class="col text-center">
                    <h2>CRM Module DashBoard</h2>
                </div>
            </div>
            <div class="row mt-5">


                <div class="col card bg-white p-4 shadow bg-white rounded">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div class="col-4.8 mt-2">
                                        <h4>Review Service</h4>
                                    </div>

                                    {
                                        allUser.length > 0 && allProduct.length > 0 ?
                                            <div class="col-7.5 ml-2">
                                                <div class="alert alert-success" role="alert">
                                                    Available
                                        </div>
                                            </div> :
                                            <div class="col-7.5 ml-2">
                                                <div class="alert alert-danger" role="alert">
                                                    Unavailable
                                        </div>
                                            </div>
                                    }



                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <table class="table">
                                <thead>
                                    {
                                        allUser.length > 0 && allProduct.length > 0 ?
                                            <tr>
                                                <th scope="col">login by username</th>
                                                <th scope="col">view all product</th>
                                            </tr> :
                                            <tr><th scope="col">No Data</th></tr>
                                    }
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {
                                                allProduct.length > 0 ?
                                                    allUser.map((user) => <li><Link to={{ pathname: '/DashboardOrderUser/' + user.id }} >{user.userName}</Link></li>) :
                                                    <br />
                                            }
                                        </td>
                                        <td>
                                            {
                                                allUser.length > 0 ?
                                                    allProduct.map((product) => <li><Link to={{ pathname: '/ProductDetail/' + product.product_id }} >{product.productName}</Link></li>) :
                                                    <br />
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                <div class="col card bg-white p-4 ml-3 shadow bg-white rounded">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div class="col-4.8 mt-2">
                                        <h4>Chat Service</h4>
                                    </div>

                                    {
                                        allUser.length > 0 && allShop.length > 0 ?
                                            <div class="col-7.5 ml-2">
                                                <div class="alert alert-success" role="alert">
                                                    Available
                                        </div>
                                            </div> :
                                            <div class="col-7.5 ml-2">
                                                <div class="alert alert-danger" role="alert">
                                                    Unavailable
                                        </div>
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <table class="table">
                                <thead>
                                    {
                                        allUser.length > 0 && allShop.length > 0 ?
                                            <tr>
                                                <th scope="col">login by username</th>
                                                <th scope="col">login by shop</th>
                                            </tr> :
                                            <tr><th scope="col">No Data</th></tr>
                                    }
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {
                                                allShop.length > 0 ?
                                                    allUser.map((user) => <li><Link to={{ pathname: '/DashboardStore/' + user.id }} >{user.userName}</Link></li>) :
                                                    <br />
                                            }
                                        </td>
                                        <td>
                                            {
                                                allUser.length > 0 ?
                                                    allShop.map((shop) => <li><Link to={{ pathname: '/Chat/' + shop.shop_id }} >{shop.shopName}</Link></li>) :
                                                    <br />
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                <div class="col card bg-white p-4 ml-3 shadow bg-white rounded">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div class="col-4.8 mt-2">
                                        <h4>Question Service</h4>
                                    </div>

                                    {
                                        allUser.length > 0 && allShop.length > 0 ?
                                            <div class="col-7.5 ml-2">
                                                <div class="alert alert-success" role="alert">
                                                    Available
                                        </div>
                                            </div> :
                                            <div class="col-7.5 ml-2">
                                                <div class="alert alert-danger" role="alert">
                                                    Unavailable
                                        </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <table class="table">
                                <thead>
                                    {
                                        allUser.length > 0 && allShop.length > 0 ?
                                            <tr>
                                                <th scope="col">login by username</th>
                                                <th scope="col">login by shop</th>
                                            </tr> :
                                            <tr><th scope="col">No Data</th></tr>
                                    }
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {
                                                allShop.length > 0 ?
                                                    allUser.map((user) => <li><Link to={{ pathname: '/DashboardQuestionUser/' + user.id }} >{user.userName}</Link></li>) :
                                                    <br />
                                            }
                                        </td>
                                        <td>
                                            {
                                                allUser.length > 0 ?
                                                    allShop.map((shop) => <li><Link to={{ pathname: '/DashboardQuestionStore/' + shop.shop_id }} >{shop.shopName}</Link></li>) :
                                                    <br />
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Dashboard;