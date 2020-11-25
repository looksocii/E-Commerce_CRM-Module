import styles from '../styles/styles.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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

function Chat() {
    let { id_store } = useParams();
    const [allConnection, setaAllConnection] = useState([]);
    const [allMess, setaAllMess] = useState([]);
    const [textMess, setTextMess] = useState('');
    const [connecId, setConnecId] = useState('');
    const [mess, setaMess] = useState([]);

    const changeText = (txt) => {
        setTextMess(txt.target.value);
    }

    const submitMess = () => {
        const data ={
            "connection_id": connecId,
            "from_id": id_store,
            "content": textMess
        }
        axios.post('http://localhost:5001/sop-backup/us-central1/app/api/createmessage', data)
        .then(res => {
            console.log("Successisad")
            setTextMess('')
            getMess(connecId);
        })
        
    }

    const getAllConnection = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/connection/shop')
        .then(res => {
            const cons = res.data;
            setaAllConnection(cons.filter(con => con.shop_id == id_store))
        })
    }

    const getMess = (connection_id) => {
        setConnecId(connection_id);
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/message')
        .then(res => {
            const mes = res.data;
            setaAllMess(mes.filter(mess => mess.connection_id == connection_id).sort((a, b) => a.date_time > b.date_time ? 1:-1));
        })
    }

    const getAllMess = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/message')
        .then(res => {
            const mes = res.data;
            setaMess(mes);
        })
    }

    useEffect(() => {
        getAllConnection();
        getAllMess();
    }, []);

    return (
        <div class="container-fluid">
        <div class="row">
                <div class="col-3">
                    <div className={styles.containerchat}>
                        <p className={styles.textleft}>✉ Chat</p>
                    </div>
                    {

                        allConnection.map(con => (
                            mess.filter(m => m.connection_id == con.connection_id).length > 0 ?
                            
                            connecId == con.connection_id ?
                            <div className={styles.container1} onClick={() => getMess(con.connection_id)}>
                                <div className={styles.border2}>{con.user_id} </div>
                            </div> :
                            <div className={styles.container2} onClick={() => getMess(con.connection_id)}>
                                <div className={styles.border2}>{con.user_id} </div>
                            </div> 
                            : <p> </p>
                        ))

                    }            
                </div>

                <div class="col-lg">

                    {
                        allMess.map(m => 
                            m.from_id == id_store ?
                            <div className={styles.darker}>
                                <p>{m.content}</p>
                                <span className={styles.time_left}>{m.date_time}</span>
                            </div> :
                            <div className={styles.container1}>
                                <p>{m.content}</p>
                                <span className={styles.time_right}>{m.date_time}</span>
                            </div>

                        )
                    }

                    {
                        allMess.length > 0 ?
                        <div class="row">
                            <div class="col-sm">
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control type="areatext" rows={1} onChange={changeText} value={textMess}/>
                                </Form.Group>
                            </div>
                            <div class="col-1">
                                <Button size="md" className="btn btn-info" onClick={submitMess}>SEND</Button> 
                            </div>
                        </div> :
                        <p></p>
                    } 
                    

                </div>
        </div>
    </div>
    );
  }
  
  export default Chat;