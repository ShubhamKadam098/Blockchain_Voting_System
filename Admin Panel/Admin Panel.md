# Admin Panel Setup

This guide will assist you in running an admin panel using React for the frontend and Firebase for the backend.

## Prerequisites

1. **Node.js:** Ensure Node.js is installed on your system.
2. **npm or Yarn:** Choose either npm or Yarn as your package manager.
3. **Firebase Account:** Create a Firebase account and set up a project on the Firebase Console.

## Steps:

### 1. Navigate to Admin Panel directory.

```bash
cd "Admin Panel"
```

### 2. Install node modules.

```bash
npm i
```

### 3. Now, navigate to src/constants/ and create file constant.js

```shell
cd src/constants/
touch constant.js
```

### 4. Now edit and fill details inside constant.js

```bash
const contractAddress = ""; // Smart contract address
const contractABI = []; // Contract ABI

export { contractAddress, contractABI };

```

_(Note: You can find Contract ABI inside Contracts\artifacts\contracts\Voting.sol\Voting.json)_

### 5. Now fill the firebase credentials in .env file using .env.sample

```bash
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

### 6. Now run site on local machine.

```shell
npm run dev
```

_(Note: To log into system make sure you have added user using "email&password" in authentication.)_
