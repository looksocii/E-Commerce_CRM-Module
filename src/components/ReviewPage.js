import { useEffect, useState } from 'react';
import photo from '../image/marshall1.jpg';
import styles from '../styles/review.module.css';
import StarRatings from 'react-star-ratings';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import axios from 'axios';
import history from './../history';

function ReviewPage() {
    let { id_product, id_user, id_order } = useParams();
    const [allProduct, setAllProduct] = useState([]);
    const [allReview, setAllReview] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);


    const submitMess = () => {
        const data = {
            "content": text,
            "product_id": id_product,
            "user_id": id_user,
            "rank": rating
        }
        axios.post('http://localhost:5001/sop-backup/us-central1/app/api/createreview', data)
            .then(res => {
                console.log("Successisad")
                setText('')
                history.push('/DashboardProductInOrder/' + id_user + '/' + id_order)
            })

    }

    const changeText = (txt) => {
        setText(txt.target.value);
    }

    const changeRating = (newRating, name) => {
        setRating(newRating);
    }

    const getAllProduct = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/product')
            .then(res => {
                const products = res.data;
                setAllProduct(products.find(product => product.product_id == id_product));
            })
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/review')
            .then(res => {
                const reviews = res.data;
                setAllReview(reviews.filter(r => r.product_id == id_product));
            })
    }

    useEffect(() => {
        getAllProduct();
    }, []);
    return (
        <div class="container mt-5">
            <div class="row shadow-lg p-5 bg-white rounded">
                <div class="col-sm">
                    <img src={allProduct.picture} alt="Logo" className={styles.product} />
                </div>
                <div class="col-sm">
                    <br />
                    <br />
                    <p className={styles.productname}>{allProduct.productName}
                    </p>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <p className={styles.price}>฿ {allProduct.price}</p>
                    <div class="form-group text-center">
                        <StarRatings
                            rating={rating}
                            starRatedColor="orange"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                        /><br /><br />
                        <div class="text-left">
                            <label for="exampleFormControlTextarea1">พิมพ์คำถาม</label><br />
                        </div>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Type here.." onChange={changeText}></textarea>
                        <br />
                        <div class="text-left">
                            <button type="button" class="btn btn-info" onClick={submitMess}>SEND</button>
                        </div>

                    </div>
                    {
                        allReview.map(r => (
                            <div class="card text-white bg-dark mb-3" >
                                <div class="card-header" >
                                    <StarRatings
                                        rating={r.rank}
                                        starRatedColor="orange"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="30px"
                                    />
                                </div>
                                <div class="card-body">
                                    <p class="card-text">{r.content}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ReviewPage;