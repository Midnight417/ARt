const { uploadToStorage } = require("../../helpers/upload");

module.exports = (app) => {
  
    app.post("/upload", async (req, res) => {
        const { b64data, format } = req.body;

        // Make sure the required data is available
        if (!b64data || !format) return res.send({ success: false, msg: "Invalid call." });

        if (format === "image" || format === "3dObject") {

            try {

                const publicUrl = await uploadToStorage(b64data, format);
                return res.send({ success: true, msg: "Success.", url: publicUrl });

            } catch(err) {

                return res.send({ success: false, msg: "Could not upload the file. " + err });

            }

        } else {

            return res.send({ success: false, msg: "Invalid format." });

        }

    });
  
  };