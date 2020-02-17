import React, { Component } from 'react';
import axios from 'axios'
import { TextField,Grid,Paper,Button} from '@material-ui/core';
import {GiWeightLiftingUp} from 'react-icons/gi';
import swal from 'sweetalert';

export default class loadtest extends Component {

    constructor(){
        super();
        this.state = {
            result:[],
            meth : [{
                value: 'GET',
                label: 'GET',
            },{
                value: 'POST',
                label: 'POST',
            },{
                value: 'PUT',
                label: 'PUT',
            },{
                value: 'DELETE',
                label: 'DELETE',
            }],
            details : {
                url:"",
                method:"",
                rps:0,
                header:"",
                concurrency:0,
                body: "",
                requests: 0,
            }
        }
    }

    handlechange = (e) =>{
        if(e.target.name==="method")
        e.target.value = e.target.value.toUpperCase()

        this.setState({details : {...this.state.details,[e.target.name]:e.target.value}})
    }

    test = () =>{
        if(this.state.details.url===""||this.state.details.method===""||this.state.details.rps===0||this.state.details.concurrency===0||this.state.details.requests===0)
        swal("Enter all the required field",{ icon: "error"})
        else{
            axios.post("api/test",{
                details : this.state.details
            }).then((response)=>{
                this.setState({result:[response.data]})
                console.log(this.state.result)
            })
        }
    }

    render() {
        return (
            <div>
                <form>
                    <Grid container spacing={3} xs={false} sm={8} md={10} component={Paper} elevation={6} square>
                        <div id="header"><h1><GiWeightLiftingUp className="icon"/>LOAD TEST<GiWeightLiftingUp className="icon"/></h1></div>
                        
                        <Grid item xs={12} >
                            <TextField fullWidth autoComplete="off" id="outlined-basic" label="Loadtest URl" variant="outlined" name="url" onChange={(e)=>this.handlechange(e)}/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth select id="outlined-basic" label="Method" variant="outlined" name="method" onChange={(e)=>this.handlechange(e)}>
                                {
                                    this.state.meth.map((option)=>{
                                        return(
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>)
                                    })
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth id="outlined-basic" label="RPS" type="number" variant="outlined" name="rps" onChange={(e)=>this.handlechange(e)}/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required fullWidth id="outlined-basic" label="concurrency" type="number" variant="outlined" name="concurrency" onChange={(e)=>this.handlechange(e)}/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth id="outlined-basic" label="max requests" type="number" variant="outlined" name="requests" onChange={(e)=>this.handlechange(e)}/>
                        </Grid>
                        {(this.state.details.method==="POST"||this.state.details.method==="PUT")?<div><Grid item xs={12} >
                            <TextField   multiline={true} fullWidth id="outlined-basic" label="body" variant="outlined"/>
                        </Grid><Grid item xs={12} >
                            <TextField   multiline={true} fullWidth id="outlined-basic" label="header" variant="outlined"/>
                        </Grid></div>:<div></div>}
                        <Grid item xs={12} >
                            <Button fullWidth variant="contained" color="secondary" onClick={()=>this.test()}>Test the LOAD!!!</Button>  
                        </Grid> 
                    </Grid>
                </form>
                { this.state.result.map((data)=>{
                    return(
                        <div id="resultcontainer">
                            <h2>Result</h2>
                            <table>
                                <tr>
                                    <td>Total Requests :</td>
                                    <td>{data.totalRequests}</td>
                                </tr>
                                <tr>
                                    <td>Total Errors :</td>
                                    <td>{data.totalErrors}</td>
                                </tr>
                                <tr>
                                    <td>Total Time Taken :</td>
                                    <td>{Number((data.totalTimeSeconds).toFixed(2))}s</td>
                                </tr>
                                <tr>
                                    <td>Requests Per Second excecuted :</td>
                                    <td>{data.rps}</td>
                                </tr>
                                <tr>
                                    <td>Mean Latency :</td>
                                    <td>{data.meanLatencyMs}ms</td>
                                </tr>
                                <tr>
                                    <td>Max Latency :</td>
                                    <td>{data.maxLatencyMs}ms</td>
                                </tr>
                                <tr>
                                    <td>Min Latency :</td>
                                    <td>{data.minLatencyMs}ms</td>
                                </tr>
                            </table>
                        </div>
                    )
                })}
            </div>
        )
    }
}
