import { logic as podcastsLogic } from './podcasts'
import { logic as podcastLogic } from './podcast'
import { logic as latestEpisodesLogic } from './latestEpisodes'
import { logic as addPodcastLogic } from './addPodcast'
import { logic as playerLogic } from './player'
import { logic as extraButtonLogic } from './extraButton'
import { logic as layoutLogic } from './layout'

export default [
  ...podcastsLogic,
  ...podcastLogic,
  ...latestEpisodesLogic,
  ...addPodcastLogic,
  ...playerLogic,
  ...extraButtonLogic,
  ...layoutLogic
]
