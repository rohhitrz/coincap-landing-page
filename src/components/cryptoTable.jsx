import react, {useState, useEffect} from "react";
import axios from "axios";

const CryptoTable=()=>{
const [cryptos,setCryptos]= useState([]);
const [page,setPage]=useState(1);
const [loading,setLoading]=useState(false);



useEffect(()=>{

    const fetchCrypto= async ()=>{
        
        setLoading(true);
        try{
        const response= await axios.get(`https://api.coincap.io/v2/assets?limit=${page * 50}`);
        console.log(response);
        setCryptos(response.data.data);
        }
        catch(error){
            console.log("error in fetching data",error);

        }
        setLoading(false);

    };

    fetchCrypto();
},[page]);

const loadMore=()=>{
    setPage(page+1);
};

return (
    <div>
        <h1>Cryptocurrencies</h1>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {cryptos.map((crypto)=>{
                    return (
                    <tr key={crypto.id}>
                        <td>{crypto.rank}</td>
                        <td><img src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`} alt={crypto.name} width="24" /></td>
                        <td>{crypto.name}</td>
                        <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
                        </tr>)})}
            </tbody>
        </table>
        {loading && <p>Loading...</p>}
        {!loading && (
        <button onClick={loadMore}>Load More</button>
      )}    


    </div>
    
)






}
export default CryptoTable;
