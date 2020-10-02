import React from 'react'
import { connect } from 'react-redux'
import { Grid }    from '@material-ui/core'

import './index.css'

const BotList = ({ botList = [] }) => {
    return (
        <Grid 
            xs = {3}
            style = {{ backgroundColor:'#edeced' }}
        >
            {
                botList.map(({ id, name, desc }) => {
                    return (
                        <div 
                            key = {id}
                            className = "bot-list-item"
                        >
                            <p>{name}</p>
                            <p>{desc}</p>
                        </div>
                    )
                })
            }
        </Grid> 
    )
}

const mapStateToProps = ({ botList }) => ({ botList })

export default connect(mapStateToProps)(BotList)
