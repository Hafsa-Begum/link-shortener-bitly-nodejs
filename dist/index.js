"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
async function urlShortener(longUrl) {
    const token = process.env.BITLY_URL_SHORTENER_ACCESS_TOKEN; // Replace with your Bitly access token
    try {
        const response = await axios_1.default.post('https://api-ssl.bitly.com/v4/shorten', { long_url: longUrl }, // Request body
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        // Extract and return the short link
        return response.data.link;
    }
    catch (error) {
        console.error('Error creating short link:', error.response?.data || error.message);
        throw error;
    }
}
// Example usage
urlShortener('https://lehoa.app/experiences/home?pid=66f457925c2ecb5575e60204')
    .then(shortLink => {
    console.log('Short Link:', shortLink);
})
    .catch(error => {
    console.error('Failed to create short link:', error.message);
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Up' });
});
app.use((_req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});
const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
//# sourceMappingURL=index.js.map