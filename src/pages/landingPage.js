import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {Table} from 'reactstrap'
import { URLAPI } from '../helper';
import {getProduct} from '../actions'
import moment from 'moment';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:[]
         }
    }

    componentDidMount() {
        this.getData()
    }
    getData = () => {
        axios.get(URLAPI + `/products`)
            .then(res => {
                this.props.getProduct(res.data)
                console.log("data getData", res.data)
                this.setState({products:res.data})
            }).catch(err => {
                console.log("error getData", err)
            })
    }
    printProduct = () => {
        console.log("product", this.state.products)
   return this.state.products.map((item,index)=>{
        return(
           <tr>
               <td>{index+1}</td>
               <td>{moment(item.date).format("DD MMM, YYYY")}</td>
               <td>{item.name}</td>
               <td>{item.serial}</td>
               <td>{item.stock}</td>
               <td>{item.price}</td>
           </tr>
        )
    })
}
    render() { 
        return (  <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tanggal</th>
                        <th>Nama Produk</th>
                        <th>Serial Number(SN)</th>
                        <th>Stok</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {this.printProduct()}
                </tbody>
            </Table>
        </div>
        
        );
    }
}

 
export default connect (null,{getProduct}) (LandingPage);