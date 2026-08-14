const axios = require('axios');

// Dein V1-Key direkt hier oder sicher über Umgebungsvariablen (.env) einbinden
const API_KEY = process.env.WCL_V1_KEY || 'f3a5bc77b91cb780d88932fb457e2053';

async function getWarcraftLogsData(characterName, serverSlug, region) {
    try {
        // Bei der V1 API hängen wir den Key einfach als Parameter an die URL an
        const url = `https://www.warcraftlogs.com/v1/v1/rankings/character/${characterName}/${serverSlug}/${region}?api_key=${API_KEY}`;

        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.error("Fehler beim Abrufen der WCL-Daten:", error.response?.data || error.message);
        throw error;
    }
}

module.exports = { getWarcraftLogsData };