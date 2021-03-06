import React from "react";
import './shop.scss';
import { SHOP_DATA } from "./shop.data";
import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";

export class ShopPage extends React.Component {
    constructor() {
        super();

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections} = this.state;
        return (
            <div className="shop-page">
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <CollectionPreview id={id} {...otherCollectionProps} />
                    ))
                }
            </div>
        )
    }
}