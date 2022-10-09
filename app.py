#Import dependencies
from flask import Flask, jsonify
import numpy as np
from Resources import connection
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_
from datetime import datetime as dt
from sqlalchemy.sql import text

#Engine/ Create App
engine = create_engine(connection)

app = Flask(__name__)

@app.route('/')
def tobs():
    # find most active station
    session = Session(engine)
    temps = session.query(text('hurricane_info."Name", hurricane_info."Deaths", hurricane_info."Damages ($)" from public.hurricane_info'))
    temp_data = {}
    for value in temps:
        temp_data[value.date] = value.tobs
    session.close()
    return (jsonify(temp_data))

if __name__ == "__main__":
    app.run(debug=True)