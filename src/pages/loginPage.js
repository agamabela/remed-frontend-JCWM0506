import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import  axios  from 'axios'
import { URLAPI } from '../helper';
import { connect } from 'react-redux';
import { authLogin } from '../actions';
import { Redirect } from 'react-router-dom';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onBtLogin = () => {
        axios.get(URLAPI + `/user?email=${this.email.value}&password=${this.password.value}`)
            .then(res => {
                this.props.authLogin(res.data[0])
                alert("Login sukses")
                console.log("data login", res.data)
            }).catch(err => {
                alert("login error")
                console.log("error login")
            })
    }
    render() {
        if(this.props.id){
            return (<Redirect to="/"/>)
        }
        return (
            <div style={{ width: '20vw', margin: 'auto', marginTop: '15vh', backgroundColor: '#f8f9fa', padding: '2vw' }}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" innerRef={el => this.email = el} placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" innerRef={el => this.password = el} placeholder="password placeholder" />
                    </FormGroup>
                </Form>
                <Button onClick={this.onBtLogin}>Login</Button>
            </div>


        );
    }
}
const mapToProps=({authReducer})=>{
    return {
       id:authReducer.id
    }
}

export default connect(mapToProps,{authLogin}) (LoginPage);