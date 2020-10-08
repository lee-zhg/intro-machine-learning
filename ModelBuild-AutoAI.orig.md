# Build and Deploy an ML model using AutoAI

In this walkthrough we will be building a model using a fully automated capability of Watson Studio and Watson Machine Learning known as Auto AI. 

AutoAI automates the pipeline optimization process that is common to the model development workflow. As part of that optimization process, AutoAI will perform the following:

- Data pre-processing: AutoAI attempts to analyze, clean, and prepare your raw data for machine learning. Automatically detects and categorizes features based on data type and finds best  strategies for missing value imputation, feature encoding, and feature scaling for your data.

- Automated model selection: AutoAI performs testing and ranking of candidate estimators against small subsets of the data set, gradually increasing the size of the subset for the most promising estimators to arrive at the best match.

- Automated feature engineering: Feature engineering attempts to transform the raw data into the combination of features that best represents the problem to achieve the most accurate prediction.

- Hyperparameter optimization: A hyper-parameter optimization step refines the best performing model pipelines.

In the lab we will:

- Create a project in Watson Studio.
- Add dataset to project.
- Use the AutoAI Experiment.

## Included components

- [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio): Analyze data using RStudio, Jupyter, and Python in a configured, collaborative environment that includes IBM value-adds, such as managed Spark.

### Prerequisites

- The data used in these labs are contained in this repository. Ensure you have downloaded / cloned the repository per instructions in the [README](READMe.md).

- It is assumed you have your environment set up with either lite or payed versions of Watson Studio and Watson Machine Learning. If not, contact the lab instructor or set up your own lite instances as detailed in the [Setup Environment readme](EnvironmentSetup.md)

## Step 1: Setup Project

1. Open Watson Studio by logging in at [https://dataplatform.ibm.com](https://dataplatform.ibm.com)

1. From the dashboard page, Click the **`Get started`** drop down menu on the top right of the page and then Click on the **`Create a project`** option to create a new project on Watson Studio.

    ![Create Project](docs/images/ss8a.png)

1. Select option `Select an empty project`.

1. Give your project a name and click **`Create`** on the bottom right.

    ![Name Project](docs/images/ss9a.png)

1. Next we have to associate a Watson Machine Learning service to the project. Click on `Settings` on the top banner of the project, then `Add Service` under `Associate Services` and finally, select `Watson` to add a Watson service to the project.

    ![Associate Service Settings](docs/images/settings.png)

1. Select `Machine Learning` from the list of available Watson Services.

    ![Add Associated Service](docs/images/add-associated-service.png)

1. Click on the `Existing` tab and select the name of your Machine Learning service instance.

    ![Add Existing ML Service](docs/images/choose-ml-service.png)

1. Click `Select`.

1. The Watson Machine Learning service is now listed as one of your `Associated Services`.

## Step 2: Add Data Set

1. Click the `Assets` tab of the project near the top of the page. Then click `Add to project` on the top right, selecting `Data`.

    ![](docs/images/add-to-project.png)

    A panel on the right of the screen appears, select `Load` and click on `Browse` to upload the data file you'll use to create a predictive model.

    ![](docs/images/add-data-asset.png)

1. On your machine, browse to the location of the file **patientdataV6.csv** in this repository in the **data/** directory. Select the file and click on Open (or the equivalent action for your operating system). Once successfully uploaded, the file should appear in the `Data Assets` section of `Assets`.

## Step 3: Build Modeler Flow

1. AutoAI uses your data set to generate candidate model pipelines. It will use your dataset to discover data transformations, estimator algorithms, and parameter settings that work best for your model.

1. To get started, from your main project page. Click on the **`Add to project`** button and select the `AutoAI experiment` option.
    ![](docs/images/ss20.png)

1. In the experiment definition screen, select the `From blank` option under `Create AutoAI experiment type`.

1. Give your experiment a name. If you have a single Machine Learning service associated to your project, it will selected in the drop down list. Note that the compute configuration can not currently be changed in the beta of this capability. Click the **`Create`** button.
    ![](docs/images/ss21.png)

1. Next we need to give AutoAI the data that the model will be built on. Click the **`Select from project`** button.
    ![](docs/images/ss22.png)

1. In the data selection window, select the data file that you uploaded to your project earlier, then click **`Select asset`**
    ![](docs/images/ss23.png)

1. AutoAI determines the data types and you select the column to predict (i.e the target or the label). Select the `HEARTFAILURE` column and click the **`Run experiment`** button.

    ![](docs/images/ss24.png)

1. AutoAI starts the experiment process, clean/preprocess the data set, select the best base model/evaluator and then run multiple pipelines. This process may take a while. As the pipelines are built and tested, you see them appear on the screen.

    ![](docs/images/ss25.png)

1. Click `Swap view` link to switch views.

    ![](docs/images/autoaiviews.png)

1. As the pipelines appear in the leader board, you can expand them to view the details of the pipeline experiment and results.

    ![](docs/images/ss26.png)

1. Once the experiment completes, the UI will display the best performing model at the top of the leaderboard.

    ![](docs/images/ss27.png)

    > Note: the `Pipeline leaderboard` is at the bottom of the screen. Scroll down to view.

1. One of the AutoAI capabilities is to perform feature engineering. You can click into the pipeline in your experiment that contained the feature engineering step and view the data transformation that were applied. _Note that your pipeline may be different_

    ![](docs/images/ss28.png)

1. Click `Feature Importance` tab on the left. AutoAI provides insight of feature influence to the model.

    ![](docs/images/autoaifeatureimportant.png)

1. Once the experiment has completed, we have the option to save the best model. If you click on the `Save model` button next to the top pipeline you can save the model. Just give the model a name and click the **`Save`** button.

    ![](docs/images/ss29.png)

## [Optional] Step 4: Deploy the Machine Learning model

Although training is a critical step in the machine learning process, the model still needs to be packaged, fronted with an API, and deployed as a web service. Watson Machine Learning streamlines deployment of machine learning models into production.

1. Starting from projects page in Watson Studio, you should see an additional asset has been added to the project in the `Assets` tab. The newly trained and saved model you created above should be visible under `Watson Machine Learning models` section.

1. Select the model.

1. Select `Deployments` tab on the model window.

1. Click the `Add Deployment` link.

1. Name the deployment something unique and click `Save`.

1. Refresh your browser after about 10-15 seconds.

1. The model is quickly packaged and deployed. Upon completion you will have a new deployment of the trained machine learning model; every trained model can have many deployments.

## [Optional] Step 5: Test the Model via UI

You can test the model using the Watson Studio Interface.

1. Go back the home page of your project in `Watson Studio`.

1. Click on the `Deployment` tab on the top of the project page and then click the name you used to create the deployment of your model

   ![](docs/images/ss15.png)

1. Navigate to the `Test` tab.
   
   ![](docs/images/ss16.png)

1. Enter testing values below in the form and click the `Predict` button.

    ```
    AVGHEARTBEATSPERMIN:        93
    PALPITATIONSPERDAY:         22
    CHOLESTEROL:                163
    BMI:                        25
    AGE:                        49
    SEX:                        F
    FAMILYHISTORY:              N
    SMOKERLAST5YRS:             N
    EXERCISEMINPERWEEK:         110
    ```

## [Optional] Step 6: Test the Model via API

1. Retrieve the API key and Instance ID of the `Machine Learning` instance

    * Navigate to IBM Cloud dashboard at https//cloud.ibm.com.
    * Expand the `Services` section under the `Resource summary`.
    * Select your `Machine Learning` instance.
    * Select the `Service credentials` tab in the left pane.
    * Click the `View credentials` of any `Key` entry. 
    * Take notes of `apikey` and `instance_id`.

        ![](docs/images/ss13.png)

1. Retrieve a token for accessing the Machine Learning Instance

    * Open a terminal window.
    * Execute command

        ```
        curl -k -X POST \
            --header "Content-Type: application/x-www-form-urlencoded" \
            --header "Accept: application/json" \
            --data-urlencode "grant_type=urn:ibm:params:oauth:grant-type:apikey" \
            --data-urlencode "apikey=QiGk9o_bHFo_TrCnR_lGuLEdw2Pd2gLFPNeQzMvJiDgX" \
            "https://iam.cloud.ibm.com/identity/token"
        ```

    > Note, you must replace the `apikey` with yours.

    * The output of the above command looks like

        ```
        {
            "access_token":"eyJraWQiOiIyMDE5MDcyNCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJpYW0tU2VydmljZUlkLWE5MWNmZjllLTkwZGYtNDQwYy04NTFkLWNjYTRjMmI2ODk3MyIsImlkIjoiaWFtLVNlcnZpY2VJZC1hOTFjZmY5ZS05MGRmLTQ0MGMtODUxZC1jY2E0YzJiNjg5NzMiLCJyZWFsbWlkIjoiaWFtIiwiaWRlbnRpZmllciI6IlNlcnZpY2VJZC1hOTFjZmY5ZS05MGRmLTQ0MGMtODUxZC1jY2E0YzJiNjg5NzMiLCJzdWIiOiJTZXJ2aWNlSWQtYTkxY2ZmOWUtOTBkZi00NDBjLTg1MWQtY2NhNGMyYjY4OTczIiwic3ViX3R5cGUiOiJTZXJ2aWNlSWQiLCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiIzOGM4MTVjZGZmNWQ0YWQzOTdmYmY1NzYxMzMwNWY4OCJ9LCJpYXQiOjE1NzM2NDU2NTQsImV4cCI6MTU3MzY0OTI1NCwiaXNzIjoiaHR0cHM6Ly9pYW0uY2xvdWQuaWJtLmNvbS9pZGVudGl0eSIsImdyYW50X3R5cGUiOiJ1cm46aWJtOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmFwaWtleSIsInNjb3BlIjoiaWJtIG9wZW5pZCIsImNsaWVudF9pZCI6ImRlZmF1bHQiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.lu3sZfMINL7CV3YiyyqNVw9bx-OeQpNjGknXjc8fFgb-wug4V6Up1tdFnGROfGPx7YNBzocKrocHpDokAD-sewltgC0vibchynEuMCDjale-KpCfpAt2-8lMb-JvvEid_RAlhCBxLq9cGGopLPBT6tUGntkj2VisF1NLYGAew9wnrVMlOvl-6xOiTjwBMPmVlzN0ZADabPGIjVDLNByO_b9E_LJm3xCtfoUbLu_2Ng8DUGHn1btJToGDEYLyBnpvjdXiptdb3hHjV2VmGSlyQbmyqtlhFwByT3ifXbB0VyxfhoCF_57PrTEYxa1DPoloIcSSv1I6HHMejhC7uM84Tw",
            "refresh_token":"ReWaOOr5mTk7vdL5tAZKkyvvJJkwHtF-an8qXXwO30cGWPw8Yh3X3N-aj9MaNyfLnCRj6czosx5iz6gGXWL5W3rE_tk8MA1lpMMLthcgbfcF8YUXh_p9WuSyJjcjQBA0WEgDfy_EnNUsopxJ45pyix-GO3sMEAWWLUk-LYv4bsIlu-envUjk-IBrFmr74_fSf9i8OlwQcZ69O1Dr1C_wEELnDApjLJ5IMIfsXGSAH3YYUxvAX32gcwt2zqjXzK6jtb5M7YZ1d37ODWfAn3jZZWcWxqYXj8XAiD6cQsro31BXjs515q0UAW0bmHHbhW3nbayM1WuXbP92OZh9SaOBDW3STJqPAgEPwqtSt30kP60WKwyPOC3oLBmvv_jIV5Tu1ux0W1wxLr6P6cG4CU4u8TC-6ZSYKfF-rHAc30f2vj0KZrNGXpZ5kySDOwvTxMWGWn0RHB4Qs94NT2DmvDNTFMQdzEgAOpkb_ASJMJDfjnHuEQA96YXyajTTlZKADkhvTScA_KGa70VSttpEjBbPxV8cFSnAnp2cVK8k4srSb5KK-KSnSDoZftQ7pWc8a15T43LHH8lE-3q_Rd2EINUjTON4F19N3PNAbGbg4zoTp42i5C4l4GY5uTpY1zlj4EoKwv9qmWBFo3qnrsdrDeikM_cLLVuD4I_c2ViCn_X37xHrQSrM1FVAKC-DfmMEJXDvrtt-6cjtzLiRgoAtFVftMRJREtxAB5i9iU58AystKhzj9aVtXT3drndQt3WJ7C1dqh9f-9nTSReJEKil2DmYB7sO_vXhDOGFWBMDFesp3rjgMix99pXIn9OfhhiUxntvnGgojHR4Q1pvBedmMouliu3SknF0L83bW5ungCqzi-46FOol3dhlV4oej4ZKZfLJSuUMrBcVvzZte3yxMAnihKdERiCsnlieWNjUhC_Las3spWmr6pG9ryYPTkqESAmKkRX66LpCPa7RYv1V4cQ4_o-xf6DKM6Yb-l3ue1gGoZN8OIzCP5NY0i1JeSY4fcoDqGLT9nqwNBACrkmYnaWATPasPG0ym9tyejh8t_FjsUNiUA",
            "token_type":"Bearer",
            "expires_in":3600,
            "expiration":1573649254,
            "scope":"ibm openid"
        }
        ```

    > Note, online JSON formatter tool can be helpful for a better output format. For example, https://jsonformatter.org/.

1. Take note of the `access_token`. It'll be used for the next command.

1. Retrieve the sample CURL command for accessing your deployed model.

    * Navigate back to your home page of `Watson Studio`, https://dataplatform.ibm.com
    * Select your project.
    * Navigate to the `Assets` tab.
    * In tyhe `Assets` tab, scroll down and locate the `Watson Machine Learning models` section.
    * Select and open your model.
    * In your model window, navigate to the `Deployments` tab.
    * Select your `deployment` entry. If you don't have any deployment, click on `Add Deployment` link to create one.
    * In your `Deployment` window, navigate to the `Implementation` tab.

        ![](docs/images/model-deployment.png)

    * Copy the sample cURL code snippet. The sample code snippets in other languages are also available.

        ```
        # TODO: manually define and pass values to be scored below
        curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header "Authorization: Bearer  $IAM_TOKEN" --header "ML-Instance-ID: $ML_INSTANCE_ID" -d '{"input_data": [{"fields": ["AVGHEARTBEATSPERMIN", "PALPITATIONSPERDAY", "CHOLESTEROL", "BMI", "AGE", "SEX", "FAMILYHISTORY", "SMOKERLAST5YRS", "EXERCISEMINPERWEEK"],"values": [$ARRAY_OF_VALUES_TO_BE_SCORED, $ANOTHER_ARRAY_OF_VALUES_TO_BE_SCORED]}]}' https://us-south.ml.cloud.ibm.com/v4/deployments/10bb636c-c04d-41f1-9c88-cbed907937c1/predictions
        ```

    > You can NOT copy and execute the above code snippet from this instruction. You MUST copy it from your deployment.

    * Replace the `$IAM_TOKEN` and `$ML_INSTANCE_ID` with the values that you got in the previous steps. 

    * Replace `[$ARRAY_OF_VALUES_TO_BE_SCORED, $ANOTHER_ARRAY_OF_VALUES_TO_BE_SCORED]` with `[[93, 22, 163, 25, 49, "F", "N", "N", 110]]`.

    * After replace everything with your values, the command should looks like

        ```
        curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header "Authorization: Bearer  eyJraWQiOiIyMDE5MDcyNCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJpYW0tU2VydmljZUlkLTExZDVhNjVlLWI4YTMtNGU4OS04ZjkwLTNjNzNjNDRmYmY3YiIsImlkIjoiaWFtLVNlcnZpY2VJZC0xMWQ1YTY1ZS1iOGEzLTRlODktOGY5MC0zYzczYzQ0ZmJmN2IiLCJyZWFsbWlkIjoiaWFtIiwiaWRlbnRpZmllciI6IlNlcnZpY2VJZC0xMWQ1YTY1ZS1iOGEzLTRlODktOGY5MC0zYzczYzQ0ZmJmN2IiLCJzdWIiOiJTZXJ2aWNlSWQtMTFkNWE2NWUtYjhhMy00ZTg5LThmOTAtM2M3M2M0NGZiZjdiIiwic3ViX3R5cGUiOiJTZXJ2aWNlSWQiLCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiJkYTBlOGU5YjU5ODI5YjdlZTY0NDVhZjU2MmMyMmE4NSJ9LCJpYXQiOjE1NzQyODc4MTUsImV4cCI6MTU3NDI5MTQxNSwiaXNzIjoiaHR0cHM6Ly9pYW0uY2xvdWQuaWJtLmNvbS9pZGVudGl0eSIsImdyYW50X3R5cGUiOiJ1cm46aWJtOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmFwaWtleSIsInNjb3BlIjoiaWJtIG9wZW5pZCIsImNsaWVudF9pZCI6ImRlZmF1bHQiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.Q38cCmPdbvJmeeq-twRghJIBZlFH0aJGbSnQGvxx5VMDNJeb_edpNcf1NCIYfsTXSC_rfKokwuMbfB6my4rZtJlOlhy2xITrjBvc3zlQkf5UI9zIsdt8xEeUqXSbi5PED1o-8aektA1t1F0uD2gw4Xn34Xfcv-5EVQUgfUamU2eIbr8rVmgM050lPzmL0U3CX_BJ-mjO2LsQiJ_cGXgHKYQ9c4eikkjQu6zwRzbGLuFtXs3Dfga1V78qRl0_Qp1PP1vwUW_LYPM0boRg3Y9h44GWwp3ihPBX4X7eqahRTbbliYEsCOmODgObaaXllyrqMFi-cMSFtGh06DX_sb007w" --header "ML-Instance-ID: 6877cff9-0759-43be-8bdc-8209e7ff37ba" -d '{"input_data": [{"fields": ["AVGHEARTBEATSPERMIN", "PALPITATIONSPERDAY", "CHOLESTEROL", "BMI", "AGE", "SEX", "FAMILYHISTORY", "SMOKERLAST5YRS", "EXERCISEMINPERWEEK"],"values": [[93, 22, 163, 25, 49, "F", "N", "N", 110]]}]}' https://us-south.ml.cloud.ibm.com/v4/deployments/10bb636c-c04d-41f1-9c88-cbed907937c1/predictions

        ```

    * Execute the command in a terminal window. It returns something similar to 

        ```
        {
            "predictions": [{
                "fields": ["prediction", "probability"],
                "values": [["N", [0.9131566364079782, 0.08684336359202187]]]
            }]
        }
        ```

    * When calling the REST API of your deployed model in IBM Cloud with the sample input data, the prediction of the heart failure is `false` with `91.3%` of certainty.

