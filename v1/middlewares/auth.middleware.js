import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const authHeaders = req.headers["authorization"];

    if (!authHeaders) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const token = authHeaders.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No autorizado" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token no válido" });
        } else {
            // Guardamos toda la info del usuario en req.user
            req.user = { id: user._id, email: user.email};
            next();
        }
    });
};