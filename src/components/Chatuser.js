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

function Chatuser() {
    let { id_user, id_store } = useParams();

    const [allConnection, setaAllConnection] = useState([]);
    const [allMessage, setallMessage] = useState([]);
    const [allStore, setAllStore] = useState([]);
    const [textMess, setTextMess] = useState('');
    const [connecId, setConnecId] = useState('');

    const changeText = (txt) => {
        setTextMess(txt.target.value);
    }

    const submitMess = () => {
        const data = {
            "connection_id": connecId,
            "from_id": id_user,
            "content": textMess
        }
        axios.post('http://localhost:5001/sop-backup/us-central1/app/api/createmessage', data)
            .then(res => {
                console.log("Successisad")
                getAllConnection()
                setTextMess('')
            })

    }

    const getAllConnection = () => {
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/connection/user/')
            .then(res => {
                const cons = res.data;
                if (cons.find(con => con.shop_id == id_store && con.user_id == id_user)) {
                    setaAllConnection(cons.find(con => con.shop_id == id_store && con.user_id == id_user));

                    axios.get('http://localhost:5001/sop-backup/us-central1/app/api/message')
                        .then(res => {
                            const mes = res.data;
                            setConnecId(cons.find(con => con.shop_id == id_store && con.user_id == id_user).connection_id);
                            setallMessage(mes.filter(mess => mess.connection_id == cons.find(con => con.shop_id == id_store && con.user_id == id_user).connection_id).sort((a, b) => a.date_time > b.date_time ? 1 : -1));
                        })

                } else {
                    const data = {
                        "shop_id": id_store,
                        "user_id": id_user
                    }
                    axios.post('http://localhost:5001/sop-backup/us-central1/app/api/createconnection', data)
                        .then(res => {
                            console.log("Successisad")
                            getAllConnection()
                        })
                }
            })
        axios.get('http://localhost:5001/sop-backup/us-central1/app/api/shop')
            .then(res => {
                const stores = res.data;
                setAllStore(stores.find(s => s.shop_id == id_store));
            })
    }

    useEffect(() => {
        getAllConnection();
    }, []);

    return (
        <div class="container-fluid">

            <div class="row">
                <div class="col-3">
                    <div className={styles.containerchat}>
                        <p className={styles.textleft}>✉ Chat</p>
                    </div>
                    <div className={styles.container2}>
                        <div className={styles.border2}>{allStore.shopName} </div>
                    </div>


                </div>
                <div class="col-lg">
                    {
                        allMessage.map(m =>
                            m.from_id == id_store ?
                                <div className={styles.container1}>
                                    <p>{m.content}</p>
                                    <span className={styles.time_right}>{m.date_time}</span>
                                </div> :
                                <div className={styles.darker}>
                                    <p>{m.content}</p>
                                    <span className={styles.time_left}>{m.date_time}</span>
                                </div>
                        )
                    }
                    <div class="row">
                        <div class="col-sm">
                            {/* <form>
                                <input rows={3} maxLength={50} placeholder="Type here" className={styles.chatbox} type="textarea" name="messages"></input>
                            </form> */}
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control type="areatext" rows={1} onChange={changeText} value={textMess} />
                            </Form.Group>
                            {/* <Input class="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Type here.."> */}
                        </div>
                        <div class="col-1">
                            <Button size="md" className="btn btn-info" onClick={submitMess}>SEND</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatuser;