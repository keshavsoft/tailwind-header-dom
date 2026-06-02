// src/header.js
import initHeader from "../bin/header/v2/commands/header/template/v2/initHeader.js";

(async () => {
    window.KSHeaderVersion = "v2.2";

    window.KSHeader = initHeader;
})();