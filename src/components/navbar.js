import React from 'react';
import {

    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    ButtonToggle,
    Badge

} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { authLogout } from '../actions';

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            product:[]
        }
    }
    getSumProduct = () => {
        let barang = 0;
        this.props.product.forEach((item) => {
            barang += item;
        });
        return barang;
        // return this.props.getSumProductAction(barang);
    };
    render() {
        return (<div>
            <Navbar color="light" light expand="md">
                <Link className="nav-brand" style={{ textDecoration: 'none', fontWeight: 'bold' }} to="/" >Simple Commerce</Link>

                <NavbarToggler />

                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink><Link to="/add">Product</Link></NavLink>
                    </NavItem>

                </Nav>

                {
                    this.props.id ?
                        <>
                            <ButtonToggle color="success">Hello, {this.props.email}</ButtonToggle>
                            <ButtonToggle color="success">{this.getSumProduct}</ButtonToggle>
                            <ButtonToggle color="success" onClick={this.props.authLogout}>Logout</ButtonToggle>
                        </>
                        :

                        <Link className="nav-link" to="/login">Login</Link>
                }
            </Navbar>
        </div>);
    }
}
const mapStateToProps = ({ authReducer, productReducers }) => {
    return {
        email: authReducer.email,
        id: authReducer.id,
        product:productReducers.products


    }
}

export default connect(mapStateToProps, { authLogout })(NavbarComp);