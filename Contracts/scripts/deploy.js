async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  const candidateNames = [
    "Dhananjay Mane",
    "Parvati Mane (Parshuram)",
    "Shantanu Mane",
    "Sudha Mane (Sudhir)",
    "Leelabai Kalbhor",
    "Vishwas Sarpotdar",
  ];

  const partyNames = ["MNS", "BJP", "INC", "ShivSena", "AAP", "NCP"];

  const cities = ["Mumbai", "Dadar", "Andheri", "Bandra ", "Mumbai", "Byculla"];

  const Voting_ = await Voting.deploy(candidateNames, partyNames, cities, 120);
  console.log("Contract address:", Voting_.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
