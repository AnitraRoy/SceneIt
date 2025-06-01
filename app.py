from flask import Flask, render_template, request, jsonify
import requests
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from dotenv import load_dotenv
import os

load_dotenv()  # load env vars from .env file

app = Flask(__name__)

nltk.download('punkt')  # download tokenizer models
nltk.download('stopwords')  # download stopwords list

TMDB_API_KEY = os.getenv('TMDB_API_KEY')  # get api key from env
if not TMDB_API_KEY:
    raise RuntimeError("tmdb_api_key environment variable not set")

TMDB_BASE_URL = "https://api.themoviedb.org/3"  # base url for tmdb api
stop_words = set(stopwords.words('english'))

def preprocess_query(query):
    # tokenize input, convert to lowercase, remove stopwords & non-alphanumeric
    tokens = word_tokenize(query.lower())
    filtered = [w for w in tokens if w.isalnum() and w not in stop_words]
    return filtered

@app.route('/')
def index():
    # serve homepage
    return render_template('index.html')

@app.route('/recommend')
def recommend():
    # serve recommender page
    return render_template('recommender.html')

@app.route('/search')
def search():
    # serve search page
    return render_template('search.html')

@app.route('/search_api')
def search_api():
    # api endpoint for searching movies by query
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify({"error": "empty query"}), 400

    keywords = preprocess_query(query)
    if not keywords:
        return jsonify({"error": "no valid keywords after preprocessing"}), 400

    try:
        # call tmdb search endpoint with encoded query
        url = f"{TMDB_BASE_URL}/search/movie?api_key={TMDB_API_KEY}&query={requests.utils.quote(query)}&language=en-US"
        resp = requests.get(url)
        resp.raise_for_status()
        data = resp.json()
        results = data.get('results', [])
        return jsonify({"results": results})
    except Exception as e:
        # handle request errors
        return jsonify({"error": str(e)}), 500

@app.route('/api/genres')
def get_genres():
    # api endpoint to fetch movie genres from tmdb
    try:
        url = f"{TMDB_BASE_URL}/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US"
        resp = requests.get(url)
        resp.raise_for_status()
        data = resp.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies')
def get_movies():
    # api endpoint to get movies by genres and sorting options
    genres = request.args.get('genres', '')  # comma separated genre ids
    sort_by = request.args.get('sortBy', 'popularity.desc')  # sort option
    page = request.args.get('page', '1')  # page number

    try:
        # build tmdb discover movies url with params
        url = f"{TMDB_BASE_URL}/discover/movie?api_key={TMDB_API_KEY}&language=en-US"
        if genres:
            url += f"&with_genres={genres}"
        url += f"&sort_by={sort_by}&page={page}"
        resp = requests.get(url)
        resp.raise_for_status()
        data = resp.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)