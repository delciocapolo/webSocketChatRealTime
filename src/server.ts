import { serverHttp } from "./http";
import "./websocket";
import dotenv from 'dotenv'

dotenv.config();
const PORT = process.env.PORT;

serverHttp.listen(PORT, () => console.log(`Server is running at ${PORT}`));