// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        string partyName;
        string city;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping(address => bool) public voters;

    uint256 public startingTime;
    uint256 public endingTime;

    constructor (
        string[] memory _candidateNames,
        string[] memory _partyNames,
        string[] memory _cities,
        uint256 _durationInMin
    ) {
        require(
            _candidateNames.length == _partyNames.length && _candidateNames.length == _cities.length,
            "Input lengths do not match"
        );

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                partyName: _partyNames[i],
                city: _cities[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
        startingTime = block.timestamp;
        endingTime = block.timestamp + (_durationInMin * 1 minutes);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only contract owner can perform this action.");
        _;
    }

    function addCandidate(
        string memory _name,
        string memory _partyName,
        string memory _city
    ) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            partyName: _partyName,
            city: _city,
            voteCount: 0
        }));
    }

    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function getCandidateInfo(uint256 _index) public view returns (
        string memory name,
        string memory partyName,
        string memory city,
        uint256 voteCount
    ) {
        require(_index < candidates.length, "Invalid candidate index.");

        Candidate memory candidate = candidates[_index];
        return (candidate.name, candidate.partyName, candidate.city, candidate.voteCount);
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= startingTime && block.timestamp < endingTime);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= startingTime, "Voting has not started yet.");
        if (block.timestamp >= endingTime) {
            return 0;
        }
        return endingTime - block.timestamp;
    }
}