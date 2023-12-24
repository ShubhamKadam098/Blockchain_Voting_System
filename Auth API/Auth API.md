# Aadhar Authentication Setup

This guide provides steps to set up an Aadhar authentication system using Flask (Python) for the backend and Firebase for authentication.

## Prerequisites

1. **Python:** Ensure Python is installed on your system.(Version: 3.10.6)
2. **Flask:** Install Flask, a Python web framework, using pip:

```bash
pip install Flask
```

3. **Firebase SDK:**

```bash
pip install firebase-admin
```

4. **Other packages:**

```bash
pip install opencv-python
pip install Flask-RESTful
pip install Flask-Cors
pip install scikit-image
pip install python-dotenv
```

## Steps:

### 1. Navigate to Auth API directory.

```bash
cd "Auth API"
```

### 2. Now fill the firebase credentials in .env file using .env.sample

```bash
FBASE_STORAGE_BUCKET=
FBASE_TYPE=
FBASE_PROJECT_ID=
FBASE_PRIVATE_KEY_ID=
FBASE_PRIVATE_KEY=
FBASE_CLIENT_EMAIL=
FBASE_CLIENT_ID=
FBASE_AUTH_URI=
FBASE_TOKEN_URI=
FBASE_AUTH_PROVIDER_X509_CERT_URL=
FBASE_CLIENT_X509_CERT_URL=
FBASE_UNIVERSE_DOMAIN=
```

### 3. Now run flask.

```shell
python add.py
```
