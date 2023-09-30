"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("./setting");
const port = process.env.PORT || 3004;
setting_1.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
