import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import Stocks as StocksModel
from flask import jsonify

class Stocks(MongoengineObjectType):

    class Meta:
        model = StocksModel
        interfaces = (Node,)


class Query(graphene.ObjectType):
    node = Node.Field()
    all_stocks = MongoengineConnectionField(Stocks)

schema = graphene.Schema(query=Query, types=[Stocks])
