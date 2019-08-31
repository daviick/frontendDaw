import React, { Component } from 'react';
import logo from '../img/logo.png'

class LayoutLoginPage extends Component {
    componentDidMount(){
        document.title = "Operaciones"
    }
    render () {
        return (  
            <div className="page">
                <div className="page-single">
                    <div className="container">            
                        <div className="row justify-content-center align-items-center minh-90">
                            <div className="col col-login mx-auto">
                                <img src={logo} alt={"logo"}></img>
                                <div className="col-login card-login">
                                    {this.props.children}
                                </div>
                            </div>                                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    }

export default LayoutLoginPage;