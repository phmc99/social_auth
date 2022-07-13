import axios from "axios";
import { Router } from "express";
import { facebookLoginUrl, getFacebookToken, getFacebookUserData } from "../auth/facebook";
import { getGitHubToken, getGitHubUserData, githubLoginUrl } from "../auth/github";
import { getGoogleToken, getGoogleUserInfo, googleLoginUrl } from "../auth/google";

const router = Router()

router.get("/login/github", async (req,res) => {
  res.redirect(githubLoginUrl)
})

router.get("/login/google", async (req,res) => {
  res.redirect(googleLoginUrl)
})

router.get("/login/facebook", async (req,res) => {
  res.redirect(facebookLoginUrl)
})

router.get("/auth/github", async (req,res) => {
  console.log(`The GitHub code is: ${req.query.code}`);

  const token = await getGitHubToken(req.query.code)
  const user = await getGitHubUserData(token)

  res.json(user)
})

router.get("/auth/google", async (req,res) => {
  console.log(`The Google code is: ${req.query.code}`);

  const token = await getGoogleToken(req.query.code)
  const user = await getGoogleUserInfo(token)

  res.json(user)
})

router.get("/auth/facebook", async (req,res) => {
  console.log(`The Facebook code is: ${req.query.code}`);

  const token = await getFacebookToken(req.query.code)
  const user = await getFacebookUserData(token)

  res.json(user)
})

export default router