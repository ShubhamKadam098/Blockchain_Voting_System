# Blockchain Based Voting System 🌐

This project is a decentralized voting application aimed at ensuring transparent and secure electoral processes by leveraging blockchain technology and Aadhar biometric authentication. This repository contains all the necessary components to set up, deploy, and utilize the system effectively.

## Table of Contents

- [Introduction](#🔍introduction)
- [How It Works](#how-it-works-🤔)
- [Technologies Used](#technologies-used-👨‍💻)
- [Installation Guide](#installation-guide-🚀)
- [Screenshots ](#screenshots-📷)
- [Upcoming](#upcoming-🆕)

## 🔍Introduction

It is critical in modern elections to ensure secure and trustworthy voting systems. Our idea, the Blockchain-Based Voting System, addresses the flaws in traditional voting techniques. Our goal is to create a more secure, transparent, and reliable voting system by utilizing blockchain and Aadhar biometric authentication.

Our mission is to reimagine electoral procedures in order to increase trust, security, and credibility in the voting process.This effort aims at creating raised more trust and credibility in the electoral process, establishing a new standard for fair and safe elections.

## How It Works 🤔

**1. Blockchain Infrastructure**

The system utilizes blockchain technology as its backbone, creating an immutable ledger to store voting records. Each vote is encrypted and added to the blockchain, ensuring tamper-proof records.

**2. Aadhar Biometric Authentication**

To ensure voter identity verification, Aadhar biometric authentication is integrated. Voters authenticate themselves using biometric data, which is securely validated before allowing access to vote.

**3. Voter Registration and Verification**

New voters are registered within the system using Aadhar biometric verification. Once verified, their details are securely stored in the blockchain, ensuring a unique and authentic voter ID.

**4. Casting Votes**

Authenticated voters can securely cast their votes via the interface provided by the application. Each vote is cryptographically signed and added to the blockchain, guaranteeing its immutability.

**5. Real-time Updates**

The system provides real-time updates on voting results, allowing users to view the ongoing electoral outcomes, thereby ensuring transparency and accountability.

**6. Ensuring Integrity**

The combination of blockchain's tamper-proof nature and biometric authentication ensures the integrity of the voting process, minimizing the risks of fraud or manipulation.

## Technologies Used 👨‍💻

The project's technology stack includes:

- **Frontend:** React and Tailwind CSS - Used for creating the user interface, ensuring a responsive design and streamlined development.

- **Aadhaar Backend:** Python and Flask - Powers the backend functionalities for Aadhaar biometric authentication, providing a secure and scalable backend infrastructure.

- **Blockchain:** Ethereum, Solidity, and EtherJS - Implements the blockchain infrastructure, utilizing Ethereum's robust network and Solidity for smart contract development. EtherJS facilitates communication with the Ethereum blockchain.

- **Authentication and Database:** Firebase - Manages user authentication and data storage securely, offering reliable database services for the voting system.

- **Smart Contracts:** Solidity - Used for developing smart contracts within the Ethereum blockchain, ensuring secure and automated execution of voting processes.

## Installation Guide 🚀

### Prerequisites

1. **Install Node.js:** Ensure Node.js is installed on your system for running the frontend application.

2. **Python Installation:** Install Python to run the backend server for Aadhaar authentication.

3. **Metamask Wallet:** Install metamask extension and create an account on the network for blockchain interaction.

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ShubhamKadam098/Blockchain_Voting_System.git
   ```

2. **Project is divided into three main parts:**

- [Smart Contract 🔗](./Contracts/Smart%20Contract.md)
- [Admin Panel 🔗](./Admin%20Panel/Admin%20Panel.md)
- [Aadhar Authentication 🔗](./Auth%20API/Auth%20API.md)
- [Voting System 🔗](./Voting%20System/Voting%20System.md)

To run each module, follow the instructions provided in their respective documentation.

## Screenshots 📷:

- _Admin Panel_
  
![scrnli_12_24_2023_8-59-12 PM](https://github.com/ShubhamKadam098/Blockchain_Voting_System/assets/119697848/31ab7c0e-5bab-4002-be74-f99ff7903152)

![scrnli_12_24_2023_8-59-41 PM](https://github.com/ShubhamKadam098/Blockchain_Voting_System/assets/119697848/aa123b1b-a1a7-4c78-b27a-2d3d7a05c64a)


- _Voting System_
![scrnli_12_24_2023_9-02-06 PM](https://github.com/ShubhamKadam098/Blockchain_Voting_System/assets/119697848/e00a2226-a9ac-4313-be69-a9293810b202)

![scrnli_12_24_2023_9-40-14 PM](https://github.com/ShubhamKadam098/Blockchain_Voting_System/assets/119697848/55e51e39-33c5-4dd7-ba07-d591ec61929c)


## Upcoming 🆕:

We are actively working on ways to run multiple elections simultaneously and tailor candidates for each voter based on their location. Keep an eye out for updates on this exciting feature!

---

**_Disclaimer: This blockchain-based voting system is an ongoing project created for educational and demonstrative purposes. It is not yet fully completed and might not be suitable for production-level elections. Use at your own discretion._**
