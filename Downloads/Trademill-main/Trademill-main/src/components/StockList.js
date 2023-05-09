import React, { Component } from "react";
import { stock } from '../resources/stock.js'
import StockRow from './StockRow.js';


class StockList extends Component{
    constructor(props){
        super(props)
        this.state = {
            lastTradingDate: null
        }
    }
    
    componentDidMount(){
        stock.getLastTradingDate().then((data) => {
            this.setState({
                lastTradingDate: data[0].date
            })
        })
    }

    render(){
        const lastTradingDate = this.state.lastTradingDate;
        return (
            <ul className='list-group list-group-flush'>
              <StockRow ticker="aapl" lastTradingDate= {lastTradingDate} />
              <StockRow ticker="googl" lastTradingDate= {lastTradingDate} />
              <StockRow ticker="msft" lastTradingDate= {lastTradingDate} />
              {/* <StockRow ticker="TSLA" lastTradingDate= {lastTradingDate} /> */}
              <StockRow ticker="amzn" lastTradingDate= {lastTradingDate} />
              <StockRow ticker="jnj" lastTradingDate= {lastTradingDate} />
              <StockRow ticker="wmt" lastTradingDate= {lastTradingDate} />
              {/* <StockRow ticker="nvda" lastTradingDate= {lastTradingDate} /> */}
            </ul>
        )
    }
}
    export default StockList;