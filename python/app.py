from flask import Flask, request, jsonify
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
import numpy as np
import joblib  # For loading the model, if saved

app = Flask(__name__)

# Example Data (in practice, you'd load these from your training data)
X_train = np.array([[1.2, 3.4, 5.6], [2.1, 0.4, 1.5], [3.3, 4.4, 2.3]])  # Training features
y_train = np.array([3.5, 2.0, 4.0])  # Training target

# Initialize the scaler and model
scaler = StandardScaler()
model = RandomForestRegressor(random_state=42)

# Fit the scaler and model on the training data
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
model.fit(X_train_scaled, y_train)

# Route to receive feedback and return summarized rating
@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()  # Expecting { rating: ..., comments: ... }

        # Extract features (rating and other possible features from feedback)
        rating = data['rating']
        comments = data['comments']
        
        # Example: Convert comments length as an additional feature (you can expand this)
        comments_length = len(comments.split())
        
        # Feature vector based on rating and comment length
        X_new = np.array([[rating, comments_length]])  # Example feature vector
        
        # Scale and predict using the trained model
        X_new_scaled = scaler.transform(X_new)
        predicted_rating = model.predict(X_new_scaled)

        # Return the predicted summarized rating
        return jsonify({'summarizedRating': round(predicted_rating[0], 2)})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Expose API on port 5000
