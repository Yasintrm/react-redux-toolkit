import { DropdownItem } from "./components/Dropdown/DropDown";

export const buildDrowDownItemsFromArray = (arr: readonly string[]) => {
    return arr.map(item => ({ key: item, label: item, value: item } as DropdownItem));
};
