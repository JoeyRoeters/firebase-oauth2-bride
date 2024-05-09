const express = require('express');
const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const args = require('minimist')(process.argv.slice(2));

async function getGoogleServiceAccount() {
  const isNpmPackage = await fs.promises.access('../../../package.json').then(() => {
    return true;
  }).catch(() => {
    return false;
  });

  let configPath = args.config;
  if (isNpmPackage && !configPath) throw new Error('The --config option is required when running as an npm package.');

  if (isNpmPackage) {
    configPath = `../../../${configPath}`;
  }

  return JSON.parse(
      await fs.promises.readFile(
          configPath ?? './config/google-service-account.json',
          'utf-8'
      )
  );
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function initializeFirebaseApp() {
  const serviceAccount = await getGoogleServiceAccount();

  const firebaseApp = initializeApp(serviceAccount);
  const auth = getAuth(firebaseApp);

  app.set('auth', auth);
}

initializeFirebaseApp().catch((error) => {
  console.error(error);
  process.exit(1);
});

const port = args.port ?? 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/token', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const userCredential = await signInWithEmailAndPassword(req.app.get('auth'), username, password);

  res.json({
    access_token: userCredential.user.accessToken,
    refresh_token: userCredential.user.refreshToken,
    expires_in: '3600',
    token_type: 'Bearer'
  });
});