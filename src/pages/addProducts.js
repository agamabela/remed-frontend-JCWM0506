import axios from 'axios';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { URLAPI } from '../helper';
import { Table } from 'reactstrap'
import moment from 'moment';
import { getProduct } from '../actions';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Modal } from 'react-bootstrap'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [

            ],
            status: '',

        }
    }
    componentDidMount() {
        this.getProductData()
    }


    editProduct = (data) => {
        <Form>
            {console.log("tanggal euy", parseInt(Date.now()))}
            <FormGroup>
                <Label for="exampleEmail">Nama Barang</Label>
                <Input type="email" name="email" id="exampleEmail" innerRef={el => this.newNama = el} placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Stock</Label>
                <Input type="email" name="email" id="exampleEmail" innerRef={el => this.newStok = el} placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input type="select" name="select" innerRef={el => this.newMenu = el}>
                    <option value="electronic">Electronic</option>
                    <option value="handphone">Handphone</option>
                    <option value="furniture">Furniture</option>
                    <option value="beauty">Beauty</option>
                    <option value="fashion">Fashion</option>
                    <option value="fooddrink">Food&Drink</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Harga</Label>
                <Input type="email" name="email" id="exampleEmail" innerRef={el => this.newHarga = el} placeholder="with a placeholder" />
            </FormGroup>
        </Form>
        axios.patch(URLAPI + `/products?id=${this.props.idproducts}`, {
            name: this.newNama.value,
            stock: this.newStok.value,
            price: this.newHarga.value,
            kategori: this.newMenu.value


        }).then(res => {
            console.log("edit berhasil", res.data)
        }).catch(err => {
            console.log("edit error", err)
        })
    }

    getProductData = () => {
        axios.get(URLAPI + `/products`)
            .then(res => {
                this.props.getProduct(res.data)
                console.log("data getData", res.data)
                this.setState({ product: res.data })
            }).catch(err => {
                console.log("error getData", err)
            })
    }
    getStock = () => {
        if (this.stok.value == 0) {
            alert("Stock tidak boleh 0")
        } else {
            return this.stok.value
        }
    }

    hapusProduct = () => {
        axios.patch(URLAPI + `/products?id=${this.props.idproducts}`, {
            status: "non-available"
        }).then(res => {
            console.log("hasil hapus", res.data)
        }).catch(err => {
            console.log("error hapus", err)
        })


    }
    printProduct = () => {
        console.log("product", this.state.product)
        return this.state.product.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{moment(item.date).format("DD MMM, YYYY")}</td>
                    <td>{item.name}</td>
                    <td>{item.serial}</td>
                    <td>{item.stock}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    <td><Button onClick={this.hapusProduct}>Hapus</Button></td>
                    <td><Button onClick={this.editProduct(item)}>Edit</Button></td>
                </tr>
            )
        })
    }
    // getSerialNumber=()=>{
    //     tanggal=Date.now()

    // }

    addProduct = () => {
        // console.log("serial number",serialNum)
        if (this.nama.value == '' || this.harga.value == '' || this.stok.value == '' || this.menu.value == '') {
            alert("Form tidak boleh kosong")
        } else {
            axios.post(URLAPI + `/products`, {
                name: this.nama.value,
                price: parseInt(this.harga.value),
                stock: this.getStock(),
                date: Date.now(),
                serial: parseInt(Date.now()),
                category: this.menu.value,
                status: "available"



            }).then(res => {
                console.log("res data", res.data)
            }).catch(err => {
                console.log("error post", err)
            })
        }

    }

    render() {
        return (
            <div>
                <div style={{ width: '50vw', margin: 'auto', marginTop: '15vh', backgroundColor: '#f8f9fa', padding: '2vw' }}>
                    <Form>
                        {console.log("tanggal euy", parseInt(Date.now()))}
                        <FormGroup>
                            <Label for="exampleEmail">Nama Barang</Label>
                            <Input type="email" name="email" id="exampleEmail" innerRef={el => this.nama = el} placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Stock</Label>
                            <Input type="email" name="email" id="exampleEmail" innerRef={el => this.stok = el} placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Select</Label>
                            <Input type="select" name="select" innerRef={el => this.menu = el}>
                                <option value="electronic">Electronic</option>
                                <option value="handphone">Handphone</option>
                                <option value="furniture">Furniture</option>
                                <option value="beauty">Beauty</option>
                                <option value="fashion">Fashion</option>
                                <option value="fooddrink">Food&Drink</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Harga</Label>
                            <Input type="email" name="email" id="exampleEmail" innerRef={el => this.harga = el} placeholder="with a placeholder" />
                        </FormGroup>
                    </Form>
                    <Button type="submit" onClick={this.addProduct}>Add</Button>
                </div>
                <div>
                    <Table>


                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tanggal</th>
                                <th>Nama Produk</th>
                                <th>Serial Number(SN)</th>
                                <th>Stok</th>
                                <th>Kategori</th>
                                <th>Harga</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printProduct()}
                        </tbody>
                    </Table>
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ productReducers }) => {
    return {
        idproducts: productReducers.id
    }
}
export default connect(mapStateToProps, { getProduct })(AddProduct);