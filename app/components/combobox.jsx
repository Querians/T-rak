'use client'
import Combobox from "react-widgets/Combobox";

export default function AutoBox() {
    return(
        <div>
            <p>Category</p>
            <Combobox
            defaultValue="Category"
            data={["Red", "Yellow", "Blue", "Orange"]}
            />
        </div>
    );
}