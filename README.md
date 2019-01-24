Project Description:

The project is to provide a visualization of stock prices information.

The historical information of the various stocks can be done through selecting the tickers on landing page.

The daywise high, low, open and close information are provided.

Also, in order to provide more context to the data and to understand the comparitive performance of the date,
the same is visualized in the form of candlestick chart.

How to run the project:


Unzip the folder into the location.


Step 1 :

Run api server

change to location path
     cd brainwaves/api

Install virtualenv and packages

     virtualenv env
     source env/bin/activate
     pip install -r api/requirements.txt

Run api server
     cd api
     python app.py


Step 2:

Install serve on global npm
    npm install -g serve

Step 3: Run client. Change to path of app
    cd brainwaves
    serve -s build
