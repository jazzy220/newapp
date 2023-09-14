import React,{Component} from "react";
import Fadingwheel from '../Fading wheel.gif'
export class Spinner extends Component{
    render(){
        return(
            <div className="d-flex justify-content-center my-4">
                <img src={Fadingwheel}alt="loading"style={{width:"2rem"}}>

                </img>
            </div>
        )
    }
}