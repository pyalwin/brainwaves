from datetime import datetime
from mongoengine import Document
from mongoengine.fields import (
    DateTimeField, StringField, FloatField, IntField
)

class Stocks(Document):
    meta = {'collection': 'stocks'}

    date = StringField()
    symbol = StringField()
    open = FloatField()
    close = FloatField()
    high = FloatField()
    low = FloatField()
    volume = FloatField()
