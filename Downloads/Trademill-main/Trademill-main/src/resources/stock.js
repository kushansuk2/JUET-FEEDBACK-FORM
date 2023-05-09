import { iex } from '../config/iex.js';

export const stock = {
    
    //if we want to change the data source, we can just change the url and api
    latestPrice: (ticker, callback) => {
        fetch(stock.latestPriceURL(ticker))
        .then((response) => response.json())
        .then((data) => callback(stock.formatPriceData(data)))
    },
    
    latestPriceURL:  (ticker) =>{
        return `${iex.base_url}/stock/${ticker}/intraday-prices?&chartIEXWhenNull=true&token=${iex.api_token}`
    },
    
    //if we change the data source, we also have to change the formatter accordingly chartLast=10
    formatPriceData: (data) => {
        console.log(data)
        let stockData;
        if(data.length==1){
            stockData = data[0];
        }
        else{
            stockData = data[data.length - 2]
        }
        const formattedData = {}
        if(data.length==1){
            formattedData.price = 100
        }
        else {
            formattedData.price = stockData.close
        }
        formattedData.date = stockData.date
        formattedData.time = stockData.label
        return formattedData
    },

    getYesterdaysClose: (ticker, lastTradingDate, callback) =>{
        if(lastTradingDate != "" && lastTradingDate != undefined){  
            // console.log('here')
            const url = stock.yesterdaysCloseURL(ticker, stock.formatDate(lastTradingDate))
            fetch(url)
            .then((response) => response.json())
            .then((data) => callback(stock.formatPriceData(data)))
        }
    },

    getLastTradingDate: () => {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const url = `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`

        return fetch(url).then((res) => res.json());
    },

    // exactDate=20221115&
    yesterdaysCloseURL: (ticker, lastTradingDate) =>{
        // var lastTradingDate = stock.formatDate(date);
        // console.log(lastTradingDate)
        return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${lastTradingDate}&token=${iex.api_token}`
    },

    formatDate: (date) => {
        return new Date(date).toISOString().split('T')[0].replace(/-/g, '');
    }
}


// https://cloud.iexapis.com/stable/stock/wmt/intraday-prices?chartLast=1&exactDate=20221117&token=pk_49620e53770040a3b71f5dcb11bd6abf