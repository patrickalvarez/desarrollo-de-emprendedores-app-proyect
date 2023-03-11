import { Person } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { blue } from '@mui/material/colors';

export const CustomLink = ({ Icon, to, label }) => {
  const location = useLocation()
  const active = location.pathname.includes(to)

  return (
    <NavLink to={to}>
      <ListItem disablePadding sx={active ? { background: `${blue[700]}`, color: "white" } : {}}>
        <ListItemButton>
          <ListItemIcon>
            <Icon sx={active ? { color: "white" } : {}} />
          </ListItemIcon>
          <ListItemText>
            {label}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </NavLink>
  )
}
