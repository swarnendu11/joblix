"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const account_1 = __importDefault(require("./routes/account"));
const resume_1 = __importDefault(require("./routes/resume"));
const ai_1 = __importDefault(require("./routes/ai"));
const pdf_1 = __importDefault(require("./routes/pdf"));
const stripe_1 = __importDefault(require("./routes/stripe"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
// Routes
app.use('/api/stripe/webhook', express_1.default.raw({ type: 'application/json' }));
app.use(express_1.default.json());
app.use('/api/account', account_1.default);
app.use('/api/resumes', resume_1.default);
app.use('/api/ai', ai_1.default);
app.use('/api/pdf', pdf_1.default);
app.use('/api/stripe', stripe_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
