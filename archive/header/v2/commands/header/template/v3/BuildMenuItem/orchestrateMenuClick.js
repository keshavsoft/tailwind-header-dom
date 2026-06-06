import { getKSTableConfig } from "./getKSTableConfig.js";
import { callKSTable } from "./callKSTable.js";

export const orchestrateMenuClick1 = async (event) => {
    event.preventDefault();

    const currentTarget = event.currentTarget;
    // debugger;
    const config = await getKSTableConfig({
        tableName: currentTarget.dataset.tableName
    });

    await callKSTable(config);
};

export const orchestrateMenuClick =
    ({ onClick }) =>
        async (event) => {
            // debugger;
            event.preventDefault();

            const currentTarget = event.currentTarget;
            // debugger;
            const config = await getKSTableConfig({
                tableName: currentTarget.dataset.tableName
            });

            const fromCallKSTable = await callKSTable(config);
            console.log("fromCallKSTable : ", fromCallKSTable);

            if (onClick) {
                await onClick(event);
            };
        };