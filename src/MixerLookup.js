import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import Img from "./Img";
import Icon from "./Icon";
import "./MixerLookup.css"

const apiUrl = "https://mixer.com/api/v1/channels";

const MixerLookup = () => {
    const [searchText, setSearchtext] = useState( "" );
    const [userData, setUserData] = useState( {} );
    const [searchClicked, setSearchClicked] = useState( false );

    const handleOnChange = searchText => {
        setSearchtext( searchText );
    }

    useEffect( () => {
        if ( searchText === "" ) return;

        fetch( `${apiUrl}/${searchText}` )
            .then( res => res.json() )
            .then( data => {
                if ( data.statusCode === 404 ) {
                    setSearchtext( "" );
                    setUserData( { error: true, message: "User doesn't exist!" } );
                    return;
                } else {
                    const {
                        token,
                        createdAt,
                        user: {
                            avatarUrl,
                            social
                        }
                    } = data;

                    const { backgroundUrl, coverUrl, name } = data.type = data.type ? data.type : { backgroundUrl: "", coverUrl: "", name: "" }

                    delete social.verified;
                    delete social.player;

                    var dateOption = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
                    var localDate = new Date( createdAt ).toLocaleDateString( undefined, dateOption );

                    setSearchtext( "" );
                    setUserData( { 
                        username: token,
                        joined: localDate,
                        currentGame: { backgroundUrl, coverUrl, name },
                        avatar: avatarUrl,
                        socials: social
                    } );
                }
            })
            setSearchClicked( false );
    }, [searchClicked] );

    const icons = {
        facebook:  "fab fa-facebook-square",
        instagram: "fab fa-instagram",
        twitter:   "fab fa-twitter",
        youtube:   "fab fa-youtube"
    };

    const Socials = () => (
        userData.socials !== undefined ?
            Object.keys( userData.socials ).map( ( item, index ) => {
                return (
                    <Icon key={ index } className={ `${icons[item]} icon-size icon-color tab-content`} href={ userData.socials[item] }/>
                )
            }) : ""
    );

    const CurrentGame = () => {
        if ( userData.currentGame !== undefined ) {
            if ( userData.currentGame.coverUrl === "" ) {
                return (
                    <p>{ userData.username } has not been playing any games lately...</p>
                )
            }

            return (
                <p>{ userData.username} was last playing: <Img src={ userData.currentGame.coverUrl }/></p>
            )
        }

        return "";
    };
    
    const UserCard = () => {
        if ( userData.error ) {
            return (
                <h1>{ userData.message }</h1>
            )
        }

        return (
            <div>
                <Img src={ userData.avatar }/>
                <p className="tab-content">{ userData.username }</p>
                <p className="tab-content">{ userData.joined }</p>
                <CurrentGame/>
                <Socials/>
            </div>
        )
    };

    return (
        <div className="change-left-margin change-top-margin mixer-lookup">
            <Input className="input-margin textbox-rounded searchbox-size mb-3" onChange={ handleOnChange } value={ searchText }/>
            &nbsp;&nbsp;
            <Button className="search-margin btn btn-primary" onClick={ () => setSearchClicked( true ) }>
                Search
            </Button>
            <br/>
            <br/>
            <UserCard/>
        </div>
    )
}

export default MixerLookup;