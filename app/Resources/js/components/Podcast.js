import React from 'react'

const Podcast = (podcast) => (
    <li>{podcast.name} - {podcast.updatedAt}</li>
)

export default Podcast
