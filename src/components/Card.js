import { useEffect,  useState } from "react";
import { tokenExchange, baseUrlExchange } from "../configs/api.js";
import { formatter } from "../lib/currency.js";


export default function Card() {
    useEffect(async function () {
        setCurrencys((await (await fetch(`${baseUrlExchange}/${tokenExchange}/codes`)).json()).supported_codes);
    }, []);
    const [currencys, setCurrencys] = useState([]);
    const [currency, setCurrency] = useState(["USD", "VND"]);
    const [price, setPrice] = useState();
    const [result, setResult] = useState();
    const handleChangePrice = async function (e) {
        setPrice(e.target.value);
    }
    const handleChangeCurrency = function (e) {
        currency[e.target.getAttribute("type")] = e.target.value;
        setCurrency([... currency]);
    }

    useEffect(async function () {
        if (!price) {
            return;
        }
        setResult((await (await fetch(`${baseUrlExchange}/${tokenExchange}/pair/${currency[0]}/${currency[1]}/${price}`)).json()).conversion_result);
    }, [price, currency]);

    const swapCurrency = function (e) {
        const [a, b] = currency;
        setCurrency([b, a]);
        e.preventDefault();
    }

    return (
        <div className="box-main">
            <h3 className="title text-center">Currency Converter</h3>
            <div className="box">
                {
                    result && price ? <>
                        <strong className="price-title">{price} {currency[0]} is equivalent to</strong>
                        <strong className="price-converted-title">{formatter(currency[0], result)} {currency[1]}</strong>
                    </>
                        :
                        <>
                            <h1 className="notification">Chưa có kết quả</h1>
                        </>
                }
                <div className="box-control d-flex align-items-center justify-between">
                    <div className="box-form">
                        <div className="form-group">
                            <input type="number" className="form-control" onChange={handleChangePrice} id="input-price" />
                            <select id="type-price" onChange={handleChangeCurrency} type={0} className="form-control">
                                <option>Tiền tệ</option>
                                {currencys.map((value, key) => {
                                    return <option key={key} value={value[0]}>{value[0]}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="input-price" readOnly />
                            <select id="type-price-convert" onChange={handleChangeCurrency} type={1} className="form-control">
                                <option>Tiền tệ</option>
                                {currencys.map((value, key) => {
                                    return <option key={key} value={value[0]}>{value[0]}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <a href="" id="btn-convert" onClick={swapCurrency}><i className="fas fa-exchange-alt"></i></a>
                </div>
            </div>
        </div>
    );
}