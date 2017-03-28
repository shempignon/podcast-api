import React from 'react'
import {List, ListItem} from 'material-ui/List'
import { Avatar } from 'material-ui'

export default function ({episodes, playSong}) {
  return (
    <List>
      {episodes.map(episode =>
        <ListItem
          key={episode.url}
          primaryText={episode.name}
          leftAvatar={<Avatar src={episode.feed.image} />}
          secondaryText={(new Date(episode.broadcastedOn)).toLocaleDateString()}
          onTouchTap={() => playSong(episode.url)}
        />
      )}
    </List>
  )
}
