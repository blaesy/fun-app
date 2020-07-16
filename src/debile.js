import React from 'react';
import Axios from 'axios';

const Debile = () => {

    const [data, setData] = React.useState([]);
    const [newData, setNewData] = React.useState('');

    const newNewestData = (e) => {
        setNewData(e.target.value);
    }

    const addNewData = (e) => {
        e.preventDefault();
        //setData(data => [...data, newData]);
        saveData();
    }

    const loadData = () => {
        Axios.get('https://cors-anywhere.herokuapp.com/' + process.env.REACT_APP_BASE_URL + 'rest/debile', {
            headers: { 
                'cache-control': 'no-cache',
                'x-apikey': process.env.REACT_APP_API_KEY
            }
        }).then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.log('Nie zaladowalo');
        })
    }

    console.log(data);

    React.useEffect(() => loadData(), []);

    const saveData = () => {
        Axios.post('https://cors-anywhere.herokuapp.com/' + process.env.REACT_APP_BASE_URL + 'rest/debile', {imie: newData}, {
            headers: { 
                'cache-control': 'no-cache',
                'x-apikey': process.env.REACT_APP_API_KEY
            }
        }).then((response) => {
            console.log('Udalo sie!');
            loadData();
        }).catch((error) => {
            console.log('Nie zapisano');
        })
    }

    return (
        <div style={{margin: '50px'}}> 
            <form onSubmit={addNewData} style={{display: 'flex', flexDirection: 'column', height: '40vh', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <img src={require('../src/XDDD.png')} style={{width: '200px'}}></img>
                <input style={{margin: '15px', width: '200px', height: '50px', fontSize: '25px', textAlign: 'center'}} value={newData} onChange={(e) => newNewestData(e)}></input>
                <button type='submit' style={{margin: '15px', width: '200px', height: '50px', fontSize: '25px'}} onClick={addNewData}>DEBIL</button>
            </form>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                data?.map((item)=> <div style={{fontSize: '25px'}}>{item.imie}</div>)
                }
            </div>
        </div>
    )
}

export default Debile;