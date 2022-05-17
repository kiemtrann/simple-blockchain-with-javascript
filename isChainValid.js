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

let enouCoin = new Blockchain();
enouCoin.addBlock(new Block(1, { amount: 12 }));
enouCoin.addBlock(new Block(2, { amount: 18 }));

// enouCoin.chain[1].data = { amount: 100 };
// enouCoin.chain[1].hash = enouCoin.chain[1].calculateHash();
console.log(JSON.stringify(enouCoin, null, 4));
console.log('Is blockchain valid ? ', enouCoin.isChainValid());
