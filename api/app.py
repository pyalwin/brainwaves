from flask import Flask
from flask_graphql import GraphQLView
from schema import schema
from mongoengine import connect
from flask import jsonify
from models import Stocks as StocksModel
from flask_cors import CORS

connect('brainwaves', host='mongodb+srv://user:password@host/db', alias='default')


app = Flask(__name__)
CORS(app)
app.debug = True

default_query = '''
{
   allStocks{
     edges{
       node{
            id,
            date,
            symbol,
            open,
            close,
            low,
            high,
            volume
         }
      }
   }
}'''.strip()

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema,graphiql=True))
app.add_url_rule('/api', view_func=GraphQLView.as_view('api', schema=schema,graphiql=False))


@app.route('/api/ticker-list')
def list_tickers():
    tickers = StocksModel.objects.distinct(field='symbol')
    return jsonify(tickers)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
