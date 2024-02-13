"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContext = exports.AuthProviderWrapper = void 0;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const AuthContext = (0, react_1.createContext)(undefined);
exports.AuthContext = AuthContext;
const AuthProviderWrapper = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const storeToken = (token) => localStorage.setItem("authToken", token);
    const verifyStoredToken = () => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            return axios_1.default
                .get("/api/auth/verify", { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((response) => {
                const user = response.data;
                setUser(user);
                setIsLoggedIn(true);
                setIsLoading(false);
            })
                .catch((err) => {
                setUser(null);
                setIsLoggedIn(false);
                setIsLoading(false);
            });
        }
        else {
            setIsLoading(false);
        }
    };
    const logoutUser = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/");
    };
    (0, react_1.useEffect)(() => {
        verifyStoredToken();
    }, []);
    return (<AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, verifyStoredToken, logoutUser }}>
      {children}
    </AuthContext.Provider>);
};
exports.AuthProviderWrapper = AuthProviderWrapper;
