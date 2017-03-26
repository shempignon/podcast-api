import React, {Component} from 'react'
import { identifyPath } from './logic'
import FlatButton from 'material-ui/FlatButton'
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import { fullWhite } from 'material-ui/styles/colors'

const style = {
    marginLeft: 8,
    marginRight: 0,
    marginTop: 8,
}

export default class ExtraButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { location, action } = this.props
        const { pathname } = location
        switch (identifyPath(pathname)) {
            case 'podcast':
                return (<FlatButton
                    onTouchTap={e => action(pathname)}
                    hoverColor="transparent"
                    style={style}
                    icon={<NavigationRefresh color={fullWhite}/>}
                />)
            default:
                return false
        }
    }
}