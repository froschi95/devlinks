import { NextApiRequest, NextApiResponse } from "next";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../utils/firebase";
import { AuthError } from "firebase/auth";

// Handler for registering a new user
const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.status(200).json({ user: userCredential.user });
  } catch (error) {
    const authError = error as AuthError;
    res.status(400).json({ error: authError.message });
  }
};

// Handler for logging in a user
const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.status(200).json({ user: userCredential.user });
  } catch (error) {
    const authError = error as AuthError;
    res.status(400).json({ error: authError.message });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { action } = req.query;

    if (action === "register") {
      return registerHandler(req, res);
    } else if (action === "login") {
      return loginHandler(req, res);
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
