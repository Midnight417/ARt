import * as NFT from "./NFT.json";
import * as Market from "./NFTMarket.json";
import * as ethers from "ethers";

var nftaddress = "0x7C728214be9A0049e6a86f2137ec61030D0AA964";
var marketaddress = "0xaD888d0Ade988EbEe74B8D4F39BF29a8d0fe8A8D";
var blockchain = "http://35.226.196.97:7585"

module.exports = { 

    // Get all NFTs
    getNFTs: async function() {
        const provider = new ethers.providers.JsonRpcProvider(blockchain)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(marketaddress, Market.abi, provider)
        const data = await marketContract.fetchAllNFTs()

        if (data.length == 0) return [];

        const items = await Promise.all(data.map(async i => {
            var price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                modelUri: i.modelUri,
                title: i.title,
                lat: i.lat,
                long: i.long,
                descrition: i.description
            }
            return item;
        }));
        
        return items;
    },

    getMarketNFTs: async function() {
        const provider = new ethers.providers.JsonRpcProvider(blockchain)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(marketaddress, Market.abi, provider)
        const data = await marketContract.fetchMarketItems()

        if (data.length == 0) return [];

        const items = await Promise.all(data.map(async i => {
            var price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                modelUri: i.modelUri,
                title: i.title,
                lat: i.lat,
                long: i.long,
                descrition: i.description
            }
            return item;
        }));
        
        return items;
    },

    getListingPrice: async function() {
        const provider = new ethers.providers.JsonRpcProvider(blockchain)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(marketaddress, Market.abi, provider)
        const data = await marketContract.getListingPrice()
        
        return data;
    },

    createNFT: async function(privateKey, { modelUri, title, lat, long, description }) {

        const provider = new ethers.providers.JsonRpcProvider(blockchain);
        const wallet = new ethers.Wallet(privateKey, provider);
        
        let contract = new ethers.Contract(nftaddress, NFT.abi, wallet)
        let transaction = await contract.createToken()
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.formatUnits('0.001', 'ether');
    
        contract = new ethers.Contract(marketaddress, Market.abi, wallet)
        var listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();

        transaction = await contract.createMarketItem(nftaddress, tokenId, price, modelUri, title, lat, long, description, { value: listingPrice })
        await transaction.wait()
    },

    buyNFT: async function(privateKey, nftId) {
        const provider = new ethers.providers.JsonRpcProvider(blockchain);
        const wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(marketaddress, Market.abi, wallet);

        var listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();

        var transaction = await contract.createMarketSale(nftaddress, nftId);
        await transaction.wait()

    },

    // Get owned NFTs
    getMyNFTs: async function(privateKey) {
        const provider = new ethers.providers.JsonRpcProvider(blockchain);
        const wallet = new ethers.Wallet(privateKey, provider);

        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, wallet);
        const marketContract = new ethers.Contract(marketaddress, Market.abi, wallet);
        const data = await marketContract.fetchMyNFTs();

        if (data.length == 0) return [];

        const items = await Promise.all(data.map(async i => {
            var price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                modelUri: i.modelUri,
                title: i.title,
                lat: i.lat,
                long: i.long,
                descrition: i.description
            }
            return item;
        }))
        
        return items;
    },

    // Get owned NFTs
    getCreatedNFTs: async function(privateKey) {
        const provider = new ethers.providers.JsonRpcProvider(blockchain);
        const wallet = new ethers.Wallet(privateKey, provider);

        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, wallet);
        const marketContract = new ethers.Contract(marketaddress, Market.abi, wallet);
        const data = await marketContract.fetchItemsCreated();

        if (data.length == 0) return [];

        const items = await Promise.all(data.map(async i => {
            var price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                modelUri: i.modelUri,
                title: i.title,
                lat: i.lat,
                long: i.long,
                descrition: i.description
            }
            return item;
        }))
        
        return items;
    },



 }

