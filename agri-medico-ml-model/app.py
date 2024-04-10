from flask import Flask, request, jsonify, send_file  # Import send_file here
from tensorflow.keras.models import load_model
from flask_cors import CORS
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)

# Load the pre-trained Keras model
model = load_model('trained_banana_leaf_disease_detection_cnn_model.keras')

# Define a dictionary to map class indices to class names
class_names = {
    0: 'healthy',
    1: 'cordana',
    2: 'pestalotiopsis',
    3: 'sigatoka'
}

# Define a function to preprocess the uploaded image
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))  # Resize the image to match the model's input shape
    img = img / 255
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# sample endpoint 
@app.route('/',methods=['GET'])
def sample_route():
    return jsonify({'message': 'I am working'})

# Define an API endpoint for image classification
@app.route('/classify', methods=['POST'])
def classify_image():
    print(request.files)
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Save the uploaded file
    upload_folder = 'uploads'
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)

    # Preprocess the uploaded image
    img_array = preprocess_image(file_path)

    # Predict the class probabilities
    predictions = model.predict(img_array)

    # Get the predicted class index
    predicted_class_index = np.argmax(predictions)

    # Get the predicted class name
    predicted_class_name = class_names[predicted_class_index]

    # Return the predicted class name
    return jsonify({'class_name': predicted_class_name})

if __name__ == '__main__':
    app.run()