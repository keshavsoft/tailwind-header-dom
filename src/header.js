// src/header.js
import initHeader from "../bin/header/v4/commands/header/template/v2/initHeader.js";

(async () => {
    window.KSHeaderVersion = "v4.2";

    window.KSHeader = initHeader;
})();