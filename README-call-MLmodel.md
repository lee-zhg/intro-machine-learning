# Watson Studio and Machine Learning on Cloud -  Node.js Sample Code for calling ML model

The code in this repository provides a simple implementation of an app running on Node.js runtime demonstrating how to call ML Model REST API in Node.js applications.


## Run the app locally

1. If you do not already have a Bluemix account, [sign up here](https://console.ng.bluemix.net/registration/)

2. If you have not already, [download node.js](https://nodejs.org/en/download/) and install it on your local machine.

3. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/lee-zhg/intro-machine-learning
  ```

4. `cd` into this newly created directory

5. Install the required npm and bower packages using the following command

  ```
  npm install
  ```

6. Replace 3 pieces of information

  * iam_apikey - the API key of Watson Visual Recognition service instance
  * classifier_ids - classifier_id of your VC model in Watson Studio
  * images_file - you also need to copy your testing image file to the same folder, and update the file name in the sample code
  * apikey = "";
  * mlInstanceId = "";

7. Run the sample code locally with the following command

  ```
  node app.js
  ```
  OR

  ```
  node app02.js
  ```
8. You should see output similar to

  ```
  { fields:
   [ 'AVGHEARTBEATSPERMIN',
     'PALPITATIONSPERDAY',
     'CHOLESTEROL',
     'BMI',
     'AGE',
     'SEX',
     'FAMILYHISTORY',
     'SMOKERLAST5YRS',
     'EXERCISEMINPERWEEK',
     'label',
     'SEX_IX',
     'FAMILYHISTORY_IX',
     'SMOKERLAST5YRS_IX',
     'features',
     'rawPrediction',
     'probability',
     'prediction',
     'predictedLabel' ],
  values:
   [ [ 93,
       22,
       163,
       25,
       49,
       'F',
       'N',
       'N',
       110,
       0,
       1,
       0,
       0,
       [Array],
       [Array],
       [Array],
       0,
       'N' ] ] }
  ```

