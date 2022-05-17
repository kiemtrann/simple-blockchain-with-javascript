const SHA256 = require('crypto-js/sha256');

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}

class Block {
	constructor(previousHash, transactions) {
		this.previousHash = previousHash;
		this.transactions = transactions;
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
			this.mineVar++;
			this.hash = this.calculateHash();
		}
	}
}

class Blockchain {
	constructor(difficulty) {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = difficulty;
		this.pendingTransactions = [];
		this.miningReward = 1000;
	}
	createGenesisBlock() {
		return new Block('Genesis block', '0');
	}
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}
	minePendingTransactions(miningRewardAddress) {
		let block = new Block('', this.pendingTransactions);
		block.mineBlock(this.difficulty);
		console.log('Block successfully mined!');
		this.chain.push(block);
		this.pendingTransactions = [
			new Transaction(null, miningRewardAddress, this.miningReward),
		];
	}
	createTransaction(transaction) {
		this.pendingTransactions.push(transaction);
	}
	getBalanceAddress(address) {
		let balance = 0;
		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= trans.amount;
				}
				if (trans.toAddress === address) {
					balance += trans.amount;
				}
			}
		}
		return balance;
	}
}

let enouCoin = new Blockchain(3);
enouCoin.createTransaction(new Transaction('address1', 'address2', 500));
enouCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
enouCoin.minePendingTransactions('address1');

console.log(`\nBalance of address1 is`, enouCoin.getBalanceAddress('address1'));
console.log(`\nBalance of address2 is`, enouCoin.getBalanceAddress('address2'));

// enouCoin.minePendingTransactions('address1');

// console.log(`\nBalance of address1 is`, enouCoin.getBalanceAddress('address1'));
// console.log(`\nBalance of address2 is`, enouCoin.getBalanceAddress('address2'));

console.log(JSON.stringify(enouCoin, null, 4));
