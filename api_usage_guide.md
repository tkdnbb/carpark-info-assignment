# API Usage Guide

This guide provides instructions on how to use the API for filtering carparks and adding favorites. The API endpoints allow you to filter carparks based on specific criteria and add a carpark to the user's favorites.

### swagger docs
You can open http://localhost:4000/carparks/api-docs/ to read swagger docs after the app started(**npm run dev**).

The recommended node version is 22.4.0.

### 1. Filter Carparks

**Endpoint:** `/carparks`

**Method:** `GET`

**Description:** Retrieves a list of carparks based on the provided filters.

**Query Parameters:**

- `free_parking` (optional): Filter carparks that offer free parking. Accepts `YES` or `NO`.
- `night_parking` (optional): Filter carparks that offer night parking. Accepts `YES` or `NO`.
- `gantry_height` (optional): Filter carparks that meet the specified gantry height. Accepts a numeric value.

**Example Request:**

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const filters = {
    free_parking: 'YES',
    night_parking: 'NO',
    gantry_height: 3.0
};

axios.get(`${API_BASE_URL}/carparks`, { params: filters })
    .then(response => {
        console.log('Filtered carparks:', response.data);
    })
    .catch(error => {
        console.error('Error fetching carparks:', error);
    });
```

**Example Response:**

```json
[
    {
        "car_park_no": "ACB",
        "address": "BLK 270/271 ALBERT CENTRE BASEMENT CAR PARK",
        "x_coord": 30314.7936,
        "y_coord": 31490.4942,
        "car_park_type": "BASEMENT CAR PARK",
        "type_of_parking_system": "ELECTRONIC PARKING",
        "short_term_parking": "WHOLE DAY",
        "free_parking": "NO",
        "night_parking": "YES",
        "car_park_decks": "1",
        "gantry_height": 1.8,
        "car_park_basement": "N"
    },
    // More carparks...
]
```


### 2. Add Favorite

**Endpoint:** `/carparks/add_favorite`

**Method:** `POST`

**Description:** Adds a carpark to the user's favorites.

**Request Body:**

`user_id` (string): The unique id for the user.
`car_park_no` (string): The carpark number to be added to favorites.

**Example Request:**

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const favoriteData = {
    user_id: 'user1',
    car_park_no: 'ACB'
};

axios.post(`${API_BASE_URL}/add_favorite`, favoriteData)
    .then(response => {
        console.log('Added to favorites:', response.data);
    })
    .catch(error => {
        console.error('Error adding favorite:', error);
    });
```

**Example Response:**

```json
{
    "message": "Added to favorites"
}
```