import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.metrics import r2_score

# Locate dataset relative to this script
BASE_DIR = Path(__file__).resolve().parents[3]
DATA_PATH = BASE_DIR / "dynamic_pricing.csv"

# Load dataset
df = pd.read_csv(DATA_PATH)

# Target column
TARGET = "Historical_Cost_of_Ride"

# Features and target
X = df.drop(TARGET, axis=1)
y = df[TARGET]

# Numerical columns
num_cols = X.select_dtypes(include=["int64", "float64"]).columns

# Categorical columns
cat_cols = X.select_dtypes(include=["object", "string"]).columns

# Numerical transformer
num_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="mean"))
])

# Categorical transformer
cat_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

# Preprocessor
preprocessor = ColumnTransformer([
    ("num", num_transformer, num_cols),
    ("cat", cat_transformer, cat_cols)
])

# Model pipeline
model = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", LinearRegression())
])

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Predictions
preds = model.predict(X_test)

# Accuracy
score = r2_score(y_test, preds)

print(f"R2 Score: {score}")

# Save model
joblib.dump(model, "model.pkl")

print("Model saved successfully!")