require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// auslesung neuer daten aus .env
const CLIENT_ID = process.env.WCL_CLIENT_ID;
const CLIENT_SECRET = process.env.WCL_CLIENT_SECRET;

app.use(cors());

// Hilfsfunktion: Holt ein OAuth-Token von Warcraft Logs V2
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

app.get('/api/get-wcl-data', async (req, res) => {
    try {
        console.log("Hole V2 Access Token...");
        const token = await getAccessToken();

        // Die GraphQL-Query für einen Charakter
const graphqlQuery = {
            query: `
                query {
                    characterData {
                        character(name: "Ámáyá", serverSlug: "blackhand", serverRegion: "eu") {
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

        console.log("Frage V2 GraphQL API an...");
        const response = await axios.post('https://www.warcraftlogs.com/api/v2/client', graphqlQuery, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("V2 Daten erfolgreich erhalten!");
        res.json(response.data);

    } catch (error) {
        console.error("FEHLER bei V2-Abfrage:", error.message);
        res.status(500).json({ error: "Fehler bei der V2-Abfrage" });
    }
});

app.listen(PORT, () => console.log(`V2 Server läuft auf http://localhost:${PORT}`));