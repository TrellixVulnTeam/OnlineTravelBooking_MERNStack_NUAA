import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Footer from "./Footer";
import Header from './Header';
import HeaderTransparent from './HeaderTransparent';
import HeaderTransparentHotel from './HeaderTransparentHotel';
import HeaderTransparentFlight from './HeaderTransparentFlight';
import MainBody from './MainBody';
import MainBodyCar from './MainBodyCar';
import MainBodyCarCheckout from './MainBodyCarCheckout';
import BookingSuccessful from './BookingSuccessful';
import HotelBookingSuccessful from './HotelBookingSuccessful';
import FlightBookingSuccessful from './FlightBookingSuccessful';
import Admin from "./Admin";
import AdminDashboard from './AdminDashboard';
import Signup from './Signup';
import Signin from './Signin';
import alert from 'alert-node';
import HotelsMainPage from './HotelsMainPage';
import MainBodyHotel from './MainBodyHotel';
import MainBodyHotelCheckout from './MainBodyHotelCheckout';
import FlightsMainPage from './FlightsMainPage';
import MainBodyFlightCheckout from './MainBodyFlightCheckout';
import MainBodyFlight from './MainBodyFlight';
import UserBills from './UserBills';
import Graphs from './Graphs';
import UserProfile from './UserProfile';

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        showUserBillFlag: false
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if (status === 200) {
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }
            });
    };

    handleRedirectBooking = () => {
      API.getCartile(this.state.carTile)
          .then((res) => {
              console.log(res);
              this.setState({
                  username:res.username
              })
              this.props.history.push("/bookingSuccessful");

          });

    }

    handleRedirectBooking1 = () => {
        this.state.hotelTile.room=this.state.room;
      API.getHoteltile(this.state.hotelTile)
          .then((res) => {
              console.log(res);
              this.setState({
                  username: res.username
              })
              this.props.history.push("/hotelbookingSuccessful");

          });

    }

    handleRedirectBooking2 = () => {
        this.state.flightTile.seat = this.state.seat;
      API.getFlighttile(this.state.flightTile)
          .then((res) => {
              console.log(res);
              this.setState({
                  username: res.username
              });
              this.props.history.push("/flightbookingSuccessful");

          });

    }


    gotoSignin = () => {
        this.props.history.push('/signin');
    };

    loginUser = (payload) => {
        API.loginUser(payload)
            .then((res) => {
                if (res.status == 201) {
                    this.props.history.push("/");
                }
                else {
                    alert("Please check your username and password, and reenter!");
                    this.props.history.push('/');
                    this.props.history.push("/signin");
                }
            });
    }

    gotoSignup = () => {
        this.props.history.push('/signup');
    };

    registerUser = (payload) => {
        API.registerUser(payload)
            .then((res) => {
                console.log(res.msg);
                if (res.status == 201) {
                    alert("User registration is successful!");
                    this.props.history.push("/signin");
                }
                else if (res.status == 401) {
                    alert("User with this email id already exists. Please use another email id!");
                    this.props.history.push("/");
                    this.props.history.push("/signup");
                }
                else {
                    alert("Failed to register!Please check all the fields and try again");
                    this.props.history.push("/signup");
                }

            });
    }

    handleCarFetch = (payload) => {
        API.getCars(payload)
            .then((res) => {
                this.setState({
                    carsObj: res
                });
                localStorage.setItem("cars", JSON.stringify(this.state.carsObj));
                this.props.history.push("/searchCar");
            });

    };

    handleHotelFetch = (payload) => {
      API.getHotels(payload)
          .then((res) => {
                  console.log(res);
                  this.setState({
                      hotelsObj:res.user,
                      rooms: res.rooms
                  });
                  this.props.history.push("/searchHotel");
          });

    };

    handleFlightFetch = (payload) => {
        API.getFlights(payload)
            .then((res) => {
                console.log(res);
                this.setState({
                    flightsObj:res.user,
                    seats: res.seats
                });
                this.props.history.push("/searchFlight");
            });
    }

    handleCartileFetch = (payload) => {
            this.setState({
                carTile: payload
            });
            this.props.history.push("/carCheckout");

    };

    handleHoteltileFetch = (payload) => {
            this.setState({
                hotelTile: payload.hoteltile,
                room: payload.room
            });
            this.props.history.push("/hotelCheckout");

    };

    handleFlighttileFetch =(payload) => {
        this.setState({
            flightTile: payload.flighttile,
            seat: payload.seat
        });
        this.props.history.push("/flightCheckout");
    };

    handleClickSignup = () => {
        this.props.history.push('/signup');
    };

    handleClickSignin = () => {
        this.props.history.push('/signin');
    };

    handleUserProfile = () => {
        this.props.history.push('/userProfile');
    };

    handleShowTrips = () => {
        console.log("called handleShowTrips")
        this.setState({
            showUserBillFlag: true
        });
        this.props.history.push('/showbills');
    };

    reDirectToAdminDashboard = () => {
        console.log("called reDirectToAdminDashboard ")
        this.props.history.push('/adminDashboard');

    }
    render() {
        return (
            <div className="container-fluid" style={{backgroundColor:"white"}}>
                <Route exact path="/" render={() => (
                    <div className="opener-image" style={{backgroundColor: "pink",width:"100%", height:500}}>

                          <HeaderTransparent  handleShowTrips={this.handleShowTrips} handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>

                          <MainBody handleCarFetch={this.handleCarFetch}/>
                          <Footer />
                    </div>
                )}/>
                <Route exact path="/hotels" render={() => (
                    <div className="opener-image" style={{backgroundColor: "pink",width:"100%", height:500}}>
                          <HeaderTransparentHotel  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                          <HotelsMainPage handleHotelFetch={this.handleHotelFetch}/>
                          <Footer />
                    </div>
                )}/>

                <Route exact path="/flights" render={() => (
                    <div className="opener-image" style={{backgroundColor: "pink",width:"100%", height:500}}>
                          <HeaderTransparentFlight  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                          <FlightsMainPage handleFlightFetch={this.handleFlightFetch}/>
                          <Footer />
                    </div>
                )}/>

                <Route exact path="/searchCar" render={() => (
                    <div>
                        <div className="header-xyz" style={{backgroundColor:"gray"}}>
                          <Header  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                         </div>
                          <div className="mainBodyCar">
                          <MainBodyCar cars={this.state.carsObj} handleCartileFetch={this.handleCartileFetch}/>
                          </div>
                          <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/searchHotel" render={() => (
                    <div>
                        <div className="header-xyz" style={{backgroundColor:"gray"}}>
                          <Header  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                         </div>
                          <div className="mainBodyHotel">
                          <MainBodyHotel hotels={this.state.hotelsObj} rooms={this.state.rooms} handleHoteltileFetch={this.handleHoteltileFetch}/>
                          </div>
                          <Message message={this.state.message}/>
                    </div>
                )}/>


                <Route exact path="/searchFlight" render={() => (
                    <div>
                        <div className="header-xyz" style={{backgroundColor:"gray"}}>
                          <Header  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                         </div>
                          <div className="mainBodyHotel">
                          <MainBodyFlight flights={this.state.flightsObj} seats={this.state.seats} handleFlighttileFetch={this.handleFlighttileFetch}/>
                          </div>
                          <Message message={this.state.message}/>
                    </div>
                )}/>


                <Route exact path="/carCheckout" render={() => (
                    <div>
                        <div className="header-xyz" style={{backgroundColor:"gray"}}>
                          <Header  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                         </div>
                          <div className="mainBodyCarCheckout">
                            <MainBodyCarCheckout carTile={this.state.carTile} handleRedirectBooking={this.handleRedirectBooking}/>
                          </div>
                          <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/hotelCheckout" render={() => (
                    <div className="container-fluid" style={{backgroundColor: "#f1f1f1"}}>
                        <div className="header-xyz">
                          <Header  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                         </div>
                          <div className="mainBodyHotelCheckout" style={{backgroundColor: "gray"}}>
                            <MainBodyHotelCheckout hotelTile={this.state.hotelTile} room={this.state.room} handleRedirectBooking1={this.handleRedirectBooking1}/>
                          </div>
                          <Message message={this.state.message}/>
                    </div>
                )}/>


                <Route exact path="/flightCheckout" render={() => (
                    <div className="container-fluid" style={{backgroundColor: "#f1f1f1"}}>
                        <div className="header-xyz">
                          <Header  handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                         </div>
                          <div className="mainBodyHotelCheckout" style={{backgroundColor: "gray"}}>
                            <MainBodyFlightCheckout flightTile={this.state.flightTile} seat={this.state.seat} handleRedirectBooking2={this.handleRedirectBooking2}/>
                          </div>
                          <Message message={this.state.message}/>
                    </div>
                )}/>



                <Route exact path="/bookingSuccessful" render={() => (
                    <div>
                        <BookingSuccessful carTile={this.state.carTile} username={this.state.username} handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin} />
                    </div>
                )}/>
              <Route exact path="/hotelbookingSuccessful" render={() => (
                    <div>
                        <HotelBookingSuccessful hotelTile={this.state.hotelTile} room={this.state.room} username={this.state.username} handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin} />
                    </div>
                )}/>

                <Route exact path="/flightbookingSuccessful" render={() => (
                      <div>
                          <FlightBookingSuccessful flightTile={this.state.flightTile} seat={this.state.seat} username={this.state.username} handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin} />
                      </div>
                  )}/>

                  

                <Route exact path="/signup" render={() => (
                    <div>
                        <Signup gotoSignin={this.gotoSignin} registerUser={this.registerUser}
                                handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                    </div>
                )}/>
                <Route exact path="/signin" render={() => (
                    <div>
                        <Signin gotoSignup={this.gotoSignup} loginUser={this.loginUser}
                                handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                    </div>
                )}/>

                <Route exact path="/showbills" render={() => (
                    <div>
                        {
                            this.state.showUserBillFlag
                                ?
                                <UserBills/>
                                :
                                null
                        }
                    </div>
                )}/>

                <Route exact path="/graphs" render={() => (
                    <div>
                        <Graphs/>
                    </div>
                )}/>

                <Route exact path="/admin" render={() => (
                    <div>
                        <Admin reDirectToAdminDashboard={this.reDirectToAdminDashboard}/>
                    </div>
                )}/>

                <Route exact path="/adminDashboard" render={() => (
                    <div>
                        <AdminDashboard/>
                    </div>
                )}/>

                <Route exact path="/userProfile" render={() => (
                    <div>
                        <UserProfile/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);
