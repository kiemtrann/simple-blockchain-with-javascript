const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, data, previousHash) {
		this.index = index;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = new Date();
		this.hash = this.calculateHash();
		this.mineVar = 0;
	}
	calculateHash() {
		return SHA256(
			this.index +
				this.previousHash +
				JSON.stringify(this.data) +
				this.mineVar +
				this.timestamp
		).toString();
	}
	mineBlock(difficulty) {
		while (!this.hash.startsWith('0'.repeat(difficulty))) {
			// while (!this.hash.startsWith('0000')) {
			this.mineVar++;
			this.hash = this.calculateHash();
		}
		console.log('Block mine: ', this.hash);
	}
}

class Blockchain {
	constructor(difficulty) {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = difficulty;
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
		console.log('start mining');
		console.time('mineBlock');
		newBlock.mineBlock(this.difficulty);
		console.timeEnd('mineBlock');
		console.log('end mining', newBlock);
		this.chain.push(newBlock);
	}
	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const previousBlock = this.chain[i - 1];
			const currentBlock = this.chain[i];
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

let enouCoin = new Blockchain(4);
enouCoin.addBlock(new Block(1, { amount: 12 }));
enouCoin.addBlock(new Block(2, { amount: 18 }));
