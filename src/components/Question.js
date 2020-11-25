import { useEffect, useState } from 'react';
import photo from '../image/marshall1.jpg';
import styles from '../styles/question.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

function Question() {
    let { id_user, id_product } = useParams();
    const [allQ, setAllQ] = useState([]);
    const [allC, setAllC] = useState([]);
    const [text, setText] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [allReview, setAllReview] = useState([]);
    const [rating, setRating] = useState(0);

    const getAllQuestions = () => {
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
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/product')
            .then(res => {
                const products = res.data;
                setAllProduct(products.find(p => p.product_id == id_product));
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
    }
    const submitques = () => {
        const data = {
            "content": text,
            "product_id": id_product,
            "user_id": id_user
        }
        axios.post('http://localhost:5001/sop-backup/us-central1/app/api/createquestion', data)
            .then(res => {
                console.log("Successisad")
                setText('')
                getAllQuestions();
            })

    }

    const changeText = (txt) => {
        setText(txt.target.value);
    }

    useEffect(() => {
        getAllQuestions();
    }, []);

    return (
        <div class="container-fluid" >

            <div class="row">
                <div class="col-sm" >
                    <img src={allProduct.picture} alt="Logo" className={styles.product} />
                    {/* <img src="image/marshall1.jpg" height="450px"> */}
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
                    <br /><br />

                    <p class="font-weight-bold">Product Details
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Product Type: Speaker<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Model/Color: Stockwell ll / Black<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Special Features: Multi Host Functionality<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bluetooth 5.0
                </p>
                    <br /><br />
                    <p class="font-weight-bold">Ask</p>
                    <form>


                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Write your question here.</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={changeText}></textarea>
                        </div>
                        <button type="submit" class="btn btn-warning text-light" onClick={submitques}>Submit</button>
                    </form>


                    <p class="font-weight-bold">Q & A</p>


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
                </div>
            </div>
        </div>
    );
}

export default Question;