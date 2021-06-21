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
	"add_trade": {
		"ticker":"tsla", //not null
		"shares":100.0, //not null
		"bought_for":565.12, //not null
		"sold_for":752.79,
		"position_opened":12342345.23423423, //not null
		"position_closed":45604575.34566455
	}
}
```

#### Get Trades
> This request is used to get all active and closed trades.
```javascript
{
	"get_trades":""
}
```

#### Update Trade
> This request is used to update a trade. The "id" of the trade cannot be changed, it is only passed in as a reference to the trade you would like to change.
```javascript
{
	"update_trade": {
		"id": "sktwim0rkq60fiq2",
		"ticker": "tsla",
		"shares": 200.0,
		"bought_for": 951.32,
		"sold_for": 976.20,
		"position_opened": 12346534.23423423,
		"position_closed": 45608321.34566455
	}
}
```

#### Delete Trade
> This request is used to delete a trade.
```javascript
{
	"delete_trade":{"id":"sktwim0rkq60fiq2"}
}
```