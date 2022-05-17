const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(index, previousHash, data) {
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

const block = new Block(0, '', { hello: 'world' });

console.log(block);
