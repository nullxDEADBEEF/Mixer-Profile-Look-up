import React from "react";
import Button from "./Button";
import Input from "./Input";
import Img from "./Img";
import Icon from "./Icon";
import "./MixerLookup.css"

const apiUrl = "https://mixer.com/api/v1/channels";

class MixerLookup extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            searchText: "",
            userData: {},
        };
    }

    // set state data to the thing we typed in the text box
    handleOnChange = searchText => {
        this.setState( {
            searchText
        } );
    }

    // look up mixer profile when clicked
    handleOnClick = () => {
        if ( this.state.searchText === "" ) return;
    
        fetch( `${apiUrl}/${this.state.searchText}` )
            .then( res => res.json() )
            .then( data => {
                if ( data.statusCode === 404 ) {
                    this.setState( {
                        searchText: "",
                        userData: {
                            error: true,
                            message: "User doesn't exist!"
                        }
                    })
                    return;
                } else {
                    const { 
                        token,
                        createdAt, 
                        user:{
                            avatarUrl,
                            social
                        }
                    } = data;
                    const { backgroundUrl, coverUrl, name } = data.type = data.type ? data.type : { backgroundUrl: "", coverUrl: "", name: "" }

                    delete social.verified;
                    delete social.player;
    
                    var dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
                    var localDate = new Date( createdAt ).toLocaleDateString( undefined, dateOptions );
    
                    this.setState( {
                        searchText: "",
                        userData: { 
                            // specified own names
                            // could just do "token", instead of the way below
                            username: token,
                            joined: localDate,
                            currentGame: { backgroundUrl, coverUrl, name },
                            avatar: avatarUrl,
                            socials: social
                        }
                    } );
                }
            } )
    }

    render() {
        const icons = {
            facebook:  "fab fa-facebook-square",
            instagram: "fab fa-instagram",
            twitter:   "fab fa-twitter",
            youtube:   "fab fa-youtube"
        }

        const Socials = () => (
            this.state.userData.socials !== undefined ? 
                Object.keys( this.state.userData.socials ).map( ( item, index ) => {
                    return (
                        <Icon key={ index } className={ `${icons[item] } icon-size icon-color tab-content` } href={ this.state.userData.socials[item] }/>   
                    )
                } ) : ""
        )

        const CurrentGame = () => {
            if ( this.state.userData.currentGame !== undefined ) {
                if ( this.state.userData.currentGame.coverUrl === "" ) {
                    return (
                        <p>{ this.state.userData.username } has not been playing any games lately...</p>
                    )
                }

                return (
                    <p>{ this.state.userData.username } was last playing: <Img src={ this.state.userData.currentGame.coverUrl }/> </p>
                )
            }

            return ""
        }

        const UserCard = () => {
            if ( this.state.userData.error ) {
                return (
                    <h1>{ this.state.userData.message }</h1>
                )
            }

            return (
                <div>
                    <Img src={ this.state.userData.avatar }/>
                    <p className="tab-content">{ this.state.userData.username }</p>
                    <p className="tab-content">{ this.state.userData.joined }</p>
                    <CurrentGame/>
                    <Socials/>
                </div>
            )
        }

        return (
            <div className="change-left-margin change-top-margin mixer-lookup">
                <Input className="input-margin textbox-rounded searchbox-size mb-3" onChange={ this.handleOnChange } value={ this.state.searchText }/>
                &nbsp;&nbsp;
                <Button className="search-margin btn btn-primary" onClick={ this.handleOnClick }>
                    Search
                </Button>
                <br/>
                <br/>
                <UserCard/>
            </div>
        )
    }
}

export default MixerLookup;