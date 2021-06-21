const sqlite3 = require('sqlite3').verbose();
var uniqid = require('uniqid');
const WebSocket = require('ws');

class financeDb {
	constructor() {
		this.db = new sqlite3.Database('sql/finance_db', (err) => {
			if (err) {
				console.error(err.message);
			}
			else {
				console.log('Connected to the SQlite database.');
			}
		});
		
		this.db.run('CREATE TABLE IF NOT EXISTS trades(id text NOT NULL, ticker text NOT NULL, shares decimal NOT NULL, bought_for money NOT NULL, sold_for money, position_opened decimal NOT NULL, position_closed decimal)');
	}
}

class wsAPI {
	constructor() {
		const wss = new WebSocket.Server({ port: 8080 });


		wss.on('connection', ws => {

			ws.on('message', message => {

				var defaultErrorResponse = {'error':'your request could not be processed.'};

				try {
					var request = JSON.parse(message);

					var key;
					for (key in request) {
						var data = request[key];
						if (key == 'add_trade') {
							
							db.db.run('INSERT INTO trades(id,ticker,shares,bought_for,sold_for,position_opened,position_closed) VALUES (?,?,?,?,?,?,?)',[uniqid(),data['ticker'],data['shares'],data['bought_for'],data['sold_for'],data['position_opened'],data['position_closed']], function(err) {
								if (err) {
									ws.send(JSON.stringify({'success':false,'error':err}));
								}
								else {
									ws.send(JSON.stringify({'success':true}));
								}
							});
						}
						else if (key == 'get_trades') {
							db.db.all('SELECT * FROM trades', [], (err, rows) => {
								if (err) {
									ws.send(JSON.stringify({'success':false,'error':err}));
								} else {
									ws.send(JSON.stringify(rows));
								}
							});
						}
						else if (key == 'update_trade') {
							db.db.run('UPDATE trades SET ticker=?,shares=?,bought_for=?,sold_for=?,position_opened=?,position_closed=? WHERE id=?', [data['ticker'],data['shares'],data['bought_for'],data['sold_for'],data['position_opened'],data['position_closed'],data['id']], function(err) {
								if (err) {
									console.log(err);
								}
								console.log('Row(s) updated: ${this.changes}');
							});
						}
						else {
							ws.send(JSON.stringify(defaultErrorResponse));
						}
					}
				}
				catch (err) {
					console.log(err);
					ws.send(JSON.stringify(defaultErrorResponse));
				}
			});
		});
	}
}






var db = new financeDb();
var ws = new wsAPI();














