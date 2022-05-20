const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, data, previousHash) {
		this.index = index;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = new Date();
		this.hash = this.calculateHash();
	}
	calculateHash() {
		return SHA256(
			this.index +
				this.previousHash +
				JSON.stringify(this.data) +
				this.timestamp
		).toString();
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}
	createGenesisBlock() {
		return new Block(0, 'Genesis block', '0');
	}
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}
	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

let enouvo = new Blockchain();
enouvo.addBlock(new Block(1, { amount: 12 }));
enouvo.addBlock(new Block(2, { amount: 18 }));

console.log(JSON.stringify(enouvo, null, 4));
