// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingPrice = 0.001 ether;

    constructor() {
        owner = payable(msg.sender); // Owner of the contract is the person deploying it
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string modelUri;
        string title;
        string lat;
        string long;
        string description;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint indexed tokenId,
        address seller,
        address owner,
        uint price,
        bool sold,
        string modelUri,
        string title,
        string lat,
        string long,
        string description
    );

    // Get the basic listing price of the items
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
    
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory modelUri,
        string memory title,
        string memory lat,
        string memory long,
        string memory description) 
        public payable nonReentrant {
            require(price > 0, "Price must be valid.");
            require(msg.value == listingPrice, "Price must be equal to the listing price.");

            _itemIds.increment();
            uint256 itemId = _itemIds.current();

            idToMarketItem[itemId] = MarketItem(
                itemId,
                nftContract,
                tokenId,
                payable(msg.sender),
                payable(address(0)),
                price,
                false,
                modelUri,
                title,
                lat,
                long,
                description
            );

            // Transfer ownership to the contract
            IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

            emit MarketItemCreated(itemId, nftContract, tokenId, msg.sender, address(0), price, false, modelUri, title, lat, long, description);
    }

    function createMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;
        bool sold = idToMarketItem[itemId].sold;

        // require(msg.value == price, "Please submit the asking price in order to complete this purchase.");
        require(msg.sender.balance >= price, "Insufficient funds.");
        require(!sold, "This item was already sold.");

        // Send money to the seller
        idToMarketItem[itemId].seller.transfer(price);

        // Transfer ownership to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        // payable(owner).transfer(price);

    }

    // Get unpurchased NFTs
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;

    }

    function fetchAllNFTs() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < itemCount; i++) {
            uint currentId = idToMarketItem[i + 1].itemId;
            MarketItem storage currentItem = idToMarketItem[currentId];
            items[i] = currentItem;
        }

        return items;
    }

    // Get purchased NFTs
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        // Get the amount of owned NFTs
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }
}