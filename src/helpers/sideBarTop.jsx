import React from 'react'
import Home from '@mui/icons-material/Home'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';

export const sideBarTop = (session)=>{

    return session ? [
        
        {
            "item":"Home",
            "icon":<Home sx={{fontSize:30}}/>,
            "path":"/"
        },
        {
            "item":"ShoppingCart",
            "icon":<ShoppingCart sx={{fontSize:30}}/>,
            "path":"/cart"
        },
        
        {
            "item":"Favorites",
            "icon":<FavoriteIcon sx={{fontSize:30}}/>,
            "path":"/favorites"
        },
        {
            "item":"Settings",
            "icon":<SettingsIcon sx={{fontSize:30}}/>,
            "path":"/settings"
        }

    ] : [
        {
            "item":"Home",
            "icon":<Home sx={{fontSize:30}}/>,
            "path":"/"
        },
        {
            "item":"ShoppingCart",
            "icon":<ShoppingCart sx={{fontSize:30}}/>,
            "path":"/cart"
        },
        {
            "item":"LoginForm",
            "icon":<><PersonOutlineIcon /><LoginIcon sx={{fontSize:30}}/></>,
            "path":"/auth"
        },
    ]

}