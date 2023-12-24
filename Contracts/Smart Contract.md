# Smart Contract Setup

This guide will walk you through the steps to set up a smart contract development environment using Hardhat.

1. Navigate to contract directory.

```bash
cd Contracts
```

2. Edit enviorment variables. Rename ".env.sample" file to <span style="color:green">".env"</span> and fill the values.

```bash
API_URL="https://volta-rpc.energyweb.org/" //Volta Url
PRIVATE_KEY= // Metamask Private Key
CONTRACT_ADDRESS= // Will find it after deploying the contract
```

3. Now, navigate to scripts/deploy.js and edit the script as you need.

4. Then compile the contract.

```bash
npx hardhat compile
```

5. finally deploy the smart contract.\
   _(Note: Make sure you have enough volta tokens in your wallet. If you don't have balace [visit this website](https://voltafaucet.energyweb.org/) to add tokens.)_

````bash
npx hardhat run --network volta scripts/deploy.js```
````

_Note: After deploying the contract you will find contract address keep the note address as we will require it while connecting out front end._

# Volta Network Setup

1. Go to Metamask settings.
2. Select Networks.
3. Click on "Add Network Manually".
4. Fill following network details and save.
