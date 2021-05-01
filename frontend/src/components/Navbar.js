import React,{useState,useContext} from 'react'
import { Button,Navbar,Form,FormControl,Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../newapp2.css';
import Login from './Login.js'
import SignUp from './SignUp.js'
import {NavLink} from 'react-router-dom'
import {DisplayContext} from './displayContext.js';
import {LoginContext} from './loginContext.js'
import {UserContext} from './userDetailsContext.js'
import {FavContext} from './Context.js';
import Cards from './Card.js'




const Header=()=>{
		const searchUrl="https://api.themoviedb.org/3/search/movie?&api_key="+process.env.REACT_APP_API_KEY+"&query=";
		const [user,setUser]=useContext(UserContext)
		const [search,setSearch]=useState("");
		const [display,setDisplay]=useContext(DisplayContext)
		const [loginState,setLoginState]=useContext(LoginContext)
		const [fav,setFav]=useContext(FavContext)
		const inputHandle=(e)=>{
				let searchString=e.target.value
				setSearch(searchString)
			}
		const searchHandle=async (e)=>{
				e.preventDefault()
				
				const res=await fetch(searchUrl+search)
				const resData=await res.json()
				const movieData=resData.results;
				console.log(movieData)
				setDisplay(movieData)
				
				}
			const loginHandle=async()=>{
					
					setLoginState(false)
					const favs=fav;
					const email=user.email;
					const save={email,favs}
					console.log(save);
					const res=await fetch("http://localhost:3001/storefav",{
							method:"POST",
							headers:{"Content-Type":"application/json"},
							body:JSON.stringify({
								email,favs
								})
						})
					setFav([])
					
					
				}
			
		return(
			
<>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand ><NavLink style={{color:'white',textDecoration:'none'}} to="/">MovieInfo</NavLink></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
     <Form inline>
     <span className="p-2 mr-2 text-white" style={loginState?{}:{display:"none"}}>Hello! {user.uname}</span>
     <Button className="p-2 mr-2" style={loginState?{}:{display:"none"}} onClick={loginHandle}>Logout</Button>
	 <Button className="p-0 mr-2" style={loginState?{display:"none"}:{}}> <Login /></Button>
	  <Button className="p-0 mr-2" style={loginState?{display:"none"}:{}}><SignUp /></Button>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" value={search} onChange={inputHandle} />
      <Button variant="outline-info" onClick={searchHandle}>Search</Button>
    </Form>
    </Nav>
  </Navbar.Collapse>
</Navbar>

</>
		
		);
	}

export default Header;
