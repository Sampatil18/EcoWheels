
import React, { useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { makeGetRequest } from '../util/utils';
import {Divider} from '@mui/material';
import moment from 'moment/moment.js'


export default function Wallet() {

    const history = useHistory();
    const[data,setdata]=useState([])
	const[data1,setdata1]=useState([])
    const[open,setopen]=useState("1")
	const[open1,setOpen1]=useState(false)
	const[otp,setotp]=useState()
    const[eotp,seteotp]=useState()
    const[amt,setamt]=useState()
	const[amount,setamount]=useState(0)

    function change1(){
        setopen("1")
    }
    function change2(){
        setopen("2")
    }
	function change3(){
        setOpen1(true)
    }
	const handleClose = () => {
        setOpen1(false);
    };
	
	function ViewProfile(){
		let bodyFormData = new FormData();
		makeGetRequest("/view/user/byid/"+localStorage.getItem("user_id"), bodyFormData).then((response) => {
			if (response.data.status === "1") {
			 setdata(response.data.data[0])
			 setamount(response.data.data[0].balance)	
			}else{  
			  toast(response.data.message +" warning"); 
			}
					
		}).catch((err) => {
		  toast("There was an error!");
		});
	}


	function ViewWallet(){
		let bodyFormData = new FormData();
		makeGetRequest("/view/transaction/byid/"+localStorage.getItem("user_id"), bodyFormData).then((response) => {
			if (response.data.status === "1") {
			 setdata1(response.data.data)
		  
			}else{  
				setdata1([])
			}
					
		}).catch((err) => {
		  toast("There was an error!");
		});
	}




  
	useEffect(()=>{
	  ViewProfile()
	  ViewWallet()
	},[])

    return (
       <div>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div" className='whiteline'>
          EcoWheels <ElectricCarIcon/>
          </Typography>
        </Toolbar>
      </AppBar>
	<div class="wallet-container text-center">
		<p class="page-title">My E-wallet</p>

		<div class="amount-box text-center">
			<img src="https://lh3.googleusercontent.com/ohLHGNvMvQjOcmRpL4rjS3YQlcpO0D_80jJpJ-QA7-fQln9p3n7BAnqu3mxQ6kI4Sw" alt="wallet"/>
			<p>Total Balance</p>
			<p class="amount">₹{amount}</p>
		</div>

		<div class="btn-group text-center">
			<button  class="btn btn-outline-light" onClick={()=>history.push("/add/money/"+data.balance)}>Add Money</button>
		</div>

{
    (open=="1")?
	<div class="txn-history">
    <h3><b><center>Home</center></b></h3><br/>
	    <Divider/>
        <div className='profiledataev'><b>User Name:</b> <span>{data.ufname}</span></div>
        <Divider/>
        <div className='profiledataev'><b>Email:</b> <span>{data.email}</span></div>
        <Divider/>
        <div className='profiledataev'><b>Contact:</b> <span>{data.contact}</span></div>
        <Divider/>    
    </div> 
	:
<div class="txn-history">
<h3><b><center>Transaction History</center></b></h3><br/>
<>{
(data1.length>0)?data1.map(c=>    
    (<>{
		(c.action=="Credit")?
		<div className='box-data txn-list'><span>{c.evname}</span> <span >{moment(c.date).format("MMM Do YY")}</span><span className='credit-amount'>+ ₹{c.amt}</span></div>: 
		<div className='box-data txn-list'><span>Payment to {c.evname} </span><span>{moment(c.date).format("MMM Do YY")}</span><span className='debit-amount'>- ₹{c.amt}</span></div>
	}
</>
))
:<p className="text-center">No data found</p>
}
</>

</div>			
}
            <div class="footer-menu">
				<div class="row text-center">
					<div class="col-md-4"onClick={change1}>
						<i class="fa fa-home"></i>
						<p >Home</p>
					</div>
					<div class="col-md-4"onClick={change2}>
						<i class="fa fa-inbox"></i>
						<p >Transaction History</p>
					</div>
					<div class="col-md-4"onClick={()=>history.push("/user/dashboard")}>
						<i class="fa fa-home"></i>
						<p >Main Menu</p>
					</div>
				</div>
			</div>
</div>
<ToastContainer/>


</div>
  );
}