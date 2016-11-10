import * as React from 'react';
import '../../css/product/product.scss';
import ProductSearchService from  './product_search_service';
import * as Models from './product_search_model';
import ProductSearchCard from './product_search_card';

import {debounce, union, flatMap, includes} from 'lodash';
import {IJsonResult} from "../core/soluble_flexstore";
import {ProductSearchParams} from "./product_search_service";


export interface ProductSearchProps {
    source: string;
    pricelist: string;
    language: string;
    searchDebounceTime?: number;
    searchInputTarget?: string;
    hideSearchInput: boolean;
    locale?: string;
    searchLimit?: number;

}

export interface ProductSearchState {
    products: Array<Models.ProductSearchModel>;

}


class ProductSearch extends React.Component<ProductSearchProps, ProductSearchState> {

    productSearchService?: ProductSearchService;

    debouncedSearch: any;
    searchDebounceTime: number = 400;
    searchLimit: number = 50;
    locale: string = 'fr-FR';

    searchCount: number = 0;

    previousSearchParams: ProductSearchParams;

    constructor(props: ProductSearchProps) {

        super(props);

        if (props.searchDebounceTime) {
            this.searchDebounceTime = props.searchDebounceTime;
        }

        if (props.searchLimit) {
            this.searchLimit = props.searchLimit;
        }

        if (props.locale) {
            this.locale = props.locale;
        };

        this.productSearchService = new ProductSearchService({
            source: props.source,
            locale: this.locale
        });

        this.state = {
            products: []
        };
        this.debouncedSearch = debounce((query: string) => {
            this.searchProducts(this.getSearchParams(query));

        }, this.searchDebounceTime);
    }

    getSearchParams(query?: string) : ProductSearchParams {

        let searchParams = {
            pricelist: this.props.pricelist,
            language: this.props.language,
            query: query,
            limit: this.searchLimit
        };
        return searchParams;

    }

    loadMore() {
        let searchParams = this.previousSearchParams;
        searchParams.query = 'pb45';
        this.searchProducts(searchParams, true);
    }

    searchProducts(searchParams: ProductSearchParams, append: boolean=false) {

        this.searchCount++;
        this.previousSearchParams = searchParams;

        this.productSearchService.searchProducts(searchParams).then(
            (response?: IJsonResult) => {
                if (response) {
                    let data = [];
                    if (append) {
                        let newData = this.state.products;
                        let currentIds = this.state.products.map((item) => {
                            return item.product_id;
                        });
                        // Add only if product is not yet displayed
                        response.data.forEach(function(record, index) {
                            if (!includes(currentIds, record.product_id)) {
                                newData.push(record);
                            }
                        });
                        data = newData;
                    } else {
                        data = response.data;
                    }
                    this.setState({
                        products: data
                    });
                }
            }
        );
    }

    componentDidMount() {

        this.searchProducts(this.getSearchParams());

        if (this.props.searchInputTarget) {
            let target = document.getElementById(this.props.searchInputTarget);
            target.focus();
            let searchInput = this.refs['searchInput'] as HTMLInputElement;
            target.addEventListener('keyup', (evt: any) => {
                searchInput.value = evt.target.value;

                /*
                var event = new Event('change');
                searchInput.dispatchEvent(event);
                */

                this.debouncedSearch(evt.target.value)
            });
        }

    }


    render() {

        let input = <input type="text" ref="searchInput" onChange={(evt: any) => this.debouncedSearch(evt.target.value) }/>;
        let products = this.state.products;
        let productsCount = products.length;

        let searchInputStyle = {
            display: this.props.hideSearchInput ? 'none' : 'block'
        };

        const noResults = () => {
            return (
                <div className="no-results">
                    No result...
                </div>
            );
        };

        let moreProduct = () => {
            return (
                <div className="">
                    <button className="btn btn-secondary" onClick={(evt) => this.loadMore() }>Load more ... </button>
                </div>
            );
        }

        let hasMore = 1000;
        let displayMoreProducts = ((this.searchCount > 0) && productsCount > 0 && (hasMore > 0));
        let displayNoResults = (productsCount == 0 && this.searchCount > 0);

        return (
            <div>
                <div style={ searchInputStyle }>
                    { input }
                </div>
                        { (productsCount > 0) ?
                            <div className="product-list-container">
                                {products.map((product) =>
                                    <ProductSearchCard key={product.product_id}
                                                       product={product}
                                                       locale={this.locale} />
                                )
                                }
                            </div>
                            : ''
                        }

                        { displayMoreProducts && moreProduct() }

                        { displayNoResults && noResults()}

            </div>
        );
    }

}

export default ProductSearch;