import React, { PropTypes } from 'react';
var range = require('lodash.range');
const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
};
 //initial page is 1
const defaultProps = {
    initialPage: 1
};
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
 // call the parent component method onChangePage to update the index values from array
    setPage(page) {
        let items = this.props.items;
        let pager = this.state.pager;
       if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(items.length, page);
        // get the array object
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        //logic to input enable and disable
        let enable= (page === this.state.pager.totalPages);
        if(typeof this.state.pager.totalPages == 'undefined' )
        {
            enable=true;
        }
        this.props.onChangePage(pageOfItems,enable);
  
    }
    // get the page related values
    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize =  1;
        let totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage, endPage;
        if (totalPages <= 1) {
            startPage = 1;
            endPage = totalPages;
        } 

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages =new Array(startPage,endPage+1);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        let pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // less than length nothing to show bellow page index 
            return null;
        }
 
        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
              
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
    }
}
 
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;