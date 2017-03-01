import { logic as podcastsLogic } from './podcasts/index'
import { logic as podcastLogic } from './podcast/index'
import { logic as addPodcastLogic } from './addPodcast/index'

export default [
    ...podcastsLogic,
    ...podcastLogic,
    ...addPodcastLogic,
]