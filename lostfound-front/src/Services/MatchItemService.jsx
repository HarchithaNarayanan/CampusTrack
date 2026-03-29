import axios from 'axios';

const MATCH_URL = 'http://localhost:9595/lostfound/match';

// @PostMapping("/match")
export const saveMatchItem = (matchItem) => {
    return axios.post(MATCH_URL, matchItem, {
        withCredentials: true
    });
}

// @GetMapping("/match")
export const getAllMatches = () => {
    return axios.get(MATCH_URL, {
        withCredentials: true
    });
}
