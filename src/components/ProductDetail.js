import styles from '../styles/prodetail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from '../image/marshall1.jpg';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import history from './../history';
import axios from 'axios';

function ProductDetail() {
    let { id_product } = useParams();
    const [allProduct, setAllProduct] = useState([]);
    const [allReview, setAllReview] = useState([]);
    const [allQ, setAllQ] = useState([]);
    const [allC, setAllC] = useState([]);
    const [rating, setRating] = useState(0);

    const getAllUser = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/product')
            .then(res => {
                const products = res.data;
                setAllProduct(products.find(product => product.product_id == id_product));
            })
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/review')
            .then(res => {
                const reviews = res.data;

                if (reviews.filter(r => r.product_id == id_product).length > 0) {
                    setAllReview(reviews.filter(r => r.product_id == id_product));
                    let totalRating = 0;
                    reviews.filter(r => r.product_id == id_product).map(r => totalRating += r.rank);
                    setRating(Math.round((totalRating / reviews.filter(r => r.product_id == id_product).length) * 10) / 10);
                    console.log(totalRating);
                }
                else {
                    setRating(0);
                }

            })
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/question')
            .then(res => {
                const questions = res.data;
                // console.log(questions.filter(q => q.product_id == id_product));
                setAllQ(questions.filter(q => q.product_id == id_product))
            })
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/comment')
            .then(res => {
                const comments = res.data;
                setAllC(comments);
            })
    }

    useEffect(() => {
        setRating(0);
        getAllUser();
    }, []);

    return (
        <div class="container-fluid">

            <div class="row">
                <div class="col-sm" >
                    <img src={allProduct.picture} alt="Logo" className={styles.product} />
                </div>
                <div class="col-sm" className={styles.details}>
                    <p className={styles.productname}>{allProduct.productName}</p>
                    <div class="row">
                        <div class="col-2">
                            <p className={styles.rating} >{rating}/5</p>
                        </div>
                        <div class="col-10">
                            <StarRatings
                                rating={rating}
                                starRatedColor="orange"
                                numberOfStars={5}
                                name='rating'
                                starDimension="30px"
                            />
                        </div>
                    </div>

                    <br />
                    <p class="font-weight-bold">Product Details<br />

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Product Type: Speaker<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Model/Color: Stockwell ll / Black<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Special Features: Multi Host Functionality<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bluetooth 5.0
                    </p>
                    <button type="button" class="btn btn-secondary">CONTACT</button><br /><br />

                    <br /><p className={styles.review}>Review</p>
                    <div class="col-sm-mb5">
                        <div class="" height="500px" width="500px">

                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="dot text-left"></span>
                        </div>
                    </div>
                    <div class="col-sm">

                        {
                            allReview.map(review => (
                                <div class="card text-white bg-warning mb-3 p-3" >
                                    <StarRatings
                                        rating={review.rank}
                                        starRatedColor="black"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="30px"
                                    />
                                    <div class="card-body">
                                        <p class="card-text">{review.content}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>


                    <br />
                    <p className={styles.review}>Question</p>
                    <br />

                    {
                        allQ.map(q => (
                            <div class="card text-white bg-info mb-3">
                                <div class="card-header" >
                                    <h6>Question</h6>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">{q.content}</p>
                                </div>
                                {
                                    allC.filter(c => c.question_id == q.question_id).map(c => (
                                        <div class="card text-white bg-dark m-4" >
                                            <div class="card-header" ><h6>Answer</h6></div>
                                            <div class="card-body">
                                                <p class="card-text">{c.content}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }



                </div>
                <div class="col-sm" >
                    <p className={styles.price} >฿ {allProduct.price}</p>
                    <center>
                        <button type="button" class="btn btn-info m-2">Add to Cart</button>
                        <button type="button" class="btn btn-warning m-2">Pick up at Store</button>
                    </center>
                </div>
            </div>

        </div>

    );
}

export default ProductDetail;