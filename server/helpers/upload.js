const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require('path');

const storage = new Storage({
    keyFilename: './google_credentials.json'
}); // Google Cloud storage

const bucketName = "art-nfts"; // Cloud storage bucket name

async function uploadToStorage(base64_file, format) { // Upload image as base64 and return url

    return new Promise(async (resolve, reject) => {

        const uuid = uuidv4();
        var fileName = uuid + (format === "image" ? ".jpg" : ".gltf");

        var buffer = base64_to_buffer(base64_file);

        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false
        });

        var publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`; // Generate public url
        blobStream.on('finish', () => {
            console.log("Uploaded the image successfully.");
            resolve(publicUrl);
        })
            .on('error', (err) => {
                console.log("Unable to upload the image, something went wrong", err);
                reject(err);
            })
            .end(buffer)
    });
}

function base64_to_buffer(base64_string) {
    return Buffer.from(base64_string, "base64");
}


module.exports = { uploadToStorage, base64_to_buffer }