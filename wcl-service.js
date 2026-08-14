require('dotenv').config();
const axios = require('axios');

const CLIENT_ID = process.env.WCL_CLIENT_ID;
const CLIENT_SECRET = process.env.WCL_CLIENT_SECRET;

// Hilfsfunktion: Holt das OAuth-Token von Warcraft Logs V2
async function getAccessToken() {
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    try {
        const response = await axios.post('https://www.warcraftlogs.com/oauth/token', 'grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Fehler beim Token-Abruf:", error.response?.data || error.message);
        throw new Error("Konnte kein V2-Token generieren");
    }
}

// Funktion für den Charakter-Abruf über V2 GraphQL
async function getWarcraftLogsData(characterName = "Amaya", serverSlug = "blackhand", region = "eu") {
    try {
        const token = await getAccessToken();

        const graphqlQuery = {
            query: `
                query {
                    characterData {
                        character(name: "${characterName}", serverSlug: "${serverSlug}", serverRegion: "${region}") {
                            name
                            id
                            classID
                            level
                            server { 
                                name 
                            }
                        }
                    }
                }
            `
        };

        const response = await axios.post('https://www.warcraftlogs.com/api/v2/client', graphqlQuery, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;

    } catch (error) {
        console.error("Fehler beim Abrufen der V2-WCL-Daten:", error.message);
        throw error;
    }
}

module.exports = { getWarcraftLogsData };