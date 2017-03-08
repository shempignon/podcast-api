import { logic as podcastsLogic } from './podcasts/index'
import { logic as podcastLogic } from './podcast/index'
import { logic as addPodcastLogic } from './addPodcast/index'
import { logic as playerLogic } from './player/index'
import { logic as layoutLogic } from './layout/index'

export default [
    ...podcastsLogic,
    ...podcastLogic,
    ...addPodcastLogic,
    ...playerLogic,
    ...layoutLogic,
]