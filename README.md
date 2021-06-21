# finance_js
This repository is aimed at providing a convenient one stop shop for finance related calculations, stock market trade tracking, etc.

## Websocket api
> The websocket server runs on port 8080 and it requires requests to be in JSON format and responds in JSON format as well. Below are some examples of requests that can be made to the websocket server.

#### Add Trade
> This request is used to book an active or previously closed trade. Any trade that has a null value for "soldFor" and "positionClosed" will be considered as an active trade, once the before mentioned values are filled in, the trade will be considered inactive or closed.

* Data Types
  * ticker: string
  * shares: double
  * boughtFor: double
  * soldFor: double
  * positionOpened: double/int (unix timestamp)
  * positionClosed: double/int (unix timestamp)

```javascript
{
	"addTrade": {
		"ticker":"tsla", //not null
		"shares":100.0, //not null
		"boughtFor":565.12, //not null
		"soldFor":752.79,
		"positionOpened":12342345.23423423, //not null
		"positionClosed":45604575.34566455
	}
}
```

#### Get Trades
> This request is used to get all active and closed trades.
```javascript
{
	"getTrades":""
}
```