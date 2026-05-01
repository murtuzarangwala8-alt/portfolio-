# Install packages first:
# pip install pandas numpy matplotlib statsmodels scikit-learn requests

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import requests
import statsmodels.api as sm
from statsmodels.tsa.arima.model import ARIMA
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

# -----------------------------
# 1. Country and indicators
# -----------------------------
country = "IND"

indicators = {
    "NY.GDP.MKTP.KD.ZG": "gdp_growth",
    "FS.AST.PRVT.GD.ZS": "credit",
    "FP.CPI.TOTL.ZG": "inflation",
    "FR.INR.LEND": "interest_rate"
}

# -----------------------------
# 2. Fetch data from World Bank API
# -----------------------------
def get_worldbank_data(indicator):
    url = f"https://api.worldbank.org/v2/country/{country}/indicator/{indicator}?format=json&per_page=100"
    data = requests.get(url).json()[1]

    df = pd.DataFrame(data)[["date", "value"]]
    df.columns = ["year", indicators[indicator]]
    df["year"] = df["year"].astype(int)

    return df

# Merge all indicators
dfs = [get_worldbank_data(ind) for ind in indicators]

df = dfs[0]
for d in dfs[1:]:
    df = df.merge(d, on="year", how="inner")

df = df.sort_values("year")
df = df[(df["year"] >= 2000) & (df["year"] <= 2023)]

# -----------------------------
# 3. Create SME Growth Proxy
# -----------------------------
df["credit_growth"] = df["credit"].pct_change() * 100

df["sme_growth"] = (
    0.5 * df["gdp_growth"] +
    0.3 * df["credit_growth"] -
    0.2 * df["interest_rate"]
)

df = df.dropna()

print(df.head())

# -----------------------------
# 4. Regression
# -----------------------------
X = df[["credit", "gdp_growth", "inflation", "interest_rate"]]
y = df["sme_growth"]

X = sm.add_constant(X)

model = sm.OLS(y, X).fit()
print(model.summary())

# -----------------------------
# 5. Train/Test
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

model2 = sm.OLS(y_train, X_train).fit()
y_pred = model2.predict(X_test)

print("R2:", r2_score(y_test, y_pred))
print("MSE:", mean_squared_error(y_test, y_pred))

# -----------------------------
# 6. Forecast (ARIMA)
# -----------------------------
series = df.set_index("year")["sme_growth"]

arima = ARIMA(series, order=(1,1,1)).fit()
forecast = arima.forecast(steps=5)

future_years = range(df["year"].max()+1, df["year"].max()+6)

forecast_df = pd.DataFrame({
    "year": future_years,
    "forecast": forecast.values
})

print(forecast_df)

# -----------------------------
# 7. Plots
# -----------------------------
plt.plot(df["year"], df["sme_growth"], label="Historical")
plt.plot(forecast_df["year"], forecast_df["forecast"], "--", label="Forecast")
plt.legend()
plt.title("SME Growth Forecast")
plt.show()
